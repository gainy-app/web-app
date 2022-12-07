import {
  StepsControlForm,
  KycLayout
} from 'components';
import React, { useEffect } from 'react';
import { useFormContext } from 'contexts/FormContext';

export const Kyc = () => {
  const {
    step, currentStepIndex, goToStep,
    next, data, verifyCodeRequest,
    appId, verificationCodeRequest,
    sendKycFormRequest
  } = useFormContext();

  useEffect(() => {
    if(verifyCodeRequest.data) {
      sendKycFormRequest.sendKycForm({
        variables: {
          profile_id:  appId?.app_profiles[0].id,
          country: data?.address_country?.placeholder,
          citizenship: data.citizenship ? 'US' : 'any',
          email_address: data.email_address.placeholder,
          phone_number: data.phone,
        },
      });
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

  return (
    <KycLayout>
      <form>
        {step ? step : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep}/>}
      </form>
    </KycLayout>
  );
};