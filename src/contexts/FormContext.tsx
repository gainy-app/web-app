import React, { useContext, useEffect, useState } from 'react';
import { useMultistepForm } from '../hooks';
import {
  CitizenForm,
  CitizenshipForm, CompanyForm, CustomerAgreementForm,
  EmailAddressForm, EmploymentForm, InvestmentProfileForm, LegalNameForm, LetUsKnowForm,
  PhoneNumberForm,
  PrivacyPolicyForm, ResidentAddressForm, SocialSecurityForm,
  VerifyPhoneNumberForm
} from 'components';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_COUNTRIES,
  GET_FORM_CONFIG, GET_KYC_FORM,
  SEND_KYC_FORM, TRADING_GET_PROFILE_STATUS,
  VERIFICATION_SEND_CODE,
  VERIFICATION_VERIFY_CODE
} from 'services/gql/queries';
import { useAuth } from './AuthContext';
import { refreshToken } from '../services/auth';
import { formData } from '../models';
import { sendGoogleDataLayerEvent } from 'utils/logEvent';

const FormContext = React.createContext<any>({});

export function useFormContext() {
  return useContext(FormContext);
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function FormProvider ({ children }: Props) {
  const { appId, currentUser, appIdLoading, isTreadingEnabled } = useAuth();
  const { data: kycFormConfig, loading: kycFormConfigLoader } = useQuery(GET_FORM_CONFIG, {
    variables: {
      profile_id: appId
    },
    skip: !appId
  });
  const { data: countries } = useQuery(GET_COUNTRIES);

  const { data: form, loading: formLoading } = useQuery(GET_KYC_FORM, {
    variables: {
      profile_id:  appId
    },
    skip: !appId
  });

  const { data: formStatus, loading: formStatusLoading } = useQuery(TRADING_GET_PROFILE_STATUS, {
    variables: {
      profile_id: appId
    },
    skip: !appId
  });

  const [verifyCode
    , { loading: verifyLoading, data:verifyNumber, error: verifyError }
  ] = useMutation(VERIFICATION_SEND_CODE, {
    onError: () => sendGoogleDataLayerEvent('click_button_after_input_not_target_phone', currentUser?.uid),
    onCompleted: () => sendGoogleDataLayerEvent('click_button_after_input_target_phone', currentUser?.uid || 'not authorized')
  });

  const [verificationCode,
    { loading: verificationCodeLoading,error: verificationCodeError,data: verificationCodeData }
  ] = useMutation(VERIFICATION_VERIFY_CODE);

  const [sendKycForm, { error: sendKycFormError }] = useMutation(SEND_KYC_FORM);

  const INITIAL_DATA = {
    address_country: '',
    citizenship: {
      placeholder: '',
      prevValue: {
        name: '',
        value: ''
      },
      choices: []
    },
    country: {
      placeholder: '',
      flag: '',
      prevValue: '',
      choices: []
    },
    email_address: {
      placeholder: ''
    },
    phone: '',
    verifyCode: '',
    first_name: {
      placeholder:  '',
      prevValue: ''
    },
    last_name: {
      placeholder:  '',
      prevValue: ''
    },
    birthday: '11.11.1111',
    addressLine: '',
    addressLine2: '',
    city: '',
    state: {
      choices: [],
      prevValue: ''
    },
    zipcode: '',
    socialSecurityNumber: '',
    tax_id_type: 'SSN',
    employment_status: {
      choices: [],
      prevValue: ''
    },
    companyName: '',
    employment_type: {
      prevValue: '',
      choices: [],
      name: '',
    },
    employment_position: {
      prevValue: '',
      choices: [],
      name: '',
    },
    source: '',
    employment_affiliated_with_a_broker: false,
    politically_exposed_names: null,
    employment_is_director_of_a_public_company: null,
    irs_backup_withholdings_notified: false,
    investor_profile_annual_income: {
      value: 25000,
      name: ''
    },
    investor_profile_net_worth_total: {
      value: 50000,
      name: ''
    },
    investor_profile_net_worth_liquid: {
      value: 50000,
      name: ''
    },
    investor_profile_experience: {
      prevValue: '',
      choices: [],
      name: '',
    },
    investor_profile_objectives: {
      prevValue: '',
      choices: [],
      name: '',
    },
    investor_profile_risk_tolerance: {
      prevValue: '',
      choices: [],
      name: '',
    },
    disclosures_drivewealth_customer_agreement: null,
    disclosures_drivewealth_terms_of_use: null,
    disclosures_drivewealth_ira_agreement: null,
    disclosures_drivewealth_market_data_agreement: null,
    disclosures_drivewealth_privacy_policy: null,
    disclosures_rule14b: null,
    disclosures_signed_by: ''
  };

  const [data, setData] = useState<formData>(INITIAL_DATA);

  useEffect(() => {
    setData({ ...data,
      country: {
        placeholder: kycFormConfig?.kyc_get_form_config?.country?.placeholder,
        flag: countries?.countries?.find((i: any) => i?.alpha2 === 'US')?.flag_w40_url,
        prevValue: form?.app_kyc_form_by_pk?.country,
        choices: kycFormConfig?.kyc_get_form_config?.country?.choices
      },
      citizenship: {
        placeholder: kycFormConfig?.kyc_get_form_config?.citizenship?.placeholder,
        prevValue: {
          name: kycFormConfig?.kyc_get_form_config?.citizenship?.choices.find((i: {name:string, value:string}) =>
            i?.value === form?.app_kyc_form_by_pk?.citizenship)?.name,
          value: form?.app_kyc_form_by_pk?.citizenship
        },
        choices:  kycFormConfig?.kyc_get_form_config?.citizenship?.choices
      },
      email_address: {
        placeholder: kycFormConfig?.kyc_get_form_config?.email_address?.placeholder,
        prevValue: form?.app_kyc_form_by_pk?.email_address
      },
      phone: form?.app_kyc_form_by_pk?.phone_number.slice(2) ? form?.app_kyc_form_by_pk?.phone_number.slice(2) : data.phone,
      first_name: {
        placeholder:  kycFormConfig?.kyc_get_form_config?.first_name?.placeholder,
        prevValue: form?.app_kyc_form_by_pk?.first_name
      },
      last_name: {
        placeholder: kycFormConfig?.kyc_get_form_config?.last_name?.placeholder,
        prevValue: form?.app_kyc_form_by_pk?.last_name
      },
      birthday: form?.app_kyc_form_by_pk?.birthdate,
      addressLine: form?.app_kyc_form_by_pk?.address_street1,
      addressLine2: form?.app_kyc_form_by_pk?.address_street2,
      state: {
        choices: kycFormConfig?.kyc_get_form_config?.address_province?.choices,
        prevValue:form?.app_kyc_form_by_pk?.address_province
      },
      zipcode: form?.app_kyc_form_by_pk?.address_postal_code,
      city: form?.app_kyc_form_by_pk?.address_city,
      socialSecurityNumber: form?.app_kyc_form_by_pk?.tax_id_value,
      employment_status: {
        choices: kycFormConfig?.kyc_get_form_config?.employment_status?.choices,
        prevValue: form?.app_kyc_form_by_pk?.employment_status
      },
      companyName: form?.app_kyc_form_by_pk?.employment_company_name,
      employment_position: {
        choices: kycFormConfig?.kyc_get_form_config?.employment_position?.choices,
        prevValue: form?.app_kyc_form_by_pk?.employment_position,
        name:  kycFormConfig?.kyc_get_form_config?.employment_position?.choices.find((i: {name:string, value:string}) =>
          i?.value === form?.app_kyc_form_by_pk?.employment_position)?.name,
      },
      employment_type: {
        choices: kycFormConfig?.kyc_get_form_config?.employment_type?.choices,
        prevValue: form?.app_kyc_form_by_pk?.employment_type,
        name:  kycFormConfig?.kyc_get_form_config?.employment_type?.choices?.find((i: {name:string, value:string}) =>
          i?.value === form?.app_kyc_form_by_pk?.employment_type)?.name,
      },
      employment_affiliated_with_a_broker: form?.app_kyc_form_by_pk?.employment_affiliated_with_a_broker,
      irs_backup_withholdings_notified: form?.app_kyc_form_by_pk?.employment_affiliated_with_a_broker,
      politically_exposed_names: form?.app_kyc_form_by_pk?.politically_exposed_names,
      employment_is_director_of_a_public_company: form?.app_kyc_form_by_pk?.employment_is_director_of_a_public_company,
      investor_profile_annual_income: {
        name: '',
        value: form?.app_kyc_form_by_pk?.investor_profile_annual_income
      },
      investor_profile_net_worth_total: {
        name: '',
        value: form?.app_kyc_form_by_pk?.investor_profile_net_worth_total
      } ,
      investor_profile_net_worth_liquid: {
        name: '',
        value: form?.app_kyc_form_by_pk?.investor_profile_net_worth_liquid
      } ,
      investor_profile_experience: {
        choices: kycFormConfig?.kyc_get_form_config?.investor_profile_experience?.choices,
        prevValue: form?.app_kyc_form_by_pk?.investor_profile_experience,
        name:  kycFormConfig?.kyc_get_form_config?.investor_profile_experience?.choices?.find((i: {name:string, value:string}) =>
          i?.value === form?.app_kyc_form_by_pk?.investor_profile_experience)?.name,
      },
      investor_profile_objectives: {
        choices: kycFormConfig?.kyc_get_form_config?.investor_profile_objectives?.choices,
        prevValue: form?.app_kyc_form_by_pk?.investor_profile_objectives,
        name:  kycFormConfig?.kyc_get_form_config?.investor_profile_objectives?.choices?.find((i: {name:string, value:string}) =>
          i?.value === form?.app_kyc_form_by_pk?.investor_profile_objectives)?.name,
      },
      investor_profile_risk_tolerance: {
        choices: kycFormConfig?.kyc_get_form_config?.investor_profile_risk_tolerance?.choices,
        prevValue: form?.app_kyc_form_by_pk?.investor_profile_risk_tolerance,
        name:  kycFormConfig?.kyc_get_form_config?.investor_profile_risk_tolerance?.choices?.find((i: {name:string, value:string}) =>
          i?.value === form?.app_kyc_form_by_pk?.investor_profile_risk_tolerance)?.name,
      },
      disclosures_drivewealth_customer_agreement: form?.app_kyc_form_by_pk?.disclosures_drivewealth_customer_agreement,
      disclosures_drivewealth_terms_of_use: form?.app_kyc_form_by_pk?.disclosures_drivewealth_terms_of_use,
      disclosures_drivewealth_ira_agreement: form?.app_kyc_form_by_pk?.disclosures_drivewealth_ira_agreement,
      disclosures_drivewealth_market_data_agreement: form?.app_kyc_form_by_pk?.disclosures_drivewealth_market_data_agreement,
      disclosures_drivewealth_privacy_policy: form?.app_kyc_form_by_pk?.disclosures_drivewealth_privacy_policy,
      disclosures_rule14b: form?.app_kyc_form_by_pk?.disclosures_rule14b,
      disclosures_signed_by: form?.app_kyc_form_by_pk?.disclosures_signed_by
    });
  }, [kycFormConfig]);

  const updateFields = (fields: Partial<formData>) => {
    setData(prev => {
      return { ...prev, ...fields };
    });
  };

  const onSendData = () => {
    if(sendKycFormError?.message === 'Could not verify JWT: JWTExpired') {
      refreshToken(currentUser).then(res => {
        localStorage.setItem('token',res);
      });
    }
    sendKycForm({
      variables: {
        profile_id:  appId,
        country: data.country.prevValue ? data.country.prevValue : data.country.placeholder,
        citizenship: data.citizenship.prevValue?.value ? data.citizenship.prevValue?.value : data.citizenship.placeholder,
        email_address: data.email_address.prevValue ? data.email_address.prevValue :  data.email_address.placeholder,
        phone_number: `+1${String(data.phone)}`,
        last_name:  data.last_name.prevValue ? data.last_name.prevValue : data.last_name.placeholder,
        birthdate: data.birthday,
        first_name: data.first_name.prevValue ? data.first_name.prevValue : data.first_name.placeholder,
        address_street1: data.addressLine,
        address_street2: data.addressLine2,
        address_province: data.state.prevValue,
        address_postal_code: data.zipcode,
        address_city: data.city,
        address_country: data.country.prevValue ? data.country.prevValue : data.country.placeholder,
        tax_id_value: data.socialSecurityNumber,
        tax_id_type: data.tax_id_type,
        employment_status: data.employment_status.prevValue,
        employment_company_name: data.employment_status.prevValue === 'EMPLOYED' || data?.employment_status?.prevValue === 'SELF_EMPLOYED' ? data.companyName : null,
        employment_position: data.employment_status.prevValue === 'EMPLOYED' || data?.employment_status?.prevValue === 'SELF_EMPLOYED' ?  data.employment_position.prevValue : null,
        employment_type: data.employment_status.prevValue === 'EMPLOYED' || data?.employment_status?.prevValue === 'SELF_EMPLOYED' ? data.employment_type.prevValue : null,
        employment_affiliated_with_a_broker: data.employment_affiliated_with_a_broker,
        politically_exposed_names: data.politically_exposed_names,
        employment_is_director_of_a_public_company: data.employment_is_director_of_a_public_company,
        irs_backup_withholdings_notified: data.irs_backup_withholdings_notified,
        investor_profile_annual_income: data.investor_profile_annual_income.value,
        investor_profile_net_worth_total: data.investor_profile_net_worth_total.value,
        investor_profile_net_worth_liquid: data.investor_profile_net_worth_liquid.value,
        investor_profile_experience: data.investor_profile_experience.prevValue,
        investor_profile_objectives: data.investor_profile_objectives.prevValue,
        investor_profile_risk_tolerance: data.investor_profile_risk_tolerance.prevValue,
        disclosures_drivewealth_customer_agreement: true,
        disclosures_drivewealth_terms_of_use: true,
        disclosures_drivewealth_ira_agreement: true,
        disclosures_drivewealth_market_data_agreement: true,
        disclosures_drivewealth_privacy_policy: true,
        disclosures_rule14b: true,
        disclosures_signed_by: data.last_name.prevValue ? data.last_name.prevValue : data.last_name.placeholder
      },
    });
  };
  const createAccountEdit = (!!data.country?.prevValue || !!data.phone) && localStorage.getItem('createAccountEdit') === 'true';
  const verifyIdentityEdit = !!data.addressLine && localStorage.getItem('verifyIdentityEdit') === 'true';
  const investProfileEdit = !!data.investor_profile_annual_income.value  && localStorage.getItem('investProfileEdit') === 'true';
  const {
    step, back,
    next, isLastPage, currentStepIndex, goToStep
  } = useMultistepForm({
    steps: [
      null,
      <CitizenForm {...data} updateFields={updateFields}/>,
      <PrivacyPolicyForm />,
      <CitizenshipForm {...data} updateFields={updateFields}/>,
      <EmailAddressForm {...data} updateFields={updateFields}/>,
      <PhoneNumberForm {...data} updateFields={updateFields}/>,
      <VerifyPhoneNumberForm {...data} updateFields={updateFields}/>,
      null,
      <LegalNameForm {...data} updateFields={updateFields}/>,
      <ResidentAddressForm {...data} updateFields={updateFields}/>,
      <SocialSecurityForm {...data} updateFields={updateFields}/>,
      null,
      <EmploymentForm {...data} updateFields={updateFields}/>,
      data?.employment_status?.prevValue === 'EMPLOYED' || data?.employment_status?.prevValue === 'SELF_EMPLOYED' ? [<CompanyForm {...data} updateFields={updateFields}/>,  <LetUsKnowForm {...data} updateFields={updateFields}/>]: <LetUsKnowForm {...data} updateFields={updateFields}/>,
      <InvestmentProfileForm {...data} updateFields={updateFields}/>,
      <CustomerAgreementForm/>,
      null
    ].flat(),
    createAccountEdit,
    verifyIdentityEdit,
    investProfileEdit
  });

  const value = {
    step,
    back,
    next,
    isLastPage,
    currentStepIndex,
    goToStep,
    data,
    flags: countries,
    verifyCodeRequest: {
      verifyCode,
      loading: verifyLoading,
      data: verifyNumber,
      error: verifyError
    },
    verificationCodeRequest: {
      verificationCode,
      loading: verificationCodeLoading,
      data: verificationCodeData,
      error: verificationCodeError
    },
    onSendData,
    appId,
    updateFields,
    formStatus,
    isTreadingEnabled,
    loader: formLoading || kycFormConfigLoader || appIdLoading || formStatusLoading,
    createAccountEdit,
    verifyIdentityEdit,
    investProfileEdit,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}