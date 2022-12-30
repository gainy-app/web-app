import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { useFormContext } from 'contexts/FormContext';
import React, { useEffect } from 'react';
import { Button } from '../../common/Button';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import parse from 'html-react-parser';
import { parseGQLerror } from '../../../utils/helpers';
import styles from './verifyphonenumber.module.scss';
import { logFirebaseEvent, trackEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { usePin } from '../../../hooks';

interface verifyData {
  verifyCode: string
}

type Props = verifyData & {
  updateFields: (fields: Partial<verifyData>) => void
}

export const VerifyPhoneNumberForm = ({ updateFields, verifyCode }:Props) => {
  const { data , verificationCodeRequest, verifyCodeRequest, back, appId } = useFormContext();
  const { currentUser } = useAuth();
  const { title,subtitle } = config(data.phone);

  const { PIN_LENGTH,pin,onChange,onKeyDown,inputRefs, resetValues } = usePin(6,0, 6, data, updateFields, 'verifyCode');
  const disabled  = verifyCode?.length !== 6;

  const onNextClick = () => {
    verificationCodeRequest.verificationCode({
      variables: {
        verification_code_id: verifyCodeRequest?.data?.verification_send_code?.verification_code_id,
        user_input: verifyCode,
      }
    });
    logFirebaseEvent('dw_kyc_phonev_e', currentUser, appId);
    trackEvent('KYC_acc_verify_phone_done', currentUser?.uid);
  };

  const onSendVerifyCodeAgain = () => {
    verifyCodeRequest.verifyCode({
      variables: {
        profile_id:  appId,
        channel: 'SMS',
        address: `+1${String(data.phone)}`
      }
    });
    updateFields({
      ...data, verifyCode: ''
    });
    resetValues();
  };

  useEffect(() => {
    logFirebaseEvent('dw_kyc_phonev_s', currentUser, appId);
  }, []);
  return (
    <FormWrapper title={title} subtitle={parse(subtitle)}>
      <label className={styles.pinInputLabel} htmlFor={'first'}>
        <div className={styles.pinInputWrapper}>
          <div className={styles.pinInput}>
            {Array.from({ length: PIN_LENGTH }, (_, index) => (
              <input
                id={index === 0 ? 'first' : ''}
                placeholder={'*'}
                onKeyDown={(event) => onKeyDown(event, index)}
                key={index}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                onChange={(event) => onChange(event, index)}
                value={pin[index] || ''}
              />
            ))}
          </div>
        </div>
      </label>

      <div
        onClick={onSendVerifyCodeAgain}
        className={styles.sendAgain}>Send Again</div>
      {
        parseGQLerror(verifyCodeRequest?.error) && (
          <p className={styles.error}>
            {parseGQLerror(verifyCodeRequest?.error)}
          </p>
        )
      }
      {
        parseGQLerror(verificationCodeRequest?.error) && (
          <p  className={styles.error}>
            {parseGQLerror(verificationCodeRequest?.error)}
          </p>
        )
      }

      <ButtonsGroup onBack={back} disableNext={disabled} onNext={onNextClick}>
        <Button disabled={disabled} type={'button'} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};
