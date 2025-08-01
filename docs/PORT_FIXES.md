# Port Binding Fixes for Mobile HTTPS Access

## Problem Description

Mobile browsers were getting `ERR_CONNECTION_REFUSED` when accessing `zen-pipeline.ru` because:

1. **Mobile browsers prefer HTTPS first** - they automatically try port 443
2. **Docker port 443 wasn't properly exposed** - causing connection refused
3. **Desktop browsers tried HTTP first** - so they worked fine on port 80

## Root Cause

Docker Compose's `--force-recreate` flag doesn't always properly rebind ports when containers are updated. This led to:
- Port 80 (HTTP) working correctly ✅
- Port 443 (HTTPS) not being exposed ❌

## Fixes Applied

### 1. GitHub Actions Pipeline (`manual-deploy.yml`)

**Before:**
```bash
docker-compose -f docker-compose.prod.yml up -d --force-recreate
```

**After:**
```bash
# Deploy with proper container recreation
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

# Verify both HTTP and HTTPS ports are working
if netstat -tlnp | grep -E ':80.*LISTEN' && netstat -tlnp | grep -E ':443.*LISTEN'; then
  echo '✅ Both HTTP and HTTPS ports are properly exposed'
else
  echo '❌ Port binding issue detected! Retrying...'
  docker stop zen-landing-frontend || true
  docker rm zen-landing-frontend || true
  docker-compose -f docker-compose.prod.yml up -d frontend
fi
```

### 2. GitHub Actions Manual Deploy Workflow

Port verification is now handled in the manual-deploy.yml workflow:
```bash
# Verify both HTTP and HTTPS ports are working
echo '🔍 Verifying HTTP (80) and HTTPS ports...'
if netstat -tlnp | grep -E ':80.*LISTEN' && netstat -tlnp | grep -E ':443.*LISTEN'; then
  echo '✅ Both HTTP and HTTPS ports are properly exposed'
else
  echo '❌ Port binding issue detected! Retrying with manual container restart...'
  docker stop zen-landing-frontend || true
  docker rm zen-landing-frontend || true
  docker-compose -f docker-compose.prod.yml up -d frontend
  sleep 5
fi
```

### 3. Port Verification Script (`scripts/verify-ports.sh`)

Created dedicated script for troubleshooting port issues:
```bash
./scripts/verify-ports.sh
```

This script:
- Checks if containers are running
- Verifies both HTTP (80) and HTTPS (443) ports are listening
- Automatically fixes port binding issues
- Tests actual HTTP/HTTPS endpoints
- Provides detailed diagnostics

### 4. Enhanced Deployment Verification

**Pipeline now tests both protocols:**
```bash
# Test HTTP
curl -f -s http://$DEPLOY_HOST/
# Test HTTPS
curl -f -s -k https://$DEPLOY_HOST/
```

## Prevention Strategy

1. **Always use `docker-compose down` before `up -d`** instead of `--force-recreate`
2. **Verify port bindings after deployment** using `netstat`
3. **Test both HTTP and HTTPS endpoints** in CI/CD
4. **Use dedicated verification script** for troubleshooting

## Quick Verification Commands

```bash
# Check port status
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'netstat -tlnp | grep -E ":80|:443"'

# Run full verification
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && bash scripts/verify-ports.sh'

# Test endpoints
curl http://zen-pipeline.ru/
curl https://zen-pipeline.ru/
```

## Result

✅ **Mobile browsers now work correctly**  
✅ **Both HTTP and HTTPS are accessible**  
✅ **Automated verification prevents future issues**  
✅ **CI/CD pipeline catches port problems early**

The issue is now resolved and future deployments will automatically verify port bindings.