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
  GET_FORM_CONFIG,
  SEND_KYC_FORM,
  VERIFICATION_SEND_CODE,
  VERIFICATION_VERIFY_CODE
} from 'services/gql/queries';

interface formData {
  address_country: {
    placeholder: string
    flag: string
  }
  citizenship: boolean
  email_address: {
    placeholder?: string
  }
  phone: string
  verifyCode: string
  first_name: string
  last_name: string
  birthday: string
  addressLine: string
  addressLine2: string
  city: string
  state: string
  zipcode: string
  socialSecurityNumber: string
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

  const { data: kycFormConfig } = useQuery(GET_FORM_CONFIG, {
    variables: {
      profile_id: appId?.app_profiles[0].id
    }
  });
  const { data: countries } = useQuery(GET_COUNTRIES);

  const [verifyCode
    , { loading: verifyLoading, data:verifyNumber, error: verifyError }
  ] = useMutation(VERIFICATION_SEND_CODE);

  const [verificationCode,
    { loading: verificationCodeLoading,error: verificationCodeError,data: verificationCodeData }
  ] = useMutation(VERIFICATION_VERIFY_CODE);

  const [sendKycForm, { loading: sendKycFormLoading,data: sendKycFormData,error: sendKycFormError }] = useMutation(SEND_KYC_FORM);

  const INITIAL_DATA = {
    address_country: {
      placeholder: '',
      flag: ''
    },
    citizenship: false,
    email_address: {
      placeholder: ''
    },
    phone: '',
    verifyCode: '',
    first_name: '',
    last_name: '',
    birthday: '',
    addressLine: '',
    addressLine2: '',
    city: '',
    state: '',
    zipcode: '',
    socialSecurityNumber: '',
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
      address_country: {
        placeholder: kycFormConfig?.kyc_get_form_config?.address_country?.placeholder,
        flag: countries?.countries?.find((i: any) => i?.alpha2 === 'US')?.flag_w40_url
      },
      email_address: {
        placeholder: kycFormConfig?.kyc_get_form_config?.email_address?.placeholder
      },
      first_name: kycFormConfig?.kyc_get_form_config?.first_name?.placeholder,
      last_name: kycFormConfig?.kyc_get_form_config?.last_name?.placeholder
    });
  }, [kycFormConfig]);

  const updateFields = (fields: Partial<formData>) => {
    setData(prev => {
      return { ...prev, ...fields };
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
    countries,
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
    appId
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}