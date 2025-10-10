#!/bin/bash
set -e

BLUE_PORT=3001
GREEN_PORT=3002
TARGET_PORT=$(cat /home/ec2-user/target_port.inc)
CURRENT_PORT=$(grep -Po '[0-9]+' /home/ec2-user/service_url.inc | tail -1 || echo 0)

echo "> Switching traffic from ${CURRENT_PORT} to ${TARGET_PORT}"

sudo bash -c "echo 'set \$service_url http://127.0.0.1:${TARGET_PORT};' > /home/ec2-user/service_url.inc"
sudo nginx -s reload

echo "> Nginx reloaded. Now directing traffic to ${TARGET_PORT}"

if [ "${CURRENT_PORT}" -ne 0 ]; then
  OLD_CONTAINER=$(docker ps --filter "publish=${CURRENT_PORT}" --format "{{.ID}}")
  if [ -n "${OLD_CONTAINER}" ]; then
    echo "> Stopping old container on port ${CURRENT_PORT}"
    docker stop ${OLD_CONTAINER}
    docker rm ${OLD_CONTAINER}
  fi
fi

echo "> Switch completed successfully."
