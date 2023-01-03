import {
  StepsControlForm,
  KycLayout
} from 'components';
import React, { useEffect } from 'react';
import { useFormContext } from 'contexts/FormContext';
import { useAuth } from '../../contexts/AuthContext';
import { logFirebaseEvent, trackEvent } from '../../utils/logEvent';

export const Kyc = () => {
  const {
    step, currentStepIndex, goToStep,
    next, verifyCodeRequest, verificationCodeRequest,
    onSendData, data, updateFields, appId
  } = useFormContext();
  const { currentUser } = useAuth();
  useEffect(() => {
    if(verifyCodeRequest.data && currentStepIndex === 5) {
      onSendData();
      next();
    }
  }, [verifyCodeRequest.data]);

  useEffect(() => {
    if(verificationCodeRequest.data) {
      next();
      trackEvent('KYC_acc_verify_phone_done', currentUser?.uid);
      updateFields({
        ...data, verifyCode: ''
      });
    }
  }, [verificationCodeRequest.data]);

  useEffect(() => {
    logFirebaseEvent('dw_kyc_main_s', currentUser, appId);
  }, []);

  return (
    <KycLayout>
      {step ? step : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep}/>}
    </KycLayout>
  );
};