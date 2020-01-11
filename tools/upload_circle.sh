#!/bin/sh

: '
This script is used by CircleCI to upload image to ECR during CICD process.
Please remember about setting proper repository URL and AWS region.
'

# Configuration
DOCKER_REPO_URI_BASE="463715963173.dkr.ecr.eu-central-1.amazonaws.com"
AWS_REGION="eu-central-1"

TAG="latest"
ZOSIA_IMG_NAME="zosia_prod_web:${TAG}"
NGINX_IMG_NAME="zosia_prod_nginx:${TAG}"
   
# Login and upload images
DOCKER_LOGIN_CMD=`aws ecr get-login --region ${AWS_REGION} --no-include-email`
echo "Logging to remote registry with command"
eval ${DOCKER_LOGIN_CMD}

# upload zosia_web image
ZOSIA_IMG_ID=`docker images ${ZOSIA_IMG_NAME} | tail -1 | awk '{ print $3 }'`

DOCKER_REPO_URI="${DOCKER_REPO_URI_BASE}/zosia_web"
REGISTRY_IMG_NAME="${DOCKER_REPO_URI}:${TAG}"
docker tag ${ZOSIA_IMG_ID} ${REGISTRY_IMG_NAME}
docker push ${REGISTRY_IMG_NAME}

# upload zosia_nginx image
NGINX_IMG_ID=`docker images ${NGINX_IMG_NAME} | tail -1 | awk '{ print $3 }'`

DOCKER_REPO_URI="${DOCKER_REPO_URI_BASE}/zosia_nginx"
REGISTRY_IMG_NAME="${DOCKER_REPO_URI}:${TAG}"
docker tag ${NGINX_IMG_ID} ${REGISTRY_IMG_NAME}
docker push ${REGISTRY_IMG_NAME}
