import { gql } from '@apollo/client';

export const SEND_APP_LINK = gql`
    mutation SendAppLink($phone_number: String!) {
      send_app_link(
        phone_number: $phone_number
      ){
        ok
      }
}
`;

export const CREATE_APP_LINK = gql`
  mutation CreateAppProfile($email: String!, $firstName: String!, $lastName: String!, $userID: String!){
    insert_app_profiles(objects: {
      email: $email, 
      first_name: $firstName, 
      last_name: $lastName,
      user_id: $userID,
    }) {
      returning {
        id
      }
    }
  }
`;

export const GET_APP_PROFILE = gql`
   query GetAppProfile {
     app_profiles {
       id
     }
}
`;

export const GET_COUNTRIES =  gql`
   query getCounties {
      countries {
      name
      alpha2
      alpha3
      flag_w40_url
  }
}
`;

export const VERIFICATION_VERIFY_CODE = gql`
mutation VerificationVerifyCode($verification_code_id: String!, $user_input: String!) {
  verification_verify_code(
    verification_code_id: $verification_code_id
    user_input: $user_input
  ){
    ok
  }
}
`;

export const VERIFICATION_SEND_CODE = gql`
mutation VerificationSendCode($profile_id: Int!, $channel: String!, $address: String!) {
  verification_send_code(
    profile_id: $profile_id
    channel: $channel
    address: $address
  ){
    verification_code_id
  }
}
`;

export const SEND_KYC_FORM = gql`
mutation UpsertKycForm (
  $address_city: String
  $address_country: String
  $address_postal_code: String
  $address_province: String
  $address_street1: String
  $address_street2: String
  $birthdate: date
  $citizenship: String
  $country: String
  $disclosures_drivewealth_customer_agreement: Boolean
  $disclosures_drivewealth_data_sharing: Boolean
  $disclosures_drivewealth_ira_agreement: Boolean
  $disclosures_drivewealth_market_data_agreement: Boolean
  $disclosures_drivewealth_privacy_policy: Boolean
  $disclosures_drivewealth_terms_of_use: Boolean
  $disclosures_extended_hours_agreement: Boolean
  $disclosures_rule14b: Boolean
  $disclosures_signed_by: String
  $email_address: String
  $employment_affiliated_with_a_broker: Boolean
  $employment_company_name: String
  $employment_is_director_of_a_public_company: String
  $employment_position: String
  $employment_status: String
  $employment_type: String
  $first_name: String
  $gender: String
  $investor_profile_annual_income: bigint
  $investor_profile_experience: String
  $investor_profile_net_worth_liquid: bigint
  $investor_profile_net_worth_total: bigint
  $investor_profile_objectives: String
  $investor_profile_risk_tolerance: String
  $tax_treaty_with_us: Boolean
  $tax_id_value: String
  $tax_id_type: String
  $profile_id: Int!
  $politically_exposed_names: String
  $phone_number: String
  $marital_status: String
  $last_name: String
  $language: String
  $is_us_tax_payer: Boolean
  $irs_backup_withholdings_notified: Boolean
){
  insert_app_kyc_form(on_conflict: {
    constraint: kyc_form_pkey, 
    update_columns: [
      address_city
      address_country
      address_postal_code
      address_province
      address_street1
      address_street2
      birthdate
      citizenship
      country
      disclosures_drivewealth_customer_agreement
      disclosures_drivewealth_data_sharing
      disclosures_drivewealth_ira_agreement
      disclosures_drivewealth_market_data_agreement
      disclosures_drivewealth_privacy_policy
      disclosures_drivewealth_terms_of_use
      disclosures_extended_hours_agreement
      disclosures_rule14b
      disclosures_signed_by
      email_address
      employment_affiliated_with_a_broker
      employment_company_name
      employment_is_director_of_a_public_company
      employment_position
      employment_status
      employment_type
      first_name
      gender
      investor_profile_annual_income
      investor_profile_experience
      investor_profile_net_worth_liquid
      investor_profile_net_worth_total
      investor_profile_objectives
      investor_profile_risk_tolerance
      tax_treaty_with_us
      tax_id_value
      tax_id_type
      profile_id
      politically_exposed_names
      phone_number
      marital_status
      last_name
      language
      is_us_tax_payer
      irs_backup_withholdings_notified
    ]
  }, objects: [
    {
      address_city: $address_city
      address_country: $address_country
      address_postal_code: $address_postal_code
      address_province: $address_province
      address_street1: $address_street1
      address_street2: $address_street2
      birthdate: $birthdate
      citizenship: $citizenship
      country: $country
      disclosures_drivewealth_customer_agreement: $disclosures_drivewealth_customer_agreement
      disclosures_drivewealth_data_sharing: $disclosures_drivewealth_data_sharing
      disclosures_drivewealth_ira_agreement: $disclosures_drivewealth_ira_agreement
      disclosures_drivewealth_market_data_agreement: $disclosures_drivewealth_market_data_agreement
      disclosures_drivewealth_privacy_policy: $disclosures_drivewealth_privacy_policy
      disclosures_drivewealth_terms_of_use: $disclosures_drivewealth_terms_of_use
      disclosures_extended_hours_agreement: $disclosures_extended_hours_agreement
      disclosures_rule14b: $disclosures_rule14b
      disclosures_signed_by: $disclosures_signed_by
      email_address: $email_address
      employment_affiliated_with_a_broker: $employment_affiliated_with_a_broker
      employment_company_name: $employment_company_name
      employment_is_director_of_a_public_company: $employment_is_director_of_a_public_company
      employment_position: $employment_position
      employment_status: $employment_status
      employment_type: $employment_type
      first_name: $first_name
      gender: $gender
      investor_profile_annual_income: $investor_profile_annual_income
      investor_profile_experience: $investor_profile_experience
      investor_profile_net_worth_liquid: $investor_profile_net_worth_liquid
      investor_profile_net_worth_total: $investor_profile_net_worth_total
      investor_profile_objectives: $investor_profile_objectives
      investor_profile_risk_tolerance: $investor_profile_risk_tolerance
      tax_treaty_with_us: $tax_treaty_with_us
      tax_id_value: $tax_id_value
      tax_id_type: $tax_id_type
      profile_id: $profile_id
      politically_exposed_names: $politically_exposed_names
      phone_number: $phone_number
      marital_status: $marital_status
      last_name: $last_name
      language: $language
      is_us_tax_payer: $is_us_tax_payer
      irs_backup_withholdings_notified: $irs_backup_withholdings_notified
    }
  ]) {
    returning {
      address_city
      address_country
      address_postal_code
      address_province
      address_street1
      address_street2
      birthdate
      citizenship
      country
      disclosures_drivewealth_customer_agreement
      disclosures_drivewealth_data_sharing
      disclosures_drivewealth_ira_agreement
      disclosures_drivewealth_market_data_agreement
      disclosures_drivewealth_privacy_policy
      disclosures_drivewealth_terms_of_use
      disclosures_extended_hours_agreement
      disclosures_rule14b
      disclosures_signed_by
      email_address
      employment_affiliated_with_a_broker
      employment_company_name
      employment_is_director_of_a_public_company
      employment_position
      employment_status
      employment_type
      first_name
      gender
      investor_profile_annual_income
      investor_profile_experience
      investor_profile_net_worth_liquid
      investor_profile_net_worth_total
      investor_profile_objectives
      investor_profile_risk_tolerance
      tax_treaty_with_us
      tax_id_value
      tax_id_type
      profile_id
      politically_exposed_names
      phone_number
      marital_status
      last_name
      language
      is_us_tax_payer
      irs_backup_withholdings_notified
    }
  }
}`;

export const GET_FORM_CONFIG = gql`
query KycGetFormConfig($profile_id: Int!) {
  kyc_get_form_config(profile_id: $profile_id) {
    first_name {
      choices {
        value
        name
      }
      placeholder
      required
    }
    last_name {
      choices {
        value
        name
      }
      placeholder
      required
    }
    country {
      choices {
        value
        name
      }
      placeholder
      required
    }
    email_address {
      choices {
        value
        name
      }
      placeholder
      required
    }
    language {
      choices {
        value
        name
      }
      placeholder
      required
    }
    employment_status {
      choices {
        value
        name
      }
      placeholder
      required
    }
    employment_type {
      choices {
        value
        name
      }
      placeholder
      required
    }
    employment_position {
      choices {
        value
        name
      }
      placeholder
      required
    }
    investor_profile_experience {
      choices {
        value
        name
      }
      placeholder
      required
    }
    investor_profile_risk_tolerance {
      choices {
        value
        name
      }
      placeholder
      required
    }
    investor_profile_objectives {
      choices {
        value
        name
      }
      placeholder
      required
    }
    investor_profile_annual_income {
      choices {
        value
        name
      }
      placeholder
      required
    }
    investor_profile_net_worth_total {
      choices {
        value
        name
      }
      placeholder
      required
    }
    investor_profile_net_worth_liquid {
      choices {
        value
        name
      }
      placeholder
      required
    }
    disclosures_drivewealth_terms_of_use {
      choices {
        value
        name
      }
      placeholder
      required
    }
    disclosures_drivewealth_customer_agreement {
      choices {
        value
        name
      }
      placeholder
      required
    }
    disclosures_drivewealth_market_data_agreement {
      choices {
        value
        name
      }
      placeholder
      required
    }
    disclosures_rule14b {
      choices {
        value
        name
      }
      placeholder
      required
    }
    disclosures_drivewealth_privacy_policy {
      choices {
        value
        name
      }
      placeholder
      required
    }
    disclosures_signed_by {
      choices {
        value
        name
      }
      placeholder
      required
    }
    tax_id_value {
      choices {
        value
        name
      }
      placeholder
      required
    }
    tax_id_type {
      choices {
        value
        name
      }
      placeholder
      required
    }
    citizenship {
      choices {
        value
        name
      }
      placeholder
      required
    }
    gender {
      choices {
        value
        name
      }
      placeholder
      required
    }
    marital_status {
      choices {
        value
        name
      }
      placeholder
      required
    }
    birthdate {
      choices {
        value
        name
      }
      placeholder
      required
    }
    address_street1 {
      choices {
        value
        name
      }
      placeholder
      required
    }
    address_city {
      choices {
        value
        name
      }
      placeholder
      required
    }
    address_postal_code {
      choices {
        value
        name
      }
      placeholder
      required
    }
    address_country {
      choices {
        value
        name
      }
      placeholder
      required
    }
  }
}
`;