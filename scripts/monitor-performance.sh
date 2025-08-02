#!/bin/bash

# Performance monitoring script for Android timeout issues
# Monitors response times and alerts on slow responses

DOMAIN="${DOMAIN:-zen-pipeline.ru}"
LOG_FILE="/tmp/performance-monitor.log"
ALERT_THRESHOLD=5000  # 5 seconds in milliseconds
SLOW_THRESHOLD=2000   # 2 seconds in milliseconds

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to send alert (extend this for Telegram/Slack/Email)
send_alert() {
    local message="$1"
    log "🚨 ALERT: $message"
    
    # TODO: Add your preferred alerting method here
    # Examples:
    # - Telegram bot API
    # - Slack webhook
    # - Email via sendmail
    # - Discord webhook
}

# Function to measure response time
measure_response_time() {
    local url="$1"
    local user_agent="$2"
    
    local start_time=$(date +%s%3N)
    local response_code
    local response_time
    
    response_code=$(curl -s -o /dev/null -w "%{http_code}" \
        --max-time 30 \
        --connect-timeout 10 \
        --user-agent "$user_agent" \
        "$url")
    
    local end_time=$(date +%s%3N)
    response_time=$((end_time - start_time))
    
    echo "$response_code:$response_time"
}

# Function to test different user agents
test_user_agents() {
    local url="$1"
    local user_agents=(
        "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
    
    local ua_names=("Android" "iPhone" "Desktop")
    local slow_count=0
    local timeout_count=0
    
    for i in "${!user_agents[@]}"; do
        local result=$(measure_response_time "$url" "${user_agents[$i]}")
        local response_code=$(echo "$result" | cut -d: -f1)
        local response_time=$(echo "$result" | cut -d: -f2)
        local ua_name="${ua_names[$i]}"
        
        if [ "$response_code" = "000" ]; then
            log "❌ $ua_name: TIMEOUT (>${response_time}ms)"
            ((timeout_count++))
        elif [ "$response_time" -gt "$ALERT_THRESHOLD" ]; then
            log "🐌 $ua_name: VERY SLOW ${response_time}ms (HTTP $response_code)"
            ((slow_count++))
        elif [ "$response_time" -gt "$SLOW_THRESHOLD" ]; then
            log "⚠️  $ua_name: SLOW ${response_time}ms (HTTP $response_code)"
        else
            log "✅ $ua_name: OK ${response_time}ms (HTTP $response_code)"
        fi
    done
    
    # Send alerts if needed
    if [ $timeout_count -gt 0 ]; then
        send_alert "Timeouts detected: $timeout_count user agents failed to connect to $url"
    fi
    
    if [ $slow_count -gt 0 ]; then
        send_alert "Slow responses detected: $slow_count user agents had >5s response time on $url"
    fi
    
    # Special alert for Android-specific issues
    if [ $timeout_count -eq 1 ] && [ "${ua_names[0]}" = "Android" ]; then
        send_alert "Android-specific timeout detected - potential cold start issue!"
    fi
}

# Function to check container health
check_container_health() {
    local containers=("zen-landing-frontend" "zen-landing-backend" "zen-landing-postgres")
    
    for container in "${containers[@]}"; do
        if docker ps --filter "name=$container" --filter "status=running" | grep -q "$container"; then
            local health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "no-healthcheck")
            log "📦 $container: running ($health)"
        else
            log "💀 $container: NOT RUNNING"
            send_alert "Container $container is not running!"
        fi
    done
}

# Main monitoring function
main() {
    log "🔍 Starting performance monitoring for $DOMAIN"
    
    # Test main endpoints with different user agents
    test_user_agents "https://$DOMAIN/"
    test_user_agents "https://$DOMAIN/api/health"
    
    # Check container health
    check_container_health
    
    # Cleanup old logs (keep last 2000 lines)
    if [ -f "$LOG_FILE" ]; then
        tail -n 2000 "$LOG_FILE" > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE"
    fi
    
    log "✅ Monitoring cycle completed"
    echo "---"
}

# Run the main function
main