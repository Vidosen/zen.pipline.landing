# Landing Page Infrastructure

This directory contains all the infrastructure code and scripts required to deploy the ZEN.PIPELINE landing page on Yandex Cloud.

## Directory Structure

```
infra/
├── terraform/         # Terraform configuration for Yandex Cloud
│   ├── main.tf        # Main Terraform configuration
│   ├── variables.tf   # Terraform variables
│   └── terraform.tfvars.example  # Example variables file
├── scripts/           # Deployment and setup scripts
│   ├── setup_nginx.sh # Nginx configuration script
│   └── deploy.sh      # Manual deployment script
└── README.md          # This file
```

## Setup Instructions

### 1. Yandex Cloud Setup

1. Create a Yandex Cloud account if you don't have one
2. Create a service account with the necessary permissions
3. Generate an API token
4. Note your cloud ID and folder ID

### 2. Configure Terraform

1. Copy `terraform/terraform.tfvars.example` to `terraform/terraform.tfvars`
2. Fill in your Yandex Cloud credentials and other settings
3. Generate an SSH key pair if you don't have one:
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_yandex
   ```
4. Update the SSH key paths in terraform.tfvars

### 3. Provision Infrastructure

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

Note the static IP address from the output.

### 4. Configure DNS

Add an A record in your DNS settings:
```
yourdomain.com  A  <STATIC_IP_ADDRESS>
```

### 5. Configure Nginx and SSL

1. Edit `scripts/setup_nginx.sh` with your domain and email
2. SSH to your VM:
   ```bash
   ssh ubuntu@<STATIC_IP_ADDRESS>
   ```
3. Copy the script to the VM and run:
   ```bash
   chmod +x setup_nginx.sh
   ./setup_nginx.sh
   ```

### 6. Setup GitHub Actions for CI/CD

1. Store the following secrets in your GitHub repository:
   - `SSH_PRIVATE_KEY`: Your SSH private key
   - `SSH_KNOWN_HOSTS`: Output of `ssh-keyscan -H <STATIC_IP_ADDRESS>`
   - `DEPLOY_USER`: The SSH user (usually "ubuntu")
   - `DEPLOY_HOST`: Your server's IP address
   - `DEPLOY_PATH`: The path on the server (usually "/var/www/landing")

2. Push changes to the master branch and the GitHub Actions workflow will automatically build and deploy your landing page.

## Manual Deployment

If you need to deploy manually:

1. Edit `scripts/deploy.sh` with your server details
2. Make the script executable:
   ```bash
   chmod +x scripts/deploy.sh
   ```
3. Run the deployment script:
   ```bash
   ./scripts/deploy.sh
   ```

## Maintenance

### SSH Access to VM

```bash
ssh ubuntu@<STATIC_IP_ADDRESS>
```

### Checking Nginx Logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

### Renew SSL Certificate

SSL certificates from Let's Encrypt are automatically renewed. To manually renew:

```bash
sudo certbot renew
``` 