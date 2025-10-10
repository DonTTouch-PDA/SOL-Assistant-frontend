#!/bin/bash
set -e

APP_NAME="sol-assistant"
IMAGE_NAME="sol-assistant"
APP_DIR="/home/ec2-user/${APP_NAME}"
BLUE_PORT=3001
GREEN_PORT=3002

# 현재 사용 중인 포트 확인
if [ -f /home/ec2-user/service_url.inc ]; then
  CURRENT_PORT=$(grep -Po '[0-9]+' /home/ec2-user/service_url.inc | tail -1)
else
  CURRENT_PORT=0
fi

# 타겟 포트 결정
if [ "${CURRENT_PORT}" -eq "${BLUE_PORT}" ]; then
  TARGET_PORT="${GREEN_PORT}"
else
  TARGET_PORT="${BLUE_PORT}"
fi

# 처음 배포 시 CURRENT_PORT가 0이면 Blue 포트로 설정
if [ "${CURRENT_PORT}" -eq 0 ]; then
  echo "> First deployment detected, using Blue port ${BLUE_PORT}."
  TARGET_PORT="${BLUE_PORT}"
fi

echo "> Current WAS port: ${CURRENT_PORT}"
echo "> Target WAS port: ${TARGET_PORT}"

# --- 기존 컨테이너 정리 (포트 기준) ---
EXISTING_CONTAINER=$(docker ps -q --filter "publish=${TARGET_PORT}")
if [ -n "$EXISTING_CONTAINER" ]; then
    echo "> Stopping existing container(s) on port ${TARGET_PORT}..."
    docker stop $EXISTING_CONTAINER
    docker rm $EXISTING_CONTAINER
fi

# --- 이전 이름 기준 컨테이너 제거 (안전용) ---
OLD_NAME_CONTAINER=$(docker ps -a -q --filter "name=${APP_NAME}-${TARGET_PORT}")
if [ -n "$OLD_NAME_CONTAINER" ]; then
    echo "> Removing old container(s) named ${APP_NAME}-${TARGET_PORT}..."
    docker rm $OLD_NAME_CONTAINER
fi

# --- 새 이미지 로드 ---
echo "> Loading new Docker image..."
docker load -i ${APP_DIR}/sol-assistant.tar

# --- 새 컨테이너 실행 ---
echo "> Starting new container on port ${TARGET_PORT}..."
docker run -d \
  --name ${APP_NAME}-${TARGET_PORT} \
  -p ${TARGET_PORT}:3000 \
  ${IMAGE_NAME}

# --- 타겟 포트 기록 ---
echo "${TARGET_PORT}" > /home/ec2-user/target_port.inc
echo "> New container started on ${TARGET_PORT}"

# --- nginx service_url 업데이트 및 reload ---
echo "set \$service_url http://127.0.0.1:${TARGET_PORT};" | sudo tee /home/ec2-user/service_url.inc
sudo nginx -s reload
echo "> Nginx reloaded and traffic switched to ${TARGET_PORT}"
