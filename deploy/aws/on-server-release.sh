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

# One at a time: the server has 2 GB of RAM (plus swap), and the Next.js build is the heaviest.
docker compose build backend
docker compose build web
docker compose build caddy
docker compose up -d --remove-orphans
docker image prune -f >/dev/null
