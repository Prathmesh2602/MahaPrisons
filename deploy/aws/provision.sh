#!/usr/bin/env bash
# One-time setup of MahaPrisons on AWS:
#   one EC2 server running Caddy (free HTTPS, serves the admin panel), the API and the Next.js website
#   in Docker; the database is Supabase Postgres.
# The image is built on the server itself from a code bundle in S3 (no local Docker or ECR needed).
# Everything is named mahaprisons-* and created beside whatever else is in the account;
# nothing existing is changed. Safe to re-run: each step checks before creating.
#
# HTTPS address: <ip-with-dashes>.sslip.io (free; always resolves to the IP in its name), unless
# you pass your own domain:  SITE_ADDRESS=api.example.com ./provision.sh   (point its A record at the printed IP)
set -euo pipefail

export AWS_PROFILE="${AWS_PROFILE:-default}" AWS_REGION="${AWS_REGION:-ap-south-1}" AWS_PAGER=""
NAME=mahaprisons
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
BUCKET="$NAME-releases-$ACCOUNT"
say() { printf '\n==> %s\n' "$*"; }

say "Release bucket (private; holds code bundles and data uploads)"
if ! aws s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1; then
  aws s3api create-bucket --bucket "$BUCKET" --create-bucket-configuration LocationConstraint="$AWS_REGION" >/dev/null
fi
aws s3api put-public-access-block --bucket "$BUCKET" --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws s3api put-bucket-encryption --bucket "$BUCKET" --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
aws s3api put-bucket-lifecycle-configuration --bucket "$BUCKET" --lifecycle-configuration \
  '{"Rules":[{"ID":"expire-old","Status":"Enabled","Filter":{"Prefix":""},"Expiration":{"Days":30}}]}'
echo "bucket=$BUCKET"

say "Fixed public address (new Elastic IP; existing ones are not touched)"
ALLOC="$(aws ec2 describe-addresses --filters Name=tag:Name,Values=$NAME-api --query 'Addresses[0].AllocationId' --output text)"
if [ "$ALLOC" = "None" ]; then
  ALLOC="$(aws ec2 allocate-address --domain vpc --tag-specifications "ResourceType=elastic-ip,Tags=[{Key=Name,Value=$NAME-api},{Key=Project,Value=$NAME}]" --query AllocationId --output text)"
fi
IP="$(aws ec2 describe-addresses --allocation-ids "$ALLOC" --query 'Addresses[0].PublicIp' --output text)"
SITE="${SITE_ADDRESS:-${IP//./-}.sslip.io}"
echo "ip=$IP api=$SITE web=web.$SITE admin=admin.$SITE"

say "Config and secrets (SSM Parameter Store, encrypted)"
ENVFILE="$(mktemp)"; trap 'rm -f "$ENVFILE"' EXIT
if aws ssm get-parameter --name /$NAME/app-env >/dev/null 2>&1; then
  # Keep existing secrets; only (re)set the address.
  aws ssm get-parameter --name /$NAME/app-env --with-decryption --query Parameter.Value --output text | grep -vE '^(SITE_ADDRESS|WEB_ADDRESS|ADMIN_ADDRESS)=' > "$ENVFILE"
else
  {
    echo "NODE_ENV=production"
    echo "PORT=5000"
    echo "STORAGE_MODE=local"
    # Database is Supabase Postgres (session pooler); values come from your local backend/.env and are never printed.
    grep -E '^SUPABASE_DB_URL=.' "$ROOT/backend/.env" | tr -d '"' | sed 's/^SUPABASE_DB_URL=/DATABASE_URL=/'
    grep -E '^(JWT_SECRET|CORS_ORIGINS)=.' "$ROOT/backend/.env" | tr -d '"'
  } > "$ENVFILE"
fi
{ echo "SITE_ADDRESS=$SITE"; echo "WEB_ADDRESS=web.$SITE"; echo "ADMIN_ADDRESS=admin.$SITE"; } >> "$ENVFILE"
aws ssm put-parameter --name /$NAME/app-env --type SecureString --overwrite --value "file://$ENVFILE" >/dev/null
echo "saved"

say "Server role"
if ! aws iam get-role --role-name $NAME-ec2 >/dev/null 2>&1; then
  aws iam create-role --role-name $NAME-ec2 --assume-role-policy-document \
    '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
fi
aws iam attach-role-policy --role-name $NAME-ec2 --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
aws iam put-role-policy --role-name $NAME-ec2 --policy-name read-app-config --policy-document \
  "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"ssm:GetParameter\",\"Resource\":\"arn:aws:ssm:$AWS_REGION:$ACCOUNT:parameter/$NAME/*\"},{\"Effect\":\"Allow\",\"Action\":[\"s3:GetObject\",\"s3:PutObject\"],\"Resource\":\"arn:aws:s3:::$BUCKET/*\"}]}"
if ! aws iam get-instance-profile --instance-profile-name $NAME-ec2 >/dev/null 2>&1; then
  aws iam create-instance-profile --instance-profile-name $NAME-ec2 >/dev/null
  aws iam add-role-to-instance-profile --instance-profile-name $NAME-ec2 --role-name $NAME-ec2
  sleep 12 # IAM is eventually consistent
fi

say "Network"
VPC="$(aws ec2 describe-vpcs --filters Name=isDefault,Values=true --query 'Vpcs[0].VpcId' --output text)"
SUBNET="$(aws ec2 describe-subnets --filters Name=vpc-id,Values="$VPC" Name=default-for-az,Values=true --query 'Subnets[0].SubnetId' --output text)"
SG="$(aws ec2 describe-security-groups --filters Name=group-name,Values=$NAME-api Name=vpc-id,Values="$VPC" --query 'SecurityGroups[0].GroupId' --output text)"
if [ "$SG" = "None" ]; then
  SG="$(aws ec2 create-security-group --group-name $NAME-api --description 'MahaPrisons API: web traffic only' --vpc-id "$VPC" --query GroupId --output text)"
fi
# Web only (80 is needed for the certificate check and the redirect to https). No SSH: use SSM Session Manager.
for port in 80 443; do
  aws ec2 authorize-security-group-ingress --group-id "$SG" --protocol tcp --port $port --cidr 0.0.0.0/0 >/dev/null 2>&1 || true
done
echo "vpc=$VPC subnet=$SUBNET sg=$SG"

say "Server"
INSTANCE="$(aws ec2 describe-instances --filters Name=tag:Name,Values=$NAME-api Name=instance-state-name,Values=pending,running,stopped --query 'Reservations[0].Instances[0].InstanceId' --output text)"
if [ "$INSTANCE" = "None" ]; then
  AMI="$(aws ssm get-parameter --name /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-arm64 --query Parameter.Value --output text)"
  USERDATA="$(mktemp)"
  cat > "$USERDATA" <<UD
#!/bin/bash
set -euxo pipefail
# 2 GB swap so npm ci and the image build fit beside Postgres on a 2 GB machine
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
dnf install -y docker
systemctl enable --now docker
mkdir -p /usr/local/lib/docker/cli-plugins
curl -fsSL https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-aarch64 -o /usr/local/lib/docker/cli-plugins/docker-compose
curl -fsSL https://github.com/docker/buildx/releases/download/v0.17.1/buildx-v0.17.1.linux-arm64 -o /usr/local/lib/docker/cli-plugins/docker-buildx
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose /usr/local/lib/docker/cli-plugins/docker-buildx
mkdir -p /opt/mahaprisons/uploads /opt/mahaprisons/caddy
chown -R 1000:1000 /opt/mahaprisons/uploads
cd /opt/mahaprisons
echo "$AWS_REGION" > region
echo "$BUCKET" > bucket
touch ready
UD
  INSTANCE="$(aws ec2 run-instances --image-id "$AMI" --instance-type t4g.small \
    --subnet-id "$SUBNET" --security-group-ids "$SG" --associate-public-ip-address \
    --iam-instance-profile Name=$NAME-ec2 \
    --metadata-options HttpTokens=required,HttpEndpoint=enabled,HttpPutResponseHopLimit=2 \
    --block-device-mappings 'DeviceName=/dev/xvda,Ebs={VolumeSize=30,VolumeType=gp3,Encrypted=true,DeleteOnTermination=false}' \
    --user-data "file://$USERDATA" \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$NAME-api},{Key=Project,Value=$NAME}]" "ResourceType=volume,Tags=[{Key=Name,Value=$NAME-api},{Key=Project,Value=$NAME}]" \
    --query 'Instances[0].InstanceId' --output text)"
  rm -f "$USERDATA"
fi
aws ec2 wait instance-running --instance-ids "$INSTANCE"
aws ec2 associate-address --instance-id "$INSTANCE" --allocation-id "$ALLOC" >/dev/null
echo "instance=$INSTANCE"

say "Done. Next: ./release.sh (builds and starts the API on the server). Address:"
echo "https://$SITE"
echo "$SITE" > "$HERE/.last-site"
