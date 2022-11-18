resource "aws_acm_certificate" "web" {
  domain_name       = local.domain_name
  validation_method = "DNS"

  tags = {
    Environment = var.env
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_record" "validation" {
  proxied = false
  zone_id = var.cloudflare_zone_id

  for_each = {
    for dvo in aws_acm_certificate.web.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      value = dvo.resource_record_value
      type  = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  value           = each.value.value
  ttl             = 60
  type            = each.value.type

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_acm_certificate_validation" "web" {
  certificate_arn         = aws_acm_certificate.web.arn
  validation_record_fqdns = [for record in cloudflare_record.validation : record.hostname]
}
