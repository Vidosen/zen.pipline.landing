#!/bin/bash

# Keep-alive script to prevent container cold starts
# This script pings the health endpoints to keep containers warm

DOMAIN="${DOMAIN:-zen-pipeline.ru}"
LOG_FILE="/tmp/keep-alive.log"
HEALTH_ENDPOINTS=(
    "https://${DOMAIN}/api/health"
    "https://${DOMAIN}/"
)

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Function to ping endpoint
ping_endpoint() {
    local url="$1"
    local response_code
    
    response_code=$(curl -s -o /dev/null -w "%{http_code}" \
        --max-time 10 \
        --connect-timeout 5 \
        --user-agent "ZenPipeline-KeepAlive/1.0" \
        "$url")
    
    if [ "$response_code" = "200" ]; then
        log "✅ $url - OK ($response_code)"
        return 0
    else
        log "❌ $url - FAILED ($response_code)"
        return 1
    fi
}

# Main keep-alive loop
main() {
    log "🚀 Starting keep-alive monitoring for $DOMAIN"
    
    local failed_count=0
    
    for endpoint in "${HEALTH_ENDPOINTS[@]}"; do
        if ping_endpoint "$endpoint"; then
            failed_count=0
        else
            ((failed_count++))
        fi
    done
    
    # Alert if too many failures
    if [ $failed_count -gt 1 ]; then
        log "🚨 ALERT: Multiple endpoints failed - possible service issues"
    fi
    
    # Cleanup old logs (keep last 1000 lines)
    if [ -f "$LOG_FILE" ]; then
        tail -n 1000 "$LOG_FILE" > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE"
    fi
}

# Run the main function
main