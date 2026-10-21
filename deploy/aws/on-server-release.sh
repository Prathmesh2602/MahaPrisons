#!/bin/bash
# Runs ON the server on every release: fetch config, build the image from the bundled code, restart.
set -euo pipefail
cd /opt/mahaprisons
REGION="$(cat region)"

# Config and secrets live in SSM Parameter Store, not in the repo or in user-data.
aws ssm get-parameter --region "$REGION" --name /mahaprisons/app-env --with-decryption \
  --query Parameter.Value --output text > .env.new
chmod 600 .env.new
mv .env.new .env

docker compose build backend
docker compose up -d --remove-orphans
docker image prune -f >/dev/null
