#!/bin/bash
set -e

TARGET_DIR="/home/ec2-user/includes"
TARGET_PORT=$(cat $TARGET_DIR/target_port.inc)

for i in {1..10}; do
  RESPONSE=$(curl -s http://127.0.0.1:${TARGET_PORT}/api/health || true)
  if [ "$RESPONSE" = "ok" ]; then
    echo "> Health check passed!"
    exit 0
  fi
  echo "> Health check failed. Retry $i/10 ..."
  sleep 5
done

echo "> Health check failed"
exit 1
