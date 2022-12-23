import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import React, { useEffect } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { regExps } from '../../../utils/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { logFirebaseEvent } from '../../../utils/logEvent';

interface emailData {
  email_address: {
    placeholder?: string
    prevValue?: string
  }
}

type Props = emailData & {
  updateFields: (fields: Partial<emailData>) => void
}

export const EmailAddressForm = ({ updateFields, email_address }:Props) => {
  const { title,subtitle } = config;
  const {  next, back, data, onSendData, appId } = useFormContext();
  const { currentUser } = useAuth();
  const disabled = !regExps.email.test(data.email_address?.placeholder);

  useEffect(() => {
    logFirebaseEvent('dw_kyc_email_s', currentUser, appId);
  },[]);

  const onNextClick = () => {
    logFirebaseEvent('dw_kyc_email_e', currentUser, appId, { email: email_address.prevValue ? email_address.prevValue : email_address.placeholder });
    onSendData();
    next();
  };

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input
        placeholder={'Email'}
        value={email_address.prevValue ? email_address.prevValue : email_address.placeholder}
        onChange={
          (e) => updateFields({ email_address: {
            placeholder: e.target.value,
            prevValue:  e.target.value
          } })
        }
      />
      <ButtonsGroup onBack={back} onNext={onNextClick} disableNext={disabled}>
        <Button disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};