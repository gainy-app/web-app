# Terraforming the Gainy App

Terraform is run from the Github workflows. 

To deploy the service follow these steps:
1. Setup up environment variables. Refer to the [workflow config](.github/workflows/terraform.yml) for the full list of needed variables. 
2. `terraform login # log in to Terraform Cloud`
3. `terraform plan # run to see the changes in terraform` 
4. `terraform apply # apply the changes infra changes` 

### New environments
1. Separate environments are configured via different backend configs:
```
terraform init -backend-config=backend-production.hcl -reconfigure
```
2. Now head to terraform cloud and change execution mode from remote to local.
