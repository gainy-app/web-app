import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface phoneData {
  email: string
}

type Props = phoneData & {
  updateFields: (fields: Partial<phoneData>) => void
}

export const PhoneNumberForm = ({ updateFields,email }:Props) => {
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
    </FormWrapper>
  );
};