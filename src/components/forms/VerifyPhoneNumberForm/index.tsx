import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { useFormContext } from 'contexts/FormContext';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React from 'react';
import { Button } from '../../common/Button';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface verifyData {
  verifyCode: string
}

type Props = verifyData & {
  updateFields: (fields: Partial<verifyData>) => void
}

export const VerifyPhoneNumberForm = ({ updateFields, verifyCode }:Props) => {
  const { data: { phone } , verificationCodeRequest, verifyCodeRequest, back } = useFormContext();
  const { title,subtitle } = config(phone);

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input>
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
      <ButtonsGroup onBack={back}>
        <Button type={'button'} onClick={() => {
          verificationCodeRequest.verificationCode({
            variables: {
              verification_code_id: verifyCodeRequest?.data?.verification_send_code?.verification_code_id,
              user_input: verifyCode,
            }
          });
        }}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};
