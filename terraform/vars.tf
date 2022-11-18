#################################### Application ####################################

variable "env" {
  type = string
}

#################################### AWS ####################################

variable "aws_region" {
  type    = string
  default = "us-east-1"
}
variable "aws_access_key" {
  sensitive = true
}
variable "aws_secret_key" {
  sensitive = true
}

#################################### Cloudflare ####################################

variable "cloudflare_email" {
  type = string
}
variable "cloudflare_api_key" {
  type      = string
  sensitive = true
}

variable "cloudflare_zone_id" {
  type      = string
  sensitive = true
}
