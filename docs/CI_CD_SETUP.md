# CI/CD Pipeline Setup for Landing Page

## Overview

This document describes the modern CI/CD pipeline for the Zen Pipeline landing page, which includes:

- **Build Stage**: Automated building and testing on every push/PR
- **Container Registry**: GitHub Container Registry for Docker images
- **Staging Environment**: Automatic deployment to staging on `develop` branch
- **Production Environment**: Manual approval required for production deployment
- **Zero-downtime Deployment**: Blue-green deployment strategy
- **Automatic Rollback**: Health check failures trigger automatic rollback

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  GitHub Actions  │───▶│  GHCR Registry  │
│                 │    │                  │    │                 │
│ - Push to dev   │    │ 1. Build & Test  │    │ - Frontend img  │
│ - Push to master│    │ 2. Build Docker  │    │ - Backend img   │
│ - Pull Requests │    │ 3. Push to GHCR  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Environments   │
                       │                  │
                       │ Staging (auto)   │◀── develop branch
                       │ Production (manual)◀── master branch
                       └──────────────────┘
```

## Prerequisites

### 1. GitHub Repository Settings

Enable GitHub Container Registry:
1. Go to repository Settings → Actions → General
2. Set "Workflow permissions" to "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"

### 2. GitHub Secrets Configuration

Add the following secrets in repository Settings → Secrets and variables → Actions:

```bash
# SSH Configuration
SSH_PRIVATE_KEY     # Private SSH key for server access
DEPLOY_HOST        # Production server IP/hostname
DEPLOY_USER        # SSH username (e.g., root)

# Optional: Database credentials (if different from defaults)
DB_PASSWORD        # Production database password
```

### 3. GitHub Environments

Create environments in repository Settings → Environments:

#### Staging Environment
- Name: `staging`
- No protection rules (automatic deployment)

#### Production Environment
- Name: `production`
- Protection rules:
  - ✅ Required reviewers (add team members)
  - ✅ Wait timer: 0 minutes
  - ✅ Restrict pushes to protected branches: `master`
- Environment URL: `https://zen-pipeline.ru`

## Server Setup

### 1. Install Prerequisites on Production Server

```bash
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install envsubst (for template processing)
apt-get update && apt-get install -y gettext-base

# Create application directory
mkdir -p /opt/zen-landing
chown $USER:$USER /opt/zen-landing
```

### 2. Deploy Template Files

Copy the following files to `/opt/zen-landing/`:
- `docker-compose.prod.template.yml`
- `nginx.prod.conf`
- `init-db.sql`
- `ssl/` directory (if using custom SSL)
- `scripts/deploy-production.sh`

```bash
# Make deployment script executable
chmod +x /opt/zen-landing/scripts/deploy-production.sh
```

### 3. Environment Configuration

Create `/opt/zen-landing/.env`:
```bash
# Database configuration
DB_NAME=zen_pipeline
DB_USER=zen_api
DB_PASSWORD=your_secure_password_here

# Domain configuration
DOMAIN=zen-pipeline.ru
LETSENCRYPT_EMAIL=admin@zen-pipeline.ru

# Application settings
NODE_ENV=production
PORT=3001
```

## Workflow Details

### Build Job (`build`)

**Triggers**: Every push to `master`/`develop`, every PR to `master`

**Actions**:
1. Checkout code
2. Setup Node.js 18
3. Install dependencies
4. Run tests (if any)
5. Build frontend
6. Build and push Docker images to GHCR
7. Generate image tags for deployment

**Outputs**:
- `frontend-image`: Tagged frontend Docker image
- `backend-image`: Tagged backend Docker image

### Staging Deployment (`deploy-staging`)

**Triggers**: Push to `develop` branch (automatic)

**Actions**:
1. Deploy to staging environment
2. No manual approval required
3. Uses images from build job

### Production Deployment (`deploy-production`)

**Triggers**: Push to `master` branch (requires manual approval)

**Actions**:
1. **Manual approval required** (configured in GitHub environment)
2. SSH to production server
3. Run zero-downtime deployment script
4. Health check verification
5. Automatic rollback on failure

## Deployment Process

### 1. Development Workflow

```bash
# Feature development
git checkout develop
git checkout -b feature/new-feature
# ... make changes ...
git commit -m "Add new feature"
git push origin feature/new-feature

# Create PR to develop
# After merge, automatic staging deployment
```

### 2. Production Deployment

```bash
# Merge develop to master
git checkout master
git merge develop
git push origin master

# This triggers:
# 1. Build job (automatic)
# 2. Production deployment job (waits for manual approval)
```

### 3. Manual Approval Process

1. Push to `master` triggers the workflow
2. Build job completes automatically
3. Production deployment job waits for approval
4. Authorized team members receive notification
5. Reviewer approves deployment in GitHub Actions UI
6. Deployment proceeds automatically

## Zero-Downtime Deployment

The production deployment uses a sophisticated zero-downtime strategy:

1. **Backup**: Current configuration is backed up
2. **Pull Images**: New Docker images are pulled
3. **Blue-Green Deploy**: New containers start alongside old ones
4. **Health Check**: New containers are verified healthy
5. **Traffic Switch**: Old containers are stopped
6. **Cleanup**: Old images are removed

## Rollback Strategy

### Automatic Rollback

If health checks fail during deployment:
1. Deployment script automatically restores previous backup
2. Old containers are restarted
3. Health check is performed on rolled-back version
4. Deployment is marked as failed

### Manual Rollback

```bash
# SSH to production server
ssh user@production-server

# Navigate to app directory
cd /opt/zen-landing

# List available backups
ls -la /opt/zen-landing-backups/

# Restore specific backup
cp /opt/zen-landing-backups/backup-YYYYMMDD-HHMMSS/docker-compose.prod.yml .
docker-compose -f docker-compose.prod.yml up -d --no-deps frontend backend
```

## Monitoring and Troubleshooting

### View Deployment Logs

```bash
# GitHub Actions logs
# Go to repository → Actions → Select workflow run → View logs

# Production server logs
ssh user@production-server
cd /opt/zen-landing
docker-compose -f docker-compose.prod.yml logs -f
```

### Health Check Endpoint

The deployment process relies on the health check endpoint:
- URL: `http://localhost/api/health`
- Expected: HTTP 200 response
- Timeout: 60 seconds with 5-second intervals

### Common Issues

1. **Health Check Failures**
   - Check backend service logs
   - Verify database connectivity
   - Ensure proper environment variables

2. **Image Pull Failures**
   - Verify GHCR permissions
   - Check image tags in workflow logs
   - Ensure Docker daemon is running

3. **SSH Connection Issues**
   - Verify SSH key in GitHub secrets
   - Check server accessibility
   - Confirm user permissions

## Security Considerations

1. **SSH Keys**: Use dedicated deployment keys with minimal permissions
2. **Secrets Management**: All sensitive data stored in GitHub Secrets
3. **Container Registry**: Private GHCR repository
4. **Network Security**: Proper firewall configuration on production server
5. **SSL/TLS**: HTTPS enforced with proper certificates

## Maintenance

### Regular Tasks

1. **Image Cleanup**: Automatic cleanup of old Docker images
2. **Backup Rotation**: Keeps last 5 deployment backups
3. **Log Rotation**: Configure log rotation for Docker containers
4. **Security Updates**: Regular updates of base images and dependencies

### Scaling Considerations

- Add load balancer for multiple production servers
- Implement database replication for high availability
- Consider using Kubernetes for advanced orchestration
- Add monitoring and alerting (Prometheus/Grafana)

## Migration from Old Pipeline

1. **Backup Current Setup**: Save existing deployment scripts and configurations
2. **Test in Staging**: Deploy to staging environment first
3. **Update DNS**: Ensure proper DNS configuration
4. **SSL Certificates**: Migrate SSL certificates to new structure
5. **Database Migration**: Plan for database compatibility if needed

This modern CI/CD pipeline provides enterprise-grade deployment capabilities with proper security, monitoring, and rollback mechanisms. 