variable "yc_token" {
  description = "Yandex Cloud API token"
  type        = string
  sensitive   = true
}

variable "yc_cloud_id" {
  description = "Yandex Cloud ID"
  type        = string
}

variable "yc_folder_id" {
  description = "Yandex Cloud folder ID"
  type        = string
}

variable "yc_zone" {
  description = "Yandex Cloud zone"
  type        = string
  default     = "ru-central1-a"
}

variable "ubuntu_image_id" {
  description = "Ubuntu 22.04 LTS image ID"
  type        = string
  default     = "fd8g64rcu9fq5kpfqls0" # Ubuntu 22.04 LTS (this ID may change, check Yandex Cloud)
}

variable "ssh_username" {
  description = "SSH username for provisioning"
  type        = string
  default     = "ubuntu"
}

variable "ssh_public_key_path" {
  description = "Path to SSH public key"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "ssh_private_key_path" {
  description = "Path to SSH private key"
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "admin_ip_ranges" {
  description = "List of IP addresses/ranges allowed to SSH to the VM"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # Warning: This allows SSH from anywhere, restrict in production
} 