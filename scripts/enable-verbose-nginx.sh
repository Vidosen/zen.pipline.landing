#!/bin/bash
# Script to enable verbose Nginx logging and switch to a separate Nginx container

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Enabling Verbose Nginx Logging ===${NC}"

# Check if we're running on the server
if [ ! -d "/opt/zen-landing" ]; then
  echo -e "${RED}Error: This script should be run on the production server in /opt/zen-landing${NC}"
  echo -e "${YELLOW}You can use: sshpass -p 'PASSWORD' ssh root@95.163.220.11 'bash -s' < $0${NC}"
  exit 1
fi

cd /opt/zen-landing

# Backup current configuration
echo -e "${YELLOW}Backing up current configuration...${NC}"
cp docker-compose.prod.yml docker-compose.prod.backup.yml
cp nginx.prod.conf nginx.prod.backup.conf

# Check if the new files exist
if [ ! -f "nginx.verbose.conf" ] || [ ! -f "docker-compose.prod.nginx.yml" ] || [ ! -f "Dockerfile.nginx" ]; then
  echo -e "${RED}Error: Required files not found. Please upload the following files:${NC}"
  echo "- nginx.verbose.conf"
  echo "- docker-compose.prod.nginx.yml"
  echo "- Dockerfile.nginx"
  exit 1
fi

# Get current container images
FRONTEND_IMAGE=$(docker-compose -f docker-compose.prod.yml config | grep 'image: ' | grep frontend | awk '{print $2}')
BACKEND_IMAGE=$(docker-compose -f docker-compose.prod.yml config | grep 'image: ' | grep backend | awk '{print $2}')

echo -e "${YELLOW}Current images:${NC}"
echo "Frontend: $FRONTEND_IMAGE"
echo "Backend: $BACKEND_IMAGE"

# Update the docker-compose file
echo -e "${YELLOW}Updating docker-compose configuration...${NC}"
sed "s|\${FRONTEND_IMAGE:-zen-landing-frontend:latest}|$FRONTEND_IMAGE|g; s|\${BACKEND_IMAGE:-zen-landing-backend:latest}|$BACKEND_IMAGE|g" docker-compose.prod.nginx.yml > docker-compose.prod.yml

# Build the new Nginx image
echo -e "${YELLOW}Building Nginx container with verbose logging...${NC}"
docker build -t zen-landing-nginx:verbose -f Dockerfile.nginx .

# Stop and remove existing containers
echo -e "${YELLOW}Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down

# Start with new configuration
echo -e "${YELLOW}Starting containers with verbose Nginx logging...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to start
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Check if services are running
echo -e "${YELLOW}Checking services...${NC}"
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
  echo -e "${GREEN}Services are running with verbose Nginx logging enabled${NC}"
  echo -e "${YELLOW}To view Nginx logs:${NC}"
  echo "docker-compose -f docker-compose.prod.yml logs -f nginx"
  echo -e "${YELLOW}To disable verbose logging and revert to previous configuration:${NC}"
  echo "./scripts/disable-verbose-nginx.sh"
else
  echo -e "${RED}Error: Services failed to start properly${NC}"
  echo -e "${YELLOW}Rolling back to previous configuration...${NC}"
  cp docker-compose.prod.backup.yml docker-compose.prod.yml
  cp nginx.prod.backup.conf nginx.prod.conf
  docker-compose -f docker-compose.prod.yml up -d
  exit 1
fi