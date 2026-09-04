#!/usr/bin/env bash
set -euo pipefail

# Renova só kameziro.com.br (apex + www). O certbot só troca o certificado
# se faltar menos de 30 dias para vencer.
certbot renew --quiet --cert-name kameziro.com.br \
  --deploy-hook "nginx -t && systemctl reload nginx"
