#!/bin/bash
# deploy.sh

APP_NAME="sol-assistant"
APP_DIR="/home/ec2-user/$APP_NAME/docker-images"

# 1. 기존 컨테이너 종료
docker stop $APP_NAME || true
docker rm $APP_NAME || true

# 2. 최신 tar 파일 찾기
TAR_FILE=$(ls $APP_DIR/$APP_NAME-*.tar | sort | tail -n 1)
echo "Loading Docker image from $TAR_FILE"

# 3. 새 이미지 로드
docker load -i "$TAR_FILE"

# 4. 새 컨테이너 실행
docker run -d -p 3000:3000 --name $APP_NAME $APP_NAME

# 5. 실행 상태 확인
docker ps | grep $APP_NAME
