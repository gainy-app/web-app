import { Layout, Invest, StepsControlForm, Button } from 'components';
import styles from './home.module.scss';
import { config } from './config';
import { NumberFormatValues } from 'react-number-format';
import React, { useEffect, useState } from 'react';
import { Kyc } from '../../components/kyc';
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
};
export default function Home () {
  const { invest } = config;
  const [sum, setSum] = useState<string | null>(null);
  const [start, setStart] = useState<boolean>(false);
  const [data, setData] = useState<formData>(INITIAL_DATA);
  console.log(data);

  const updateFields = (fields: Partial<formData>) => {
    setData(prev => {
      return { ...prev, ...fields };
    });
  };


  const { step, isFirstStep, back, next, isLastPage, isContinue, isControls, currentStepIndex, goToStep }
    = useMultistepForm([
      null,
      <CitizenForm {...data} updateFields={updateFields}/>,
      <CitizenshipForm {...data} updateFields={updateFields}/>,
      <EmailAddressForm {...data} updateFields={updateFields}/>,
      <PhoneNumberForm {...data} updateFields={updateFields}/>,
      <VerifyPhoneNumberForm {...data} updateFields={updateFields}/>,
      null,
      <LegalNameForm {...data} updateFields={updateFields}/>,
      <ResidentAddressForm {...data} updateFields={updateFields}/>,
      <SocialSecurityForm {...data} updateFields={updateFields}/>,
      null
    ]);

  const onSumChange = (values: NumberFormatValues) => {
    setSum(values.formattedValue);
  };

  console.log(currentStepIndex);
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
              {isControls && <button type={'button'} style={{ marginLeft: '104px' }} onClick={back}>back</button>}
            </div>
          </KycLayout>
      }
    </Layout>
  );
}
