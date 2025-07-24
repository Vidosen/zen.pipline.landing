terraform {
  required_providers {
    yandex = {
      source  = "yandex-cloud/yandex"
      version = "~> 0.84.0"
    }
  }
  required_version = ">= 0.13"
}

provider "yandex" {
  token     = var.yc_token
  cloud_id  = var.yc_cloud_id
  folder_id = var.yc_folder_id
  zone      = var.yc_zone
}

# Network
resource "yandex_vpc_network" "landing_network" {
  name = "landing-network"
}

resource "yandex_vpc_subnet" "landing_subnet" {
  name           = "landing-subnet"
  zone           = var.yc_zone
  network_id     = yandex_vpc_network.landing_network.id
  v4_cidr_blocks = ["192.168.10.0/24"]
}

# Static IP Address
resource "yandex_vpc_address" "landing_static_ip" {
  name = "landing-static-ip"

  external_ipv4_address {
    zone_id = var.yc_zone
  }
}

# Security Group
resource "yandex_vpc_security_group" "landing_sg" {
  name        = "landing-security-group"
  description = "Security group for landing page VM"
  network_id  = yandex_vpc_network.landing_network.id

  ingress {
    protocol       = "TCP"
    description    = "Allow HTTP"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 80
  }

  ingress {
    protocol       = "TCP"
    description    = "Allow HTTPS"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 443
  }

  ingress {
    protocol       = "TCP"
    description    = "Allow SSH"
    v4_cidr_blocks = var.admin_ip_ranges
    port           = 22
  }

  egress {
    protocol       = "ANY"
    description    = "Allow all outgoing traffic"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
}

# Landing page VM
resource "yandex_compute_instance" "landing_vm" {
  name        = "landing-vm"
  platform_id = "standard-v1"
  zone        = var.yc_zone

  resources {
    cores  = 2
    memory = 4
  }

  boot_disk {
    initialize_params {
      image_id = var.ubuntu_image_id
      size     = 20
    }
  }

  network_interface {
    subnet_id          = yandex_vpc_subnet.landing_subnet.id
    nat                = true
    nat_ip_address     = yandex_vpc_address.landing_static_ip.external_ipv4_address[0].address
    security_group_ids = [yandex_vpc_security_group.landing_sg.id]
  }

  metadata = {
    ssh-keys = "${var.ssh_username}:${file(var.ssh_public_key_path)}"
  }

  connection {
    type        = "ssh"
    host        = yandex_vpc_address.landing_static_ip.external_ipv4_address[0].address
    user        = var.ssh_username
    private_key = file(var.ssh_private_key_path)
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y nginx certbot python3-certbot-nginx",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx",
    ]
  }
}

# Output the public IP address
output "landing_page_ip" {
  value = yandex_vpc_address.landing_static_ip.external_ipv4_address[0].address
} 