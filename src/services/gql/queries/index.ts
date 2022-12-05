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