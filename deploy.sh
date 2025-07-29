#!/bin/bash

# Zen Pipeline Landing Page Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  dev                 Development deployment (HTTP only)"
    echo "  prod                Production deployment with Let's Encrypt SSL"
    echo "  ssl                 Production deployment with custom SSL certificates"
    echo ""
    echo "Options:"
    echo "  --quick             Skip cache rebuild (faster deployment)"
    echo "  --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev              # Development deployment"
    echo "  $0 prod             # Production with Let's Encrypt"
    echo "  $0 ssl              # Production with custom SSL"
    echo "  $0 ssl --quick      # Quick SSL deployment"
}

# Parse arguments
COMMAND=""
QUICK_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        dev|prod|ssl)
            COMMAND="$1"
            shift
            ;;
        --quick)
            QUICK_MODE=true
            shift
            ;;
        --help)
            print_usage
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            print_usage
            exit 1
            ;;
    esac
done

if [ -z "$COMMAND" ]; then
    echo -e "${RED}❌ No command specified${NC}"
    print_usage
    exit 1
fi

echo -e "${BLUE}🚀 Starting Zen Pipeline Landing Page deployment...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}📝 Please edit .env file with your production values before running again.${NC}"
        exit 1
    else
        echo -e "${RED}❌ .env.example not found. Please create .env file manually.${NC}"
        exit 1
    fi
fi

# Development deployment
if [ "$COMMAND" = "dev" ]; then
    echo -e "${BLUE}🔨 Starting development deployment...${NC}"
    
    # Load environment variables for dev (optional)
    if [ -f .env ]; then
        source .env
    fi
    
    docker-compose down --remove-orphans
    
    if [ "$QUICK_MODE" = true ]; then
        echo -e "${YELLOW}⚡ Quick mode: using cache${NC}"
        docker-compose build
    else
        docker-compose build --no-cache
    fi
    
    docker-compose up -d
    
    echo -e "${GREEN}✅ Development deployment complete!${NC}"
    echo -e "${GREEN}🌐 Frontend: http://localhost${NC}"
    echo -e "${GREEN}🔧 Backend API: http://localhost:3001/api/health${NC}"
    echo -e "${GREEN}📊 Database: localhost:5433${NC}"

# Production deployment with Let's Encrypt
elif [ "$COMMAND" = "prod" ]; then
    source .env

    # Validate required environment variables
    if [ -z "$DOMAIN" ] || [ "$DOMAIN" = "your-domain.com" ]; then
        echo -e "${RED}❌ Please set DOMAIN in .env file${NC}"
        exit 1
    fi

    if [ -z "$LETSENCRYPT_EMAIL" ] || [ "$LETSENCRYPT_EMAIL" = "admin@your-domain.com" ]; then
        echo -e "${RED}❌ Please set LETSENCRYPT_EMAIL in .env file${NC}"
        exit 1
    fi

    echo -e "${BLUE}🔨 Starting production deployment with Let's Encrypt...${NC}"
    
    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down --remove-orphans
    
    # Build and start services
    if [ "$QUICK_MODE" = true ]; then
        echo -e "${YELLOW}⚡ Quick mode: using cache${NC}"
        docker-compose -f docker-compose.prod.yml build
    else
        docker-compose -f docker-compose.prod.yml build --no-cache
    fi
    
    docker-compose -f docker-compose.prod.yml up -d postgres backend frontend
    
    echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
    sleep 30
    
    # Get SSL certificate
    echo -e "${BLUE}🔒 Obtaining SSL certificate...${NC}"
    docker-compose -f docker-compose.prod.yml run --rm certbot
    
    # Restart frontend with SSL
    docker-compose -f docker-compose.prod.yml restart frontend
    
    echo -e "${GREEN}✅ Production deployment complete!${NC}"
    echo -e "${GREEN}🌐 Frontend: https://$DOMAIN${NC}"
    echo -e "${GREEN}🔧 Backend API: https://$DOMAIN/api/health${NC}"

# Production deployment with custom SSL
elif [ "$COMMAND" = "ssl" ]; then
    source .env

    # Validate required environment variables
    if [ -z "$DOMAIN" ] || [ "$DOMAIN" = "your-domain.com" ]; then
        echo -e "${RED}❌ Please set DOMAIN in .env file${NC}"
        exit 1
    fi

    # Check SSL files exist
    if [ ! -f "ssl/zen-pipeline.ru.key" ]; then
        echo -e "${RED}❌ SSL private key not found: ssl/zen-pipeline.ru.key${NC}"
        echo -e "${YELLOW}📋 Please follow instructions in ssl-setup-instructions.md${NC}"
        exit 1
    fi

    if [ ! -f "ssl/zen-pipeline.ru-fullchain.crt" ]; then
        echo -e "${RED}❌ SSL certificate not found: ssl/zen-pipeline.ru-fullchain.crt${NC}"
        echo -e "${YELLOW}📋 Please follow instructions in ssl-setup-instructions.md${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ SSL files found${NC}"
    echo -e "${BLUE}🔨 Starting production deployment with custom SSL...${NC}"

    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down --remove-orphans

    # Build and start services
    if [ "$QUICK_MODE" = true ]; then
        echo -e "${YELLOW}⚡ Quick mode: using cache${NC}"
        docker-compose -f docker-compose.prod.yml build
    else
        docker-compose -f docker-compose.prod.yml build --no-cache
    fi

    # Use custom SSL nginx config
    export NGINX_CONFIG="nginx.prod.conf"
    docker-compose -f docker-compose.prod.yml up -d

    echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
    sleep 15

    # Check if services are running
    if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        echo -e "${GREEN}✅ Production deployment complete!${NC}"
        echo -e "${GREEN}🌐 Frontend: https://$DOMAIN${NC}"
        echo -e "${GREEN}🔧 Backend API: https://$DOMAIN/api/health${NC}"
        
        # Test SSL certificate
        echo ""
        echo -e "${BLUE}🔒 Testing SSL certificate...${NC}"
        if command -v openssl &> /dev/null; then
            echo "Certificate details:"
            openssl x509 -in ssl/zen-pipeline.ru-fullchain.crt -text -noout | grep -E "(Subject:|Issuer:|Not Before:|Not After:)"
        else
            echo -e "${YELLOW}⚠️  OpenSSL not found. Cannot display certificate details.${NC}"
        fi
    else
        echo -e "${RED}❌ Some services failed to start. Check logs:${NC}"
        docker-compose -f docker-compose.prod.yml logs --tail=50
        exit 1
    fi
fi

# Show running containers
echo ""
echo -e "${BLUE}📋 Running containers:${NC}"
if [ "$COMMAND" = "dev" ]; then
    docker-compose ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    docker-compose -f docker-compose.prod.yml ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
fi

# Show helpful commands
echo ""
echo -e "${BLUE}📝 Useful commands:${NC}"
if [ "$COMMAND" = "dev" ]; then
    echo "  View logs: docker-compose logs -f [service-name]"
    echo "  Restart: docker-compose restart [service-name]"
    echo "  Stop: docker-compose down"
else
    echo "  View logs: docker-compose -f docker-compose.prod.yml logs -f [service-name]"
    echo "  Restart: docker-compose -f docker-compose.prod.yml restart [service-name]"
    echo "  Stop: docker-compose -f docker-compose.prod.yml down"
fi 