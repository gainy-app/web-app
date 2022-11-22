resource "aws_s3_bucket" "web" {
  bucket = "gainy-web-${var.env}"

  tags = {
    Environment = var.env
  }
}

resource "aws_s3_bucket_acl" "web_acl" {
  bucket = aws_s3_bucket.web.id
  acl    = "private"
}

locals {
  build_path = "${path.module}/build"
  mime_types = {
    "css"   = "text/css"
    "html"  = "text/html"
    "ico"   = "image/vnd.microsoft.icon"
    "js"    = "application/javascript"
    "json"  = "application/json"
    "map"   = "application/json"
    "png"   = "image/png"
    "svg"   = "image/svg+xml"
    "txt"   = "text/plain"
    "woff2" = "font/woff2"
  }
}

resource "aws_s3_object" "content" {
  for_each     = fileset(local.build_path, "**")
  bucket       = aws_s3_bucket.web.id
  key          = each.value
  source       = "${local.build_path}/${each.value}"
  etag         = filemd5("${local.build_path}/${each.value}")
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
}
