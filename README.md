# Deployment Scripts

## Active Scripts

### `deploy-to-server.sh` ✅
**Status:** ACTIVE - Main deployment script for landing page  
**Usage:** `./scripts/deploy-to-server.sh`  
**Target:** 95.163.220.11 (current VPS server)  
**Features:**
- Optimized file copying (excludes node_modules, build artifacts)
- Uses .gitignore patterns
- Password-based SSH authentication
- Automatic container management
- Health checks

**Last Updated:** July 29, 2025

### `../landing-page/deploy.sh` ⚠️
**Status:** RESERVE - Local deployment script  
**Usage:** `cd landing-page && ./deploy.sh [dev|prod|ssl]`  
**Target:** Local development or future domain-based deployment  
**Features:**
- Local Docker Compose deployment
- Development, production and SSL modes
- Let's Encrypt integration
- Well-structured argument parsing

**Note:** Not used for current VPS deployment, but useful for local development

## Current Infrastructure

- **Server IP:** 95.163.220.11
- **Authentication:** Password-based SSH (root user)
- **Services:** PostgreSQL + Node.js Backend + Nginx Frontend
- **Deployment:** Docker Compose based
- **Configuration:** HTTP + HTTPS with SSL certificates

## Quick Commands

```bash
# Deploy landing page
./deploy-to-server.sh

# Check server status
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && docker-compose ps'

# Verify ports (HTTP/HTTPS) - NEW!
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && bash scripts/verify-ports.sh'

# View logs
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && docker-compose logs -f'

# Test endpoints
curl http://95.163.220.11/
curl https://95.163.220.11/
curl http://95.163.220.11/api/health
``` 