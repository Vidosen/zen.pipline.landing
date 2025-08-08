#!/bin/bash
# Script to disable verbose Nginx logging and revert to original configuration

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Disabling Verbose Nginx Logging ===${NC}"

# Check if we're running on the server
if [ ! -d "/opt/zen-landing" ]; then
  echo -e "${RED}Error: This script should be run on the production server in /opt/zen-landing${NC}"
  echo -e "${YELLOW}You can use: sshpass -p 'PASSWORD' ssh root@95.163.220.11 'bash -s' < $0${NC}"
  exit 1
fi

cd /opt/zen-landing

# Check if backup files exist
if [ ! -f "docker-compose.prod.backup.yml" ] || [ ! -f "nginx.prod.backup.conf" ]; then
  echo -e "${RED}Error: Backup files not found. Cannot revert to previous configuration.${NC}"
  exit 1
fi

# Get current container images
FRONTEND_IMAGE=$(docker-compose -f docker-compose.prod.yml config | grep 'image: ' | grep frontend | awk '{print $2}')
BACKEND_IMAGE=$(docker-compose -f docker-compose.prod.yml config | grep 'image: ' | grep backend | awk '{print $2}')

echo -e "${YELLOW}Current images:${NC}"
echo "Frontend: $FRONTEND_IMAGE"
echo "Backend: $BACKEND_IMAGE"

# Restore original configuration
echo -e "${YELLOW}Restoring original configuration...${NC}"
cp docker-compose.prod.backup.yml docker-compose.prod.yml
cp nginx.prod.backup.conf nginx.prod.conf

# Update image names in the restored docker-compose file
sed -i "s|\${FRONTEND_IMAGE:-zen-landing-frontend:latest}|$FRONTEND_IMAGE|g; s|\${BACKEND_IMAGE:-zen-landing-backend:latest}|$BACKEND_IMAGE|g" docker-compose.prod.yml

# Stop and remove existing containers
echo -e "${YELLOW}Stopping containers...${NC}"
docker-compose -f docker-compose.prod.yml down

# Start with original configuration
echo -e "${YELLOW}Starting containers with original configuration...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to start
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Check if services are running
echo -e "${YELLOW}Checking services...${NC}"
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
  echo -e "${GREEN}Services are running with original Nginx configuration${NC}"
  echo -e "${YELLOW}To view standard Nginx logs:${NC}"
  echo "docker-compose -f docker-compose.prod.yml logs -f frontend"
else
  echo -e "${RED}Error: Services failed to start properly${NC}"
  exit 1
fi