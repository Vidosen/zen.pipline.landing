#!/bin/bash

# Setup comprehensive monitoring for Android timeout issues

DOMAIN="${1:-zen-pipeline.ru}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔧 Setting up comprehensive monitoring for $DOMAIN"

# Make scripts executable
chmod +x "$SCRIPT_DIR"/*.sh

# Setup keep-alive monitoring (every 2 minutes)
KEEPALIVE_CRON="*/2 * * * * DOMAIN=$DOMAIN $SCRIPT_DIR/keep-alive.sh"

# Setup performance monitoring (every 5 minutes)
MONITOR_CRON="*/5 * * * * DOMAIN=$DOMAIN $SCRIPT_DIR/monitor-performance.sh"

# Remove existing cron jobs for these scripts
crontab -l 2>/dev/null | grep -v "keep-alive.sh" | grep -v "monitor-performance.sh" | crontab -

# Add new cron jobs
(crontab -l 2>/dev/null; echo "$KEEPALIVE_CRON"; echo "$MONITOR_CRON") | crontab -

echo "✅ Monitoring setup complete!"
echo ""
echo "📋 Active monitoring:"
echo "   🔄 Keep-alive: Every 2 minutes"
echo "   📊 Performance: Every 5 minutes"
echo "   🎯 Target: $DOMAIN"
echo ""
echo "📁 Log files:"
echo "   📝 Keep-alive: /tmp/keep-alive.log"
echo "   📈 Performance: /tmp/performance-monitor.log"
echo ""
echo "🛠️  Management commands:"
echo "   View cron jobs: crontab -l"
echo "   Remove monitoring: crontab -e (delete the monitoring lines)"
echo "   View keep-alive logs: tail -f /tmp/keep-alive.log"
echo "   View performance logs: tail -f /tmp/performance-monitor.log"
echo ""
echo "🐳 Docker-based alternative:"
echo "   docker-compose -f docker-compose.keepalive.yml up -d"