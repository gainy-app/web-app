import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { useFormContext } from '../../../contexts/FormContext';
import { parseGQLerror } from '../../../utils/helpers';
import { Button } from '../../common/Button';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import styles from './phonenumber.module.scss';
import flag from '../../../assets/flag.svg';
import { sendEvent, sendGoogleDataLayerEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect } from 'react';

interface phoneData {
  phone: string
}

type Props = phoneData & {
  updateFields: (fields: Partial<phoneData>) => void
}

export const PhoneNumberForm = ({ updateFields, phone }:Props) => {
  const { title,subtitle } = config;
  const { verifyCodeRequest, back } = useFormContext();
  const { currentUser, appId } = useAuth();

  const onNextClick = async () => {
    sendGoogleDataLayerEvent('KYC_acc_phone_input', currentUser?.uid);

    try {
      const isVerified = await verifyCodeRequest.verifyCode({
        variables: {
          profile_id:  appId,
          channel: 'SMS',
          address: `+1${String(phone)}`
        }
      });

      isVerified?.data && sendEvent('kyc_acc_phone_input_done', currentUser?.uid, appId, {
        error: ''
      });
    } catch (error: any) {
      console.error(`Failed to send verifyCode - ${error.message}`);
    }
  };

  useEffect(() => {
    if (verifyCodeRequest?.error) {
      sendEvent('kyc_acc_phone_input_done', currentUser?.uid, appId, {
        error: parseGQLerror(verifyCodeRequest?.error)
      });
    }
  }, [verifyCodeRequest?.error]);

  // uncomment if isVerified?.data not working

  // useEffect(() => {
  //   if (verifyCodeRequest?.data) {
  //     sendEvent('kyc_acc_phone_input_done', currentUser?.uid, appId, {
  //       error:''
  //     });
  //   }
  // }, [verifyCodeRequest?.data]);

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.phoneNumberWrapper}>
        <div className={styles.phoneMask}>
          <img src={flag}/>
          <div>+1</div>

        </div>
        <Input style={{ padding: '20px 0' }}>
          <PatternFormat
            placeholder={'Mobile number'}
            valueIsNumericString
            format="(###) ###-####"
            mask="_"
            name={'phone'}
            onValueChange={(values: NumberFormatValues) => {
              updateFields({ phone: values.value });
            }}
            value={phone}
          />
        </Input>
      </div>

      {
        parseGQLerror(verifyCodeRequest?.error) && (
          <p className={styles.error}>
            {parseGQLerror(verifyCodeRequest?.error)}
          </p>
        )
      }
      <ButtonsGroup onBack={back} onNext={onNextClick} disableNext={phone?.length <= 9}>
        <Button
          type={'button'}
          disabled={phone?.length <= 9}
          onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>

    </FormWrapper>
  );
};
