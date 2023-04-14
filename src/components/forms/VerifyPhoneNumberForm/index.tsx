import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { useFormContext } from 'contexts/FormContext';
import { Button } from '../../common/Button';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import parse from 'html-react-parser';
import { parseGQLerror } from '../../../utils/helpers';
import styles from './verifyphonenumber.module.scss';
import { Input } from '../../common/Input';
import { useAuth } from 'contexts/AuthContext';
import { sendEvent } from 'utils/logEvent';
import { useEffect } from 'react';

interface verifyData {
  verifyCode: string
}

type Props = verifyData & {
  updateFields: (fields: Partial<verifyData>) => void
}

export const VerifyPhoneNumberForm = ({ updateFields, verifyCode }:Props) => {
  const { data, verificationCodeRequest, verifyCodeRequest, back } = useFormContext();
  const { appId, currentUser } = useAuth();
  const { title,subtitle } = config(data.phone);

  const disabled  = verifyCode?.length !== 6;

  const onNextClick = async() => {
    try {
      const isVerified = await verificationCodeRequest.verificationCode({
        variables: {
          verification_code_id: verifyCodeRequest?.data?.verification_send_code?.verification_code_id,
          user_input: verifyCode,
        }
      });

      if(isVerified?.data) {
        sendEvent('kyc_acc_verify_phone_done', currentUser?.uid, appId, {
          error: ''
        });
        sendEvent('kyc_what_now_create_acc_done', currentUser?.uid, appId);
      }
    } catch (error: any) {
      sendEvent('kyc_acc_verify_phone_done', currentUser?.uid, appId, {
        error: error.message || 'Invalid phone number.'
      });
    }
  };

  const onSendVerifyCodeAgain = async () => {
    await verifyCodeRequest.verifyCode({
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
    if (verificationCodeRequest?.error) {
      sendEvent('kyc_acc_verify_phone_done', currentUser?.uid, appId, {
        error: parseGQLerror(verificationCodeRequest?.error)
      });
    }
  }, [verificationCodeRequest?.error]);

  // uncomment if isVerified?.data not working

  // useEffect(() => {
  //   if (verificationCodeRequest?.data) {
  //     sendEvent('kyc_acc_phone_input_done', currentUser?.uid, appId, {
  //       error:''
  //     });
  //   }
  // }, [verificationCodeRequest?.data]);

  return (
    <FormWrapper title={title} subtitle={parse(subtitle)}>
      <Input centeredPlaceholder={!verifyCode}
        maxLength={6}
        onChange={(e) => {
          updateFields({ verifyCode: e.target.value });
        }}
        value={verifyCode}
        placeholder={'* * *    * * *'}/>
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
