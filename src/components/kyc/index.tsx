import {
  StepsControlForm,
  KycLayout
} from 'components';
import React, { useEffect } from 'react';
import { useFormContext } from 'contexts/FormContext';

export const Kyc = () => {
  const {
    step, currentStepIndex, goToStep,
    next, verifyCodeRequest, verificationCodeRequest,
    onSendData
  } = useFormContext();
  useEffect(() => {
    if(verifyCodeRequest.data) {
      onSendData();
      next();
    }
  }, [verifyCodeRequest.data]);

  useEffect(() => {
    if(verificationCodeRequest.data) {
      next();
    }
  }, [verificationCodeRequest.data]);

  return (
    <KycLayout>
      <form>
        {step ? step : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep}/>}
      </form>
    </KycLayout>
  );
};