#!/bin/bash

# Port verification script for zen-landing
# Ensures both HTTP (80) and HTTPS (443) ports are properly exposed

set -e

echo "🔍 Zen Landing - Port Verification Script"
echo "======================================="

# Check if we're on the server
if [ ! -d "/opt/zen-landing" ]; then
    echo "❌ This script should be run on the production server"
    exit 1
fi

cd /opt/zen-landing

# Check if containers are running
echo "📊 Checking container status..."
if ! docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "❌ Containers are not running. Starting them..."
    docker-compose -f docker-compose.prod.yml up -d
    sleep 10
fi

# Verify port bindings
echo "🔍 Verifying port bindings..."
HTTP_PORT=$(netstat -tlnp | grep -E ':80.*LISTEN' | wc -l)
HTTPS_PORT=$(netstat -tlnp | grep -E ':443.*LISTEN' | wc -l)

echo "HTTP (80) listeners: $HTTP_PORT"
echo "HTTPS (443) listeners: $HTTPS_PORT"

if [ "$HTTP_PORT" -eq 0 ] || [ "$HTTPS_PORT" -eq 0 ]; then
    echo "❌ Port binding issue detected!"
    echo "🔧 Attempting to fix..."
    
    # Stop and remove frontend container
    docker stop zen-landing-frontend || true
    docker rm zen-landing-frontend || true
    
    # Restart frontend with proper port binding
    docker-compose -f docker-compose.prod.yml up -d frontend
    sleep 5
    
    # Recheck
    HTTP_PORT=$(netstat -tlnp | grep -E ':80.*LISTEN' | wc -l)
    HTTPS_PORT=$(netstat -tlnp | grep -E ':443.*LISTEN' | wc -l)
    
    if [ "$HTTP_PORT" -eq 0 ] || [ "$HTTPS_PORT" -eq 0 ]; then
        echo "❌ Still having port issues. Manual intervention required."
        echo "Current port status:"
        netstat -tlnp | grep -E ':80|:443'
        exit 1
    fi
fi

echo "✅ Port verification successful!"
echo "📊 Current port status:"
netstat -tlnp | grep -E ':80|:443'

# Test HTTP and HTTPS endpoints
echo ""
echo "🌐 Testing endpoints..."

# Test HTTP
if curl -f -s http://localhost/ > /dev/null; then
    echo "✅ HTTP (port 80) is working"
else
    echo "❌ HTTP (port 80) failed"
fi

# Test HTTPS
if curl -f -s -k https://localhost/ > /dev/null; then
    echo "✅ HTTPS (port 443) is working"
else
    echo "❌ HTTPS (port 443) failed"
fi

# Test API
if curl -f -s http://localhost/api/health > /dev/null; then
    echo "✅ API endpoint is working"
else
    echo "❌ API endpoint failed"
fi

echo ""
echo "🎉 Port verification completed!"