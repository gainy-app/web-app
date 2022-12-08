import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { parseGQLerror } from '../../../utils/helpers';
import { Button } from '../../common/Button';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface phoneData {
  phone: string
}

type Props = phoneData & {
  updateFields: (fields: Partial<phoneData>) => void
}

export const PhoneNumberForm = ({ updateFields, phone }:Props) => {
  const { title,subtitle } = config;
  const { verifyCodeRequest, appId, back } = useFormContext();

  const onNextClick = () => {
    verifyCodeRequest.verifyCode({
      variables: {
        profile_id:  appId?.app_profiles[0].id,
        channel: 'SMS',
        address: `+1${String(phone)}`
      }
    });
  };

  return (
    <FormWrapper title={title} subtitle={subtitle}>
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
      <p style={{ color: 'red' }}>
        {parseGQLerror(verifyCodeRequest?.error)}
      </p>
      <ButtonsGroup onBack={back}>
        <Button
          type={'button'}
          disabled={phone?.length <= 9}
          onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>

    </FormWrapper>
  );
};
