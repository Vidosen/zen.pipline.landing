# Nginx Verbose Logging

This document explains how to enable and use verbose logging for Nginx in the Zen Pipeline landing page deployment.

## Overview

The standard Nginx configuration has been enhanced with:

1. **Detailed logging format** - Captures request timing, connection details, and more
2. **Debug level error logging** - More comprehensive error information
3. **Separate container architecture** - Nginx runs in its own container for better isolation

## Deployment Options

### Option 1: GitHub Actions Workflow (Recommended)

The easiest way to deploy with verbose Nginx logging is using the GitHub Actions workflow:

1. Go to the GitHub repository Actions tab
2. Select "Deploy with Verbose Nginx" workflow
3. Click "Run workflow"
4. Enter "deploy" in the confirmation field
5. Select the image tag (default: latest)
6. Click "Run workflow"

This will:
- Build and push a new Nginx image with verbose logging
- Deploy the application with the separate Nginx container
- Verify the deployment

### Option 2: Manual Server Deployment

If you need to enable verbose logging on an existing deployment:

1. Upload the required files to the server:
   ```bash
   sshpass -p "$SSH_PASSWORD" scp -r \
     landing-page/nginx.verbose.conf \
     landing-page/docker-compose.prod.nginx.yml \
     landing-page/Dockerfile.nginx \
     landing-page/scripts/enable-verbose-nginx.sh \
     landing-page/scripts/disable-verbose-nginx.sh \
     $DEPLOY_USER@$DEPLOY_HOST:/opt/zen-landing/
   ```

2. Make the scripts executable:
   ```bash
   sshpass -p "$SSH_PASSWORD" ssh $DEPLOY_USER@$DEPLOY_HOST 'chmod +x /opt/zen-landing/scripts/enable-verbose-nginx.sh /opt/zen-landing/scripts/disable-verbose-nginx.sh'
   ```

3. Run the enable script:
   ```bash
   sshpass -p "$SSH_PASSWORD" ssh $DEPLOY_USER@$DEPLOY_HOST 'cd /opt/zen-landing && ./scripts/enable-verbose-nginx.sh'
   ```

## Viewing Logs

To view the verbose Nginx logs:

```bash
# Connect to the server
sshpass -p "$SSH_PASSWORD" ssh $DEPLOY_USER@$DEPLOY_HOST

# View real-time logs
cd /opt/zen-landing
docker-compose -f docker-compose.prod.yml logs -f nginx

# View specific log files
docker exec -it zen-landing-nginx cat /var/log/nginx/access.log
docker exec -it zen-landing-nginx cat /var/log/nginx/error.log
```

## Understanding the Log Format

The verbose log format includes:

```
$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent 
"$http_referer" "$http_user_agent" $request_time $upstream_response_time $pipe 
"$http_x_forwarded_for" "$http_x_real_ip" $connection $connection_requests
```

Key fields:
- `$request_time` - Total request processing time
- `$upstream_response_time` - Time spent waiting for upstream response
- `$pipe` - If request was pipelined (p) or not (.)
- `$connection` - Connection serial number
- `$connection_requests` - Number of requests made through this connection

## Disabling Verbose Logging

To revert to the standard logging configuration:

```bash
# Connect to the server
sshpass -p "$SSH_PASSWORD" ssh $DEPLOY_USER@$DEPLOY_HOST

# Run the disable script
cd /opt/zen-landing
./scripts/disable-verbose-nginx.sh
```

## Troubleshooting

If you encounter issues with the verbose logging setup:

1. Check Nginx configuration validity:
   ```bash
   docker exec zen-landing-nginx nginx -t
   ```

2. Verify container status:
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

3. Check for port binding issues:
   ```bash
   netstat -tlnp | grep -E ':80|:443'
   ```

4. If needed, restart the Nginx container:
   ```bash
   docker-compose -f docker-compose.prod.yml restart nginx
   ```