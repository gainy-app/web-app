import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import React from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { regExps } from '../../../utils/constants';

interface emailData {
  email_address: {
    placeholder?: string
  }
}

type Props = emailData & {
  updateFields: (fields: Partial<emailData>) => void
}

export const EmailAddressForm = ({ updateFields, email_address }:Props) => {
  const { title,subtitle } = config;
  const {  next, back, sendKycFormRequest, appId, data } = useFormContext();
  const disabled = !regExps.email.test(data.email_address?.placeholder);

  const onNextClick = () => {
    sendKycFormRequest.sendKycForm({
      variables: {
        profile_id:  appId?.app_profiles[0].id,
        country: data?.address_country?.placeholder,
        citizenship: data.citizenship ? 'US' : 'any',
        email_address: email_address.placeholder,
      },
    });
    next();
  };

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input
        placeholder={email_address?.placeholder}
        value={email_address.placeholder}
        onChange={
          (e) => updateFields({ email_address: {
            placeholder: e.target.value
          } })
        }
      />
      <ButtonsGroup onBack={back}>
        <Button disabled={disabled} type={'button'} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};