import { useMultistepForm } from '../../hooks';
import {
  StepsControlForm, Button,
  KycLayout, CitizenForm, CitizenshipForm, CustomerAgreementForm,
  CompanyForm, PrivacyPolicyForm, EmailAddressForm, ResidentAddressForm,
  VerifyPhoneNumberForm, PhoneNumberForm, EmploymentForm, LegalNameForm,
  LetUsKnowForm, SocialSecurityForm, InvestmentProfileForm, SourceForm
} from 'components';
import React, { useState } from 'react';
import styles from './kyc.module.scss';
import { useFormContext } from '../../contexts/FormContext';


export const Kyc = () => {

  const { isFirstStep, isContinue, isLastPage, step, currentStepIndex, goToStep, isPrivacy,isControls,back,
    next } = useFormContext();


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
      // case isPrivacy :
      //   return (
      //     <Button type={'button'} onClick={next}>{'I accept'}</Button>
      //   );
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

        <div className={styles.buttons}>
          {!isPrivacy && buttonsRender()}
          {isControls && !isLastPage && !isPrivacy && <button type={'button'} style={{ marginLeft: '104px' }} onClick={back}>back</button>}
        </div>
      </form>
    </KycLayout>
  );
};