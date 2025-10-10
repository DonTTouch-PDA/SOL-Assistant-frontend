#!/bin/bash
set -e

TARGET_PORT=$(cat /home/ec2-user/target_port.inc)

echo "> Starting health check for port ${TARGET_PORT}..."

for RETRY in {1..10}
do
  RESPONSE=$(curl -s http://localhost:${TARGET_PORT}/health || true)
  if [ "$RESPONSE" = "ok" ]; then
    echo "> Health check success!"
    exit 0
  fi
  echo "> Health check failed. Retry ${RETRY}/10 ..."
  sleep 5
done

echo "> Health check failed after 10 attempts."
exit 1
