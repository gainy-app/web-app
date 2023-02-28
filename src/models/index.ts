import { ICitizenship } from './citizenship';

export interface formData {
  address_country: string
  country: {
    placeholder: string
    flag: string
    prevValue?: string
    choices?: any
  }
  citizenship: ICitizenship
  email_address: {
    placeholder?: string
    prevValue?: string
  }
  phone: string
  verifyCode: string
  first_name: {
    placeholder?: string
    prevValue?: string
  }
  last_name: {
    placeholder?: string
    prevValue?: string
  }
  birthday: string
  addressLine: string
  addressLine2: string
  city: string
  state: {
    choices: any
    prevValue: string
  }
  zipcode: string
  socialSecurityNumber: string
  tax_id_type: string
  employment_status: {
    choices?: any,
    prevValue: string
  },
  companyName: string
  employment_type: {
    prevValue: string
    choices?: any,
    name: string,
  }
  employment_position: {
    prevValue: string
    choices?: any,
    name: string,
  }
  source: string
  employment_affiliated_with_a_broker: boolean
  politically_exposed_names: string | null
  employment_is_director_of_a_public_company: string | null
  irs_backup_withholdings_notified: boolean
  investor_profile_annual_income: {
    value: number
    name: string
  }
  investor_profile_net_worth_total: {
    value: number
    name: string
  }
  investor_profile_net_worth_liquid: {
    value: number
    name: string
  }
  investor_profile_experience: {
    choices?: any
    prevValue: string
    name: string
  }
  investor_profile_objectives: {
    choices?: any
    prevValue: string
    name: string
  }
  investor_profile_risk_tolerance: {
    choices?: any
    prevValue: string
    name: string
  }
  disclosures_drivewealth_customer_agreement: null | boolean
  disclosures_drivewealth_terms_of_use: null | boolean
  disclosures_drivewealth_ira_agreement: null | boolean
  disclosures_drivewealth_market_data_agreement: null | boolean
  disclosures_drivewealth_privacy_policy: null | boolean
  disclosures_rule14b: null | boolean
  disclosures_signed_by: string
}

export interface IChoice {
  name: string,
  value: string
}

export type IChoices = Array<IChoice>;