#!/bin/bash

# Setup cron-based keep-alive as alternative to Docker service
# This is useful for external monitoring or when Docker service isn't preferred

DOMAIN="${1:-zen-pipeline.ru}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KEEP_ALIVE_SCRIPT="$SCRIPT_DIR/keep-alive.sh"

echo "Setting up cron-based keep-alive for $DOMAIN"

# Make sure keep-alive script is executable
chmod +x "$KEEP_ALIVE_SCRIPT"

# Create cron job entry (every 2 minutes)
CRON_ENTRY="*/2 * * * * DOMAIN=$DOMAIN $KEEP_ALIVE_SCRIPT"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "keep-alive.sh"; then
    echo "⚠️  Keep-alive cron job already exists"
    echo "Current cron jobs:"
    crontab -l | grep "keep-alive.sh"
else
    # Add to crontab
    (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -
    echo "✅ Added keep-alive cron job: $CRON_ENTRY"
fi

echo ""
echo "📋 Setup complete!"
echo "   - Keep-alive script: $KEEP_ALIVE_SCRIPT"
echo "   - Target domain: $DOMAIN"
echo "   - Frequency: Every 2 minutes"
echo "   - Logs: /tmp/keep-alive.log"
echo ""
echo "To remove: crontab -e and delete the keep-alive.sh line"
echo "To check logs: tail -f /tmp/keep-alive.log"