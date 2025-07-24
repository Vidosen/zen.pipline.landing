# Infrastructure Plan

## Hosting Environment
The landing page will be hosted on a Yandex Cloud Virtual Machine (VM) with the following specifications:

- **Instance Type**: Standard VM (2 vCPU, 4 GB RAM)
- **Operating System**: Ubuntu 22.04 LTS
- **Storage**: 20 GB SSD
- **Region**: ru-central1-a (Moscow)
- **Static IP**: Required for DNS configuration

## Network Configuration
- **Static IP**: A dedicated static IP address will be allocated from Yandex Cloud
- **DNS**: Domain will be configured to point to the static IP
- **SSL/TLS**: Let's Encrypt certificate for HTTPS
- **Firewall Rules**:
  - Allow HTTP (80) - Redirected to HTTPS
  - Allow HTTPS (443)
  - Allow SSH (22) - Restricted to specific IP ranges

## Deployment Architecture

```
                        +-------------+
                        |             |
                        |  DNS Server |
                        |             |
                        +------+------+
                               |
                               v
+---------------+      +-------+--------+      +--------------+
|               |      |                |      |              |
| Web Browsers  +----->+  Yandex Cloud  +----->+  Nginx Web   |
|               |      |  Static IP     |      |  Server      |
+---------------+      +----------------+      +-------+------+
                                                       |
                                                       v
                                               +-------+-------+
                                               |               |
                                               | React Static  |
                                               | Build Files   |
                                               |               |
                                               +---------------+
```

## Technology Stack

- **Web Server**: Nginx
- **Frontend**: React (static build)
- **SSL/TLS**: Let's Encrypt with Certbot
- **Monitoring**: Prometheus + Grafana (basic setup)
- **CI/CD**: GitHub Actions (for automated deployment)

## Deployment Process

1. **Initial VM Setup**:
   - Provision VM on Yandex Cloud
   - Allocate static IP
   - Install Ubuntu 22.04 LTS
   - Configure basic security (firewall, SSH keys)

2. **Web Server Configuration**:
   - Install Nginx
   - Configure virtual host
   - Set up SSL/TLS with Let's Encrypt

3. **Application Deployment**:
   - Create deployment user
   - Set up application directory structure
   - Configure CI/CD pipeline

4. **Monitoring Setup**:
   - Install Prometheus and Grafana
   - Configure basic monitoring for server health
   - Set up alerts for downtime

## Continuous Integration/Deployment

We'll use GitHub Actions for CI/CD with the following workflow:

1. Developer pushes to `master` branch
2. GitHub Actions builds the React application
3. Build artifacts are deployed to Yandex VM via SSH
4. Nginx serves the updated static files

## Backup and Recovery

- **Daily Backups**: VM snapshots stored in Yandex Object Storage
- **Configuration Backups**: Infrastructure-as-Code using Terraform
- **Recovery Time Objective (RTO)**: < 1 hour
- **Recovery Point Objective (RPO)**: 24 hours

## Scaling Plan

While the initial landing page deployment is simple, we'll prepare for growth:

1. **Short-term**: Vertical scaling (increase VM resources if needed)
2. **Mid-term**: 
   - Move to containerized deployment with Docker
   - Add CDN for static assets

3. **Long-term**: 
   - Transition to full cloud-native application architecture
   - Replace landing page with full web application

## Cost Estimate

| Resource                | Monthly Cost (RUB) |
|------------------------|-------------------|
| VM Instance (2 vCPU)   | ~2,000           |
| Static IP              | ~300             |
| Storage (20GB)         | ~150             |
| Data Transfer (est.)   | ~500             |
| **Total (estimated)**  | **~2,950 RUB**   |

## Future Infrastructure Evolution

As we transition from landing page to full application:

1. **Phase 1**: Single VM hosting static landing page
2. **Phase 2**: Add backend API services for form handling
3. **Phase 3**: Full application infrastructure with database, caching, etc.
4. **Phase 4**: Integration with the main ZEN.PIPELINE backend services 