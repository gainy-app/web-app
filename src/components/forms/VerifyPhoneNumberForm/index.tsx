import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { useFormContext } from 'contexts/FormContext';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { VERIFICATION_VERIFY_CODE } from 'services/gql/queries';

interface verifyData {
  verifyCode: string
}

type Props = verifyData & {
  updateFields: (fields: Partial<verifyData>) => void
}

export const VerifyPhoneNumberForm = ({ updateFields, verifyCode }:Props) => {
  const { data: { phone }, verifyCodeRequest } = useFormContext();
  const { title,subtitle } = config(phone);


  const [verificationCode] = useMutation(VERIFICATION_VERIFY_CODE);

  useEffect(() => {
    if(verifyCodeRequest?.data) {
      verificationCode({
        variables: {
          verification_code_id: verifyCodeRequest?.data?.verification_send_code?.verification_code_id,
          user_input: `+375${String(phone)}`
        }
      });
    }

  }, [verifyCodeRequest]);

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
            console.log(values);
            updateFields({ verifyCode: values.value });
          }}
          value={verifyCode}
        />
      </Input>
    </FormWrapper>
  );
};
