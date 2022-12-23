import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { useFormContext } from 'contexts/FormContext';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React, { useEffect } from 'react';
import { Button } from '../../common/Button';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import parse from 'html-react-parser';
import { parseGQLerror } from '../../../utils/helpers';
import styles from './verifyphonenumber.module.scss';
import { logFirebaseEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

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
  const disabled  = verifyCode?.length !== 6;

  const onNextClick = () => {
    verificationCodeRequest.verificationCode({
      variables: {
        verification_code_id: verifyCodeRequest?.data?.verification_send_code?.verification_code_id,
        user_input: verifyCode,
      }
    });
    logFirebaseEvent('dw_kyc_phonev_e', currentUser, appId);
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
  };

  useEffect(() => {
    logFirebaseEvent('dw_kyc_phonev_s', currentUser, appId);
  }, []);
  return (
    <FormWrapper title={title} subtitle={parse(subtitle)}>
      <Input centeredPlaceholder={!verifyCode}>
        <PatternFormat
          placeholder={'* * *  * * *'}
          valueIsNumericString
          format="# # #  # # #"
          mask="*"
          name={'verifyCode'}
          onValueChange={(values: NumberFormatValues) => {
            updateFields({ verifyCode: values.value });
          }}
          value={verifyCode}
        />
      </Input>
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
