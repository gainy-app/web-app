import React, { useContext, useEffect, useState } from 'react';
import { useMultistepForm } from '../hooks';
import {
  CitizenForm,
  CitizenshipForm, CompanyForm, CustomerAgreementForm,
  EmailAddressForm, EmploymentForm, InvestmentProfileForm, LegalNameForm, LetUsKnowForm,
  PhoneNumberForm,
  PrivacyPolicyForm, ResidentAddressForm, SocialSecurityForm, SourceForm,
  VerifyPhoneNumberForm
} from 'components';
import { useAuth } from './AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_COUNTRIES,
  GET_FORM_CONFIG, GET_KYC_FORM,
  SEND_KYC_FORM,
  VERIFICATION_SEND_CODE,
  VERIFICATION_VERIFY_CODE
} from 'services/gql/queries';

interface formData {
  address_country: string
  country: {
    placeholder: string
    flag: string
    prevValue?: string
    choices?: any
  }
  citizenship: {
    placeholder?: string
    prevValue?: string
    choices?: any
  }
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
  state: string
  zipcode: string
  socialSecurityNumber: string
  tax_id_type: string
  tag: string
  companyName: string
  industry: string
  jobTitle: string
  source: string
  broker: boolean
  person: string
  tradedCompany: string
  notify: boolean
  anualIncome: string
  networthTotal: string
  networthLiqued: string
  exp: string
  objectives: string
  risk: string
}

const FormContext = React.createContext<any>({});

export function useFormContext() {
  return useContext(FormContext);
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function FormProvider ({ children }: Props) {
  const { appId } = useAuth();

  const { data: kycFormConfig, loading: kycFormConfigLoader } = useQuery(GET_FORM_CONFIG, {
    variables: {
      profile_id: appId?.app_profiles[0].id
    }
  });
  const { data: countries } = useQuery(GET_COUNTRIES);

  const { data: form, loading: formLoading } = useQuery(GET_KYC_FORM, {
    variables: {
      profile_id: appId?.app_profiles[0].id
    }
  });

  const [verifyCode
    , { loading: verifyLoading, data:verifyNumber, error: verifyError }
  ] = useMutation(VERIFICATION_SEND_CODE);

  const [verificationCode,
    { loading: verificationCodeLoading,error: verificationCodeError,data: verificationCodeData }
  ] = useMutation(VERIFICATION_VERIFY_CODE);

  const [sendKycForm, { loading: sendKycFormLoading,data: sendKycFormData,error: sendKycFormError }] = useMutation(SEND_KYC_FORM);

  const INITIAL_DATA = {
    address_country: '',
    citizenship: {
      placeholder: '',
      prevValue: '',
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
    state: '',
    zipcode: '',
    socialSecurityNumber: '',
    tax_id_type: 'SSN',
    tag: '',
    companyName: '',
    industry: '',
    jobTitle: '',
    source: '',
    broker: false,
    person: '',
    tradedCompany: '',
    notify: false,
    anualIncome: '',
    networthTotal: '',
    networthLiqued: '',
    exp: '',
    objectives: '',
    risk: '',
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
        prevValue: form?.app_kyc_form_by_pk?.citizenship,
        choices:  kycFormConfig?.kyc_get_form_config?.citizenship?.choices
      },
      email_address: {
        placeholder: kycFormConfig?.kyc_get_form_config?.email_address?.placeholder,
        prevValue: form?.app_kyc_form_by_pk?.email_address
      },
      phone: form?.app_kyc_form_by_pk?.phone_number,
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
      state: form?.app_kyc_form_by_pk?.address_province,
      zipcode: form?.app_kyc_form_by_pk?.address_postal_code,
      city: form?.app_kyc_form_by_pk?.address_city,
      socialSecurityNumber: form?.app_kyc_form_by_pk?.tax_id_value
    });
  }, [kycFormConfig]);

  const updateFields = (fields: Partial<formData>) => {
    setData(prev => {
      return { ...prev, ...fields };
    });
  };

  const onSendData = () => {
    sendKycForm({
      variables: {
        profile_id:  appId?.app_profiles[0].id,
        country: data.country.prevValue,
        citizenship: data.citizenship.prevValue,
        email_address: data.email_address.prevValue,
        phone_number: data.phone,
        last_name: data.last_name.prevValue,
        birthdate: data.birthday,
        first_name: data.last_name.prevValue,
        address_street1: data.addressLine,
        address_street2: data.addressLine2,
        address_province: data.state,
        address_postal_code: data.zipcode,
        address_city: data.city,
        tax_id_value: data.socialSecurityNumber,
        tax_id_type: data.tax_id_type
      },
    });
  };

  const {
    step, isFirstStep, back,
    next, isLastPage, isContinue,
    isControls, currentStepIndex, goToStep
    ,isPrivacy
  } = useMultistepForm([
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
    data.tag === 'employment' ? [<CompanyForm {...data} updateFields={updateFields}/>, <SourceForm {...data} updateFields={updateFields}/> ]: <SourceForm  {...data} updateFields={updateFields}/>,
    <LetUsKnowForm {...data} updateFields={updateFields}/>,
    <InvestmentProfileForm {...data} updateFields={updateFields}/>,
    <CustomerAgreementForm/>,
    null
  ].flat());

  const value = {
    step,
    isFirstStep,
    back,
    next,
    isLastPage,
    isContinue,
    isControls,
    currentStepIndex,
    goToStep,
    isPrivacy,
    data,
    flags: countries,
    countries: [],
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
    sendKycFormRequest: {
      sendKycForm,
      loading: sendKycFormLoading,
      data: sendKycFormData,
      error: sendKycFormError
    },
    onSendData,
    appId,
    formLoading: formLoading && kycFormConfigLoader
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}