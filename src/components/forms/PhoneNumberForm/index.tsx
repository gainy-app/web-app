import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { parseGQLerror } from '../../../utils/helpers';

interface phoneData {
  phone: string
}

type Props = phoneData & {
  updateFields: (fields: Partial<phoneData>) => void
}

export const PhoneNumberForm = ({ updateFields, phone }:Props) => {
  const { title,subtitle } = config;
  const { verifyCodeRequest } = useFormContext();
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

    </FormWrapper>
  );
};
