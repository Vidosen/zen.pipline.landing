#!/bin/bash
set -e

# Variables - update these
SERVER_IP="YOUR_SERVER_IP"
SERVER_USER="ubuntu"
DEPLOY_PATH="/var/www/landing"
LOCAL_BUILD_PATH="../../build"

# Build React app
echo "Building React application..."
cd ../../
npm run build
cd infra/scripts

# Check if build directory exists
if [ ! -d "$LOCAL_BUILD_PATH" ]; then
  echo "Error: Build directory not found at $LOCAL_BUILD_PATH"
  exit 1
fi

# Deploy to server
echo "Deploying to $SERVER_USER@$SERVER_IP..."
rsync -avz --delete $LOCAL_BUILD_PATH/ $SERVER_USER@$SERVER_IP:$DEPLOY_PATH/

echo "Deployment complete!" 