import {
  StepsControlForm,
  KycLayout,
  Loader
} from 'components';
import { useEffect, useState } from 'react';
import { useFormContext } from 'contexts/FormContext';
import { useAuth } from '../../contexts/AuthContext';
import { trackEvent } from '../../utils/logEvent';
import styles from './kyc.module.scss';

export const Kyc = () => {
  const {
    step, currentStepIndex, goToStep,
    next, verifyCodeRequest, verificationCodeRequest,
    onSendData, data, updateFields, appId
  } = useFormContext();
  const [isAppIdError, setIsAppIdError] = useState(false);
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
    const checkAppIdTimeout = setTimeout(() => {
      appId || setIsAppIdError(true);
    }, 30000);

    return () => clearTimeout(checkAppIdTimeout);
  }, []);
  return (
    <KycLayout>
      {appId ? (
        step ? step : <StepsControlForm currentStepIndex={currentStepIndex} goToStep={goToStep} />
      ) : isAppIdError ? (
        <label className={styles.loadedError}>{'Sorry can\'t load your appId. Try to refresh your page or log in again'}</label>) : <Loader />
      }
    </KycLayout>
  );
};