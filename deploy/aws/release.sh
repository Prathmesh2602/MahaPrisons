#!/usr/bin/env bash
# Ship the current backend/, web/ and admin/ code: bundle it to S3, then build and restart on the server.
# Database migrations run automatically on start. Uses the `default` AWS profile.
set -euo pipefail
export AWS_PROFILE="${AWS_PROFILE:-default}" AWS_REGION="${AWS_REGION:-ap-south-1}" AWS_PAGER=""
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
BUCKET="mahaprisons-releases-$ACCOUNT"

# Only what the image needs (mirrors backend/.dockerignore), plus the server-side deploy files.
BUNDLE="$(mktemp -d)"; trap 'rm -rf "$BUNDLE"' EXIT
mkdir -p "$BUNDLE/app/backend"
(cd "$ROOT/backend" && cp -R Dockerfile .dockerignore package.json package-lock.json prisma src "$BUNDLE/app/backend/")
for app in web admin; do
  rsync -a --exclude node_modules --exclude .next --exclude dist --exclude '.env*.local' "$ROOT/$app/" "$BUNDLE/app/$app/"
done
cp "$HERE/docker-compose.prod.yml" "$BUNDLE/app/docker-compose.yml"
cp "$HERE/Caddyfile" "$BUNDLE/app/Caddyfile"
cp "$HERE/on-server-release.sh" "$BUNDLE/app/release.sh"
COPYFILE_DISABLE=1 tar --no-xattrs -czf "$BUNDLE/release.tgz" -C "$BUNDLE/app" .
aws s3 cp "$BUNDLE/release.tgz" "s3://$BUCKET/release.tgz" --only-show-errors

# First release after provision: wait for the server's first boot (Docker install) to finish.
"$HERE/run-on-server.sh" "for i in \$(seq 1 60); do [ -f /opt/mahaprisons/ready ] && exit 0; sleep 5; done; echo 'server not ready'; exit 1"
"$HERE/run-on-server.sh" "cd /opt/mahaprisons && aws s3 cp --region \$(cat region) s3://\$(cat bucket)/release.tgz /tmp/release.tgz --only-show-errors && tar -xzf /tmp/release.tgz -C /opt/mahaprisons && chmod +x release.sh && ./release.sh 2>&1 | tail -15; docker compose ps --format 'table {{.Service}}\t{{.Status}}'"
echo "Released. Site: https://$(cat "$HERE/.last-site" 2>/dev/null || echo '<your address>')"
