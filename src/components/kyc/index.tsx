import {
  StepsControlForm, Button,
  KycLayout, Image
} from 'components';
import React, { useEffect } from 'react';
import styles from './kyc.module.scss';
import { useFormContext } from 'contexts/FormContext';
import { imageTypes, regExps } from 'utils/constants';

export const Kyc = () => {

  const {
    isFirstStep, isContinue, isLastPage,
    step, currentStepIndex, goToStep,
    isPrivacy,isControls,back,
    next, data, verifyCodeRequest,
    appId, verificationCodeRequest,
    sendKycFormRequest
  } = useFormContext();

  useEffect(() => {
    if(verifyCodeRequest.data) {
      next();
    }
  }, [verifyCodeRequest.data]);

  useEffect(() => {
    if(verificationCodeRequest.data) {
      next();
    }
  }, [verificationCodeRequest.data]);

  console.log(currentStepIndex);
  console.log(data);

  const sendData = () => {
    sendKycFormRequest.sendKycForm({
      variables: {
        profile_id:  appId?.app_profiles[0].id,
        email_address: data?.email_address?.placeholder,
        country: data?.address_country?.placeholder
      },
    });
    localStorage.setItem('formData', JSON.stringify(data));
  };

  const buttonsRender = () => {
    switch (true) {
      case isFirstStep:
        return (
          <Button type={'button'} onClick={next}>{'Start'}</Button>
        );
      case isContinue :
        return (
          <Button type={'button'} onClick={() => {
            sendData();
            next();
          }}>
            {'Continue'}
          </Button>
        );
      case isLastPage :
        return (
          <Button type={'button'} onClick={next}>{'Done ! Open my account'}</Button>
        );
      default: return (
        <Button
          type={'button'}
          onClick={() => {
            if(currentStepIndex === 5 && data.phone.length <= 10) {
              verifyCodeRequest.verifyCode({
                variables: {
                  profile_id:  appId?.app_profiles[0].id,
                  channel: 'SMS',
                  address: `+1${String(data.phone)}`
                }
              });
            }
            if(currentStepIndex === 6) {
              verificationCodeRequest.verificationCode({
                variables: {
                  verification_code_id: verifyCodeRequest?.data?.verification_send_code?.verification_code_id,
                  user_input: data?.verifyCode,
                }
              });
            }
            sendData();
            if(currentStepIndex !== 5 && currentStepIndex !== 6) {
              next();
            }

          }}
          disabled={
            (currentStepIndex === 4 && !regExps.email.test(data.email_address?.placeholder))
            || (currentStepIndex === 5 && data.phone.length <= 9)
            || (currentStepIndex === 6 && data.verifyCode.length !== 6)
            || (currentStepIndex === 8 && !data.first_name)
            || (currentStepIndex === 8 && !data.last_name)
            || (currentStepIndex === 8 && !data.birthday)
            || (currentStepIndex === 9 && !data.addressLine)
            || (currentStepIndex === 9 && !data.city)
            || (currentStepIndex === 9 && !data.state)
            || (currentStepIndex === 9 && !data.zipcode)
          }
        >{'Next'}</Button>
      );
    }
  };

  return (
    <KycLayout>
      <form>
        {step
          ? step
          : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep}/>}

        <div className={styles.buttons}>
          {!isPrivacy &&  buttonsRender()}
          {isControls && !isLastPage && !isPrivacy && <div className={styles.arrow} onClick={back}><Image type={imageTypes.arrow}/></div> }
        </div>
      </form>
    </KycLayout>
  );
};