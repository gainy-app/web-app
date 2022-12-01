import React, { useContext, useState } from 'react';
import { useMultistepForm } from '../hooks';
import {
  Button,
  CitizenForm,
  CitizenshipForm, CompanyForm, CustomerAgreementForm,
  EmailAddressForm, EmploymentForm, InvestmentProfileForm, LegalNameForm, LetUsKnowForm,
  PhoneNumberForm,
  PrivacyPolicyForm, ResidentAddressForm, SocialSecurityForm, SourceForm,
  VerifyPhoneNumberForm
} from '../components';
import { User as FirebaseUser } from '@firebase/auth';
interface formData {
  country: string
  citizenship: boolean
  email: string
  phone: string
  verifyCode: string
  username: string
  lastname: string
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

const INITIAL_DATA = {
  country: '',
  citizenship: false,
  email: '',
  phone: '',
  verifyCode: '',
  username: '',
  lastname: '',
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
interface IFormContext {
  step: string,
  isFirstStep: boolean,
  back: () => void,
  next: () => void,
  goToStep: () => void,
  isLastPage: boolean,
  isContinue: boolean,
  isControls: boolean,
  isPrivacy: boolean,
  currentStepIndex: number,
}

const FormContext = React.createContext<any>({
  step: '',
  isFirstStep: false,
  back: () => {},
  next: () => {},
  goToStep: () => {},
  isLastPage: false,
  isContinue: false,
  isControls: false,
  isPrivacy: false,
  currentStepIndex: 0,
});

export function useFormContext() {
  return useContext(FormContext);
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function FormProvider ({ children }: Props) {

  const [data, setData] = useState<formData>(INITIAL_DATA);
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
    <CompanyForm {...data} updateFields={updateFields}/>,
    <SourceForm {...data} updateFields={updateFields}/>,
    <LetUsKnowForm {...data} updateFields={updateFields}/>,
    <InvestmentProfileForm {...data} updateFields={updateFields}/>,
    <CustomerAgreementForm/>,
    null
  ]);


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
    isPrivacy
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}