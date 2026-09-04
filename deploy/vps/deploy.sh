#!/usr/bin/env bash
set -euo pipefail

ROOT=/var/www/portfolio
cd "$ROOT"

git fetch origin main
git reset --hard origin/main
git clean -fd --exclude=node_modules --exclude=.next

npm ci
npm run build

NODE_ENV=production PORT=3000 HOSTNAME=127.0.0.1 pm2 restart portfolio --update-env

for _ in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:3000/ >/dev/null; then
    break
  fi
  sleep 1
done

curl -fsS http://127.0.0.1:3000/ | grep -q "Cleber Neto"

echo "deploy ok $(git rev-parse --short HEAD)"
