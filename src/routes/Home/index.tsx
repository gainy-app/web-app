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
interface formData {
  country: string
  citizenship: boolean
  email: string
}
const INITIAL_DATA = {
  country: '',
  citizenship: false,
  email: ''
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


  const { step, isFirstStep, back, next, isLastPage, isContinue, isControls, currentStepIndex }
    = useMultistepForm([
      '',
      <CitizenForm {...data} updateFields={updateFields}/>,
      <CitizenshipForm {...data} updateFields={updateFields}/>,
      <EmailAddressForm {...data} updateFields={updateFields}/>
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
    }
  };

  return (
    <Layout footerClassName={styles.footer}>
      {
        !start ? <Invest invest={invest} sum={sum} onSumChange={onSumChange} setStart={setStart}/>
          :  <KycLayout>
            {step
              ? step
              : <StepsControlForm currentStepIndex={currentStepIndex}/>}
            <div>
              {isControls && <button type={'button'} onClick={back}>back</button>}
              {buttonsRender()}
            </div>
          </KycLayout>
      }
    </Layout>
  );
}
