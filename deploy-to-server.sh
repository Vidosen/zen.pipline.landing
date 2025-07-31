#!/bin/bash

# Deploy Landing Page to server with password
set -e

TARGET_IP="95.163.220.11"
PASSWORD="YruQ8kpFPET03sd7"
USER="root"

echo "🚀 Deploying Landing Page to $TARGET_IP"
echo "======================================"

# Check if sshpass is available
if ! command -v sshpass &> /dev/null; then
    echo "❌ sshpass not found. Installing..."
    brew install hudochenkov/sshpass/sshpass || {
        echo "Please install sshpass manually: brew install hudochenkov/sshpass/sshpass"
        exit 1
    }
fi

echo "✅ SSH connection available"

# Check if landing-page directory exists
if [ ! -d "landing-page" ]; then
    echo "❌ landing-page directory not found."
    echo "Please run this script from the project root."
    exit 1
fi

echo "📦 Preparing landing page for deployment..."

# Create deployment package
DEPLOY_DIR="/tmp/zen-landing-deploy-$(date +%s)"
mkdir -p "$DEPLOY_DIR"

# Copy files excluding gitignore patterns
echo "📁 Copying files (excluding node_modules, build artifacts)..."

# Build rsync exclude options
EXCLUDE_OPTS="--exclude='node_modules' --exclude='build' --exclude='dist' --exclude='.next' --exclude='coverage' --exclude='*.log' --exclude='.env.local' --exclude='.env.*.local'"

# Add .gitignore if it exists
if [ -f "landing-page/.gitignore" ]; then
    echo "📋 Using .gitignore patterns"
    EXCLUDE_OPTS="$EXCLUDE_OPTS --exclude-from=landing-page/.gitignore"
fi

# Copy with exclusions
eval "rsync -av $EXCLUDE_OPTS landing-page/ \"$DEPLOY_DIR/\""

# Verify essential files are copied
if [ ! -f "$DEPLOY_DIR/package.json" ] || [ ! -f "$DEPLOY_DIR/server.js" ]; then
    echo "❌ Essential files missing after copy. Check exclusion patterns."
    exit 1
fi

echo "✅ Files copied successfully ($(du -sh "$DEPLOY_DIR" | cut -f1))"

# Create environment file
cat > "$DEPLOY_DIR/.env" << EOF
NODE_ENV=production
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=zen_pipeline
DB_USER=zen_api
DB_PASSWORD=zen_prod_secure_password_2024
EOF

echo "🚀 Uploading files to server..."
sshpass -p "$PASSWORD" scp -r "$DEPLOY_DIR" $USER@$TARGET_IP:/tmp/zen-landing

echo "🔧 Setting up on server..."
sshpass -p "$PASSWORD" ssh $USER@$TARGET_IP << 'REMOTE_SCRIPT'
# Create app directory
mkdir -p /opt/zen-landing
chown root:root /opt/zen-landing

# Move files
cp -r /tmp/zen-landing/* /opt/zen-landing/

# Check if files are in subdirectory and move them up
if [ -d "/opt/zen-landing/zen-landing-deploy-"* ]; then
    echo "📁 Moving files from subdirectory..."
    SUBDIR=$(ls -d /opt/zen-landing/zen-landing-deploy-* | head -1)
    mv "$SUBDIR"/* /opt/zen-landing/ 2>/dev/null || true
    mv "$SUBDIR"/.* /opt/zen-landing/ 2>/dev/null || true
    rm -rf "$SUBDIR"
fi

cd /opt/zen-landing

# Verify docker-compose file exists
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ docker-compose.prod.yml not found!"
    ls -la
    exit 1
fi

# Stop existing containers
docker-compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true

# Check if SSL certificates exist and use appropriate config
if [ -f "ssl/zen-pipeline.ru-fullchain.crt" ] && [ -f "ssl/zen-pipeline.ru.key" ]; then
    echo "🔒 SSL certificates found, using HTTPS configuration..."
    echo "🔨 Building containers..."
    docker-compose -f docker-compose.prod.yml build
    
    echo "🚀 Starting services..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up -d
    SSL_ENABLED=true
else
    echo "⚠️ No SSL certificates found, using HTTP only..."
    echo "🔨 Building containers..."
    docker-compose -f docker-compose.yml build
    
    echo "🚀 Starting services..."
    docker-compose -f docker-compose.yml up -d
    SSL_ENABLED=false
fi

# Wait for services
echo "⏳ Waiting for services to start..."
sleep 15

# Verify port bindings
if [ "$SSL_ENABLED" = true ]; then
    echo "🔍 Verifying HTTP (80) and HTTPS (443) ports..."
    if netstat -tlnp | grep -E ':80.*LISTEN' && netstat -tlnp | grep -E ':443.*LISTEN'; then
        echo "✅ Both HTTP and HTTPS ports are properly exposed"
    else
        echo "❌ Port binding issue detected! Fixing..."
        docker stop zen-landing-frontend || true
        docker rm zen-landing-frontend || true
        docker-compose -f docker-compose.prod.yml up -d frontend
        sleep 5
    fi
fi

# Check status
echo "📊 Service status:"
if [ "$SSL_ENABLED" = true ]; then
    docker-compose -f docker-compose.prod.yml ps
else
    docker-compose -f docker-compose.yml ps
fi

echo "📝 Backend logs:"
if [ "$SSL_ENABLED" = true ]; then
    docker-compose -f docker-compose.prod.yml logs --tail=10 backend
else
    docker-compose -f docker-compose.yml logs --tail=10 backend
fi

# Cleanup
rm -rf /tmp/zen-landing
REMOTE_SCRIPT

# Cleanup local temp
rm -rf "$DEPLOY_DIR"

echo ""
echo "🎉 Deployment completed!"
echo "====================="
if [ "$SSL_ENABLED" = true ]; then
    echo "🌐 Landing Page URL: https://$TARGET_IP (HTTPS)"
    echo "🌐 Landing Page URL: http://$TARGET_IP (HTTP redirect)"
    echo "🔧 API Health: https://$TARGET_IP/api/health"
    echo "🔒 SSL: Enabled with zen-pipeline.ru certificates"
else
    echo "🌐 Landing Page URL: http://$TARGET_IP"
    echo "🔧 API Health: http://$TARGET_IP/api/health"
    echo "⚠️ SSL: Disabled (no certificates found)"
fi
echo ""
echo "📊 Check status:"
echo "sshpass -p '$PASSWORD' ssh $USER@$TARGET_IP 'cd /opt/zen-landing && docker-compose -f docker-compose.yml ps'"
echo ""
echo "📝 View logs:"
echo "sshpass -p '$PASSWORD' ssh $USER@$TARGET_IP 'cd /opt/zen-landing && docker-compose -f docker-compose.yml logs -f'"

echo "✅ Deployment script completed!" 