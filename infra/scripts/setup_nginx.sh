#!/bin/bash
set -e

# Variables - update these
DOMAIN="your-domain.com"
EMAIL="your-email@example.com"
APP_PATH="/var/www/landing"

# Create app directory
sudo mkdir -p $APP_PATH

# Configure Nginx
sudo cat > /tmp/landing-nginx.conf << 'EOL'
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN_PLACEHOLDER;

    root /var/www/landing;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires max;
        log_not_found off;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOL

# Replace placeholder with actual domain
sudo sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" /tmp/landing-nginx.conf

# Copy to nginx sites-available and enable
sudo cp /tmp/landing-nginx.conf /etc/nginx/sites-available/$DOMAIN
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Setup SSL with Certbot
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m $EMAIL

echo "Nginx configuration completed!" 