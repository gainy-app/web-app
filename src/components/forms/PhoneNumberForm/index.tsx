import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React from 'react';

interface phoneData {
  phone: string
}

type Props = phoneData & {
  updateFields: (fields: Partial<phoneData>) => void
}

export const PhoneNumberForm = ({ updateFields, phone }:Props) => {
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input>
        <PatternFormat
          placeholder={'Mobile number'}
          valueIsNumericString
          format="(###) ###-####"
          mask="_"
          name={'phone'}
          onValueChange={(values: NumberFormatValues) => {
            console.log(values);
            updateFields({ phone: values.value });
          }}
          value={phone}
        />
      </Input>
    </FormWrapper>
  );
};
