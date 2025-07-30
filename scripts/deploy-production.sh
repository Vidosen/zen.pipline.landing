#!/bin/bash

# Production Deployment Script for Zen Pipeline Landing Page
# This script is designed to be run on the production server via CI/CD
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/opt/zen-landing"
BACKUP_DIR="/opt/zen-landing-backups"
MAX_BACKUPS=5
HEALTH_CHECK_URL="http://localhost/api/health"
HEALTH_CHECK_TIMEOUT=60
HEALTH_CHECK_INTERVAL=5

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" >&2
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Validate environment variables
validate_env() {
    log "Validating environment variables..."
    
    if [ -z "$FRONTEND_IMAGE" ] || [ -z "$BACKEND_IMAGE" ]; then
        error "FRONTEND_IMAGE and BACKEND_IMAGE environment variables must be set"
        exit 1
    fi
    
    log "Frontend image: $FRONTEND_IMAGE"
    log "Backend image: $BACKEND_IMAGE"
}

# Create backup of current deployment
create_backup() {
    log "Creating backup of current deployment..."
    
    mkdir -p "$BACKUP_DIR"
    
    local backup_name="backup-$(date +%Y%m%d-%H%M%S)"
    local backup_path="$BACKUP_DIR/$backup_name"
    
    # Backup current docker-compose file
    if [ -f "$APP_DIR/docker-compose.prod.yml" ]; then
        mkdir -p "$backup_path"
        cp "$APP_DIR/docker-compose.prod.yml" "$backup_path/"
        
        # Save current image information
        docker-compose -f "$APP_DIR/docker-compose.prod.yml" config > "$backup_path/current-config.yml" 2>/dev/null || true
        
        echo "$backup_name" > "$BACKUP_DIR/latest-backup"
        success "Backup created: $backup_name"
    else
        warn "No existing docker-compose.prod.yml found to backup"
    fi
    
    # Cleanup old backups
    cd "$BACKUP_DIR"
    ls -1t | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm -rf
}

# Pull new Docker images
pull_images() {
    log "Pulling new Docker images..."
    
    docker pull "$FRONTEND_IMAGE" || {
        error "Failed to pull frontend image: $FRONTEND_IMAGE"
        exit 1
    }
    
    docker pull "$BACKEND_IMAGE" || {
        error "Failed to pull backend image: $BACKEND_IMAGE"
        exit 1
    }
    
    success "Images pulled successfully"
}

# Generate new docker-compose configuration
generate_compose_config() {
    log "Generating new docker-compose configuration..."
    
    cd "$APP_DIR"
    
    if [ ! -f "docker-compose.prod.template.yml" ]; then
        error "docker-compose.prod.template.yml not found in $APP_DIR"
        exit 1
    fi
    
    # Export image variables and generate config
    export FRONTEND_IMAGE="$FRONTEND_IMAGE"
    export BACKEND_IMAGE="$BACKEND_IMAGE"
    
    envsubst < docker-compose.prod.template.yml > docker-compose.prod.yml
    
    success "Docker-compose configuration generated"
}

# Deploy with zero-downtime strategy
deploy_services() {
    log "Starting zero-downtime deployment..."
    
    cd "$APP_DIR"
    
    # Start new containers alongside old ones
    docker-compose -f docker-compose.prod.yml up -d --no-deps --scale frontend=2 --scale backend=2 frontend backend
    
    # Wait for new containers to be ready
    log "Waiting for new containers to be ready..."
    sleep 15
    
    # Scale down old containers
    docker-compose -f docker-compose.prod.yml up -d --no-deps --scale frontend=1 --scale backend=1 frontend backend
    
    success "Services deployed"
}

# Health check with retry logic
health_check() {
    log "Performing health check..."
    
    local attempts=0
    local max_attempts=$((HEALTH_CHECK_TIMEOUT / HEALTH_CHECK_INTERVAL))
    
    while [ $attempts -lt $max_attempts ]; do
        if curl -f -s "$HEALTH_CHECK_URL" > /dev/null 2>&1; then
            success "Health check passed"
            return 0
        fi
        
        attempts=$((attempts + 1))
        log "Health check attempt $attempts/$max_attempts failed, retrying in ${HEALTH_CHECK_INTERVAL}s..."
        sleep $HEALTH_CHECK_INTERVAL
    done
    
    error "Health check failed after $max_attempts attempts"
    return 1
}

# Rollback to previous version
rollback() {
    error "Deployment failed, initiating rollback..."
    
    if [ ! -f "$BACKUP_DIR/latest-backup" ]; then
        error "No backup found for rollback"
        exit 1
    fi
    
    local backup_name=$(cat "$BACKUP_DIR/latest-backup")
    local backup_path="$BACKUP_DIR/$backup_name"
    
    if [ -f "$backup_path/docker-compose.prod.yml" ]; then
        log "Rolling back to backup: $backup_name"
        
        cp "$backup_path/docker-compose.prod.yml" "$APP_DIR/"
        cd "$APP_DIR"
        
        docker-compose -f docker-compose.prod.yml up -d --no-deps frontend backend
        
        # Wait and check health after rollback
        sleep 15
        if health_check; then
            success "Rollback completed successfully"
        else
            error "Rollback health check failed - manual intervention required"
            exit 1
        fi
    else
        error "Backup configuration not found"
        exit 1
    fi
}

# Cleanup old Docker images
cleanup_images() {
    log "Cleaning up old Docker images..."
    
    # Remove dangling images
    docker image prune -f
    
    # Remove old images (keep last 3 versions)
    docker images --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | \
        grep -E "(landing-frontend|landing-backend)" | \
        tail -n +4 | \
        awk '{print $1}' | \
        xargs -r docker rmi 2>/dev/null || true
    
    success "Image cleanup completed"
}

# Main deployment function
main() {
    log "Starting production deployment..."
    
    # Validate prerequisites
    validate_env
    
    # Ensure we're in the right directory
    cd "$APP_DIR" || {
        error "Failed to change to app directory: $APP_DIR"
        exit 1
    }
    
    # Create backup before deployment
    create_backup
    
    # Pull new images
    pull_images
    
    # Generate new configuration
    generate_compose_config
    
    # Deploy services
    deploy_services
    
    # Perform health check
    if health_check; then
        success "Deployment completed successfully"
        cleanup_images
        
        # Log deployment info
        log "Deployment details:"
        log "  Frontend: $FRONTEND_IMAGE"
        log "  Backend: $BACKEND_IMAGE"
        log "  Timestamp: $(date)"
        
        # Show running containers
        log "Running containers:"
        docker-compose -f docker-compose.prod.yml ps
        
    else
        error "Health check failed"
        rollback
        exit 1
    fi
}

# Handle script interruption
trap 'error "Deployment interrupted"; exit 1' INT TERM

# Run main function
main "$@" 