#!/bin/bash
# deploy.sh

APP_NAME="sol-assistant"
APP_DIR="/home/ec2-user/$APP_NAME"

# 1. 기존 컨테이너 종료
docker stop $APP_NAME || true
docker rm $APP_NAME || true

# 2. 새 이미지 로드 (zip 안에 tar 포함된 경우)
docker load -i $APP_DIR/$APP_NAME.tar

# 3. 새 컨테이너 실행
docker run -d -p 3000:3000 --name $APP_NAME $APP_NAME

# 4. 실행 상태 확인
docker ps | grep $APP_NAME
