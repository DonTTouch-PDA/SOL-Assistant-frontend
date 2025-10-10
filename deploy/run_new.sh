#!/bin/bash
set -e

APP_NAME="sol-assistant"
IMAGE_NAME="sol-assistant"
APP_DIR="/home/ec2-user/${APP_NAME}"
TARGET_DIR="/home/ec2-user/includes"
BLUE_PORT=3001
GREEN_PORT=3002

mkdir -p $TARGET_DIR

# 현재 사용 중 포트 확인
if [ -f $TARGET_DIR/service_url.inc ]; then
  CURRENT_PORT=$(grep -Po '[0-9]+' $TARGET_DIR/service_url.inc | tail -1)
else
  CURRENT_PORT=0
fi

# 타겟 포트 결정
TARGET_PORT=$(( CURRENT_PORT == BLUE_PORT ? GREEN_PORT : BLUE_PORT ))
[ "$CURRENT_PORT" -eq 0 ] && TARGET_PORT=$BLUE_PORT

echo "> Current port: $CURRENT_PORT, Target port: $TARGET_PORT"

# 기존 컨테이너 정리
EXISTING_CONTAINER=$(docker ps -a -q --filter "name=${APP_NAME}-${TARGET_PORT}")
[ -n "$EXISTING_CONTAINER" ] && docker rm -f $EXISTING_CONTAINER

# 이미지 로드
docker load -i ${APP_DIR}/sol-assistant.tar

# 새 컨테이너 실행
docker run -d --name ${APP_NAME}-${TARGET_PORT} -p ${TARGET_PORT}:3000 ${IMAGE_NAME}

# 타겟 포트 기록
echo "${TARGET_PORT}" > $TARGET_DIR/target_port.inc
echo "> New container started on port ${TARGET_PORT}"
