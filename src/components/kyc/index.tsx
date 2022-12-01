import { useMultistepForm } from '../../hooks';
import {
  StepsControlForm, Button,
  KycLayout, CitizenForm, CitizenshipForm, CustomerAgreementForm,
  CompanyForm, PrivacyPolicyForm, EmailAddressForm, ResidentAddressForm,
  VerifyPhoneNumberForm, PhoneNumberForm, EmploymentForm, LegalNameForm,
  LetUsKnowForm, SocialSecurityForm, InvestmentProfileForm, SourceForm
} from 'components';
import React, { useState } from 'react';


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
  tags: string[]
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
  tags: [],
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

export const Kyc = () => {
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
    <PrivacyPolicyForm/>,
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

  const buttonsRender = () => {
    switch (true) {
      case isFirstStep:
        return (
          <Button type={'button'} onClick={next}>{'Start'}</Button>
        );
      case isContinue :
        return (
          <Button type={'button'} onClick={next}>{'Continue'}</Button>
        );
      case isPrivacy :
        return (
          <Button type={'button'} onClick={next}>{'I accept'}</Button>
        );
      case isLastPage :
        return (
          <Button type={'button'} onClick={next}>{'Done ! Open my account'}</Button>
        );
      default: return (
        <Button type={'button'} onClick={next}>{'Next'}</Button>
      );
    }
  };

  return (
    <KycLayout>
      <form>
        {step
          ? step
          : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep}/>}
        <div style={{ display:'flex' }}>
          {buttonsRender()}
          {isControls && !isLastPage && <button type={'button'} style={{ marginLeft: '104px' }} onClick={back}>back</button>}
        </div>
      </form>
    </KycLayout>
  );
};