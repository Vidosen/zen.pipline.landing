# Deployment

## Production Deployment

### GitHub Actions Workflows ✅
**Status:** ACTIVE - Modern CI/CD pipeline  
**Location:** `.github/workflows/`  
**Features:**
- Automated Docker image builds with `--no-cache`
- GitHub Container Registry (GHCR) for image storage
- Manual production deployment with approval
- Automatic nginx.prod.conf updates
- Health checks and validation
- Deployment summaries

**Workflows:**
- `deploy.yml` - Build, test, and push images on every commit
- `manual-deploy.yml` - Manual production deployment via GitHub UI

### Local Development Script ⚠️
**Status:** RESERVE - Local deployment script  
**Usage:** `./deploy.sh [dev|prod|ssl]`  
**Target:** Local development or testing  
**Features:**
- Local Docker Compose deployment
- Development, production and SSL modes
- Let's Encrypt integration
- Well-structured argument parsing

**Note:** For local development only. Production uses GitHub Actions.

## Current Infrastructure

- **Server IP:** 95.163.220.11
- **Authentication:** Password-based SSH (root user)
- **Services:** PostgreSQL + Node.js Backend + Nginx Frontend
- **Deployment:** Docker Compose based
- **Configuration:** HTTP + HTTPS with SSL certificates

## Deployment Process

### Production Deployment
1. **GitHub Actions** → **Manual Production Deployment**
2. Input confirmation: `deploy`
3. Select image tag (default: `latest`)
4. Click **Run workflow**
5. Automatic deployment with health checks

### Quick Server Commands

```bash
# Check server status
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && docker-compose ps'

# View logs
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && docker-compose logs -f'

# Test endpoints
curl https://zen-pipeline.ru/
curl https://zen-pipeline.ru/api/health
``` 