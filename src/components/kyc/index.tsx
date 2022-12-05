import {
  StepsControlForm, Button,
  KycLayout, Image
} from 'components';
import React from 'react';
import styles from './kyc.module.scss';
import { useFormContext } from '../../contexts/FormContext';
import { imageTypes, regExps } from '../../utils/constants';

export const Kyc = () => {

  const {
    isFirstStep, isContinue, isLastPage,
    step, currentStepIndex, goToStep,
    isPrivacy,isControls,back,
    next, data, verifyCode,
    appId
  } = useFormContext();

  const buttonsRender = () => {
    switch (true) {
      case isFirstStep:
        return (
          <Button type={'button'} onClick={next}>{'Start'}</Button>
        );
      case isContinue :
        return (
          <Button type={'button'} onClick={next}>
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
            if(currentStepIndex === 5) {
              verifyCode.verifyCode({
                variables: {
                  profile_id:  appId?.app_profiles[0].id,
                  channel: 'SMS',
                  address: +1 + String(data.phone)
                }
              });
              if(verifyCode.data) {
                next();
              }
            }
            if(currentStepIndex !== 5) {
              next();
            }

          }}
          disabled={
            (currentStepIndex === 4 && !regExps.email.test(data.email_address?.placeholder))
            || (currentStepIndex === 5 && !data.phone)
            || (currentStepIndex === 6 && data.verifyCode.length !== 6)
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