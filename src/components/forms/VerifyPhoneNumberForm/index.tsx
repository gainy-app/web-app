import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface verifyData {
  verifyCode: string
}

type Props = verifyData & {
  updateFields: (fields: Partial<verifyData>) => void
}

export const VerifyPhoneNumberForm = ({ updateFields,verifyCode }:Props) => {
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
    </FormWrapper>
  );
};