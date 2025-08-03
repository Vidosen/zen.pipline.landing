#!/bin/bash

# UptimeRobot API Setup Script
# Get your API key from: https://uptimerobot.com/dashboard#mySettings

API_KEY="your-api-key-here"
DOMAIN="zen-pipeline.ru"

echo "🚀 Setting up UptimeRobot monitoring for $DOMAIN"

# Create main site monitor
curl -X POST "https://api.uptimerobot.com/v2/newMonitor" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "api_key=$API_KEY" \
  -d "format=json" \
  -d "type=1" \
  -d "url=https://$DOMAIN/" \
  -d "friendly_name=$DOMAIN - Main Site" \
  -d "interval=300" \
  -d "timeout=30"

echo ""

# Create health endpoint monitor  
curl -X POST "https://api.uptimerobot.com/v2/newMonitor" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "api_key=$API_KEY" \
  -d "format=json" \
  -d "type=1" \
  -d "url=https://$DOMAIN/api/health" \
  -d "friendly_name=$DOMAIN - Health Check" \
  -d "interval=300" \
  -d "timeout=30"

echo ""
echo "✅ UptimeRobot monitors created!"
echo "📊 Check your dashboard: https://uptimerobot.com/dashboard"