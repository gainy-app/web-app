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
    onSendData, data, updateFields
  } = useFormContext();
  useEffect(() => {
    if(verifyCodeRequest.data && currentStepIndex === 5) {
      onSendData();
      next();
    }
  }, [verifyCodeRequest.data]);

  useEffect(() => {
    if(data.verifyCode?.length === 6 && verificationCodeRequest.data) {
      next();
      updateFields({
        ...data, verifyCode: ''
      });
    }
  }, [verificationCodeRequest.data]);

  return (
    <KycLayout>
      {step ? step : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep}/>}
    </KycLayout>
  );
};