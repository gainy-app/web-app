import { Layout, Invest, StepsControlForm, Button } from 'components';
import styles from './home.module.scss';
import { config } from './config';
import { NumberFormatValues } from 'react-number-format';
import React, {  useState } from 'react';
// import { Kyc } from '../../components/kyc';
import { useMultistepForm } from 'hooks';
import { KycLayout } from '../../components/layout/kyc';
import { CitizenForm } from '../../components/forms/CitizenForm';
import { CitizenshipForm } from '../../components/forms/CitizenshipForm';
import { EmailAddressForm } from '../../components/forms/EmailAddressForm';
import { PhoneNumberForm } from '../../components/forms/PhoneNumberForm';
import { VerifyPhoneNumberForm } from '../../components/forms/VerifyPhoneNumberForm';
import { LegalNameForm } from '../../components/forms/LegalNameForm';
import { ResidentAddressForm } from '../../components/forms/ResidentAddressForm';
import { SocialSecurityForm } from '../../components/forms/SocialSecurityForm';
import { PrivacyPolicyForm } from '../../components/forms/PrivacyPolicyForm';
import { EmploymentForm } from '../../components/forms/EmploymentForm';
import { CompanyForm } from '../../components/forms/CompanyForm';
import { SourceForm } from '../../components/forms/SourceForm';
import { LetUsKnowForm } from '../../components/forms/LetUsKnowForm';
import { InvestmentProfileForm } from '../../components/forms/InvestmentProfileForm';
import { CustomerAgreementForm } from '../../components/forms/CustomerAgreementForm';

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
export default function Home () {
  const { invest } = config;
  const [sum, setSum] = useState<string | null>(null);
  const [start, setStart] = useState<boolean>(false);
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

  const onSumChange = (values: NumberFormatValues) => {
    setSum(values.formattedValue);
  };

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
    <Layout footerClassName={styles.footer}>
      {
        !start ? <Invest invest={invest} sum={sum} onSumChange={onSumChange} setStart={setStart}/>
          :  <KycLayout>
            {step
              ? step
              : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep}/>}
            <div style={{ display:'flex' }}>
              {buttonsRender()}
              {isControls && !isLastPage && <button type={'button'} style={{ marginLeft: '104px' }} onClick={back}>back</button>}
            </div>
          </KycLayout>
      }
    </Layout>
  );
}
