import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface emailData {
  email: string
}

type Props = emailData & {
  updateFields: (fields: Partial<emailData>) => void
}

export const EmailAddressForm = ({ updateFields, email }:Props) => {
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input
        placeholder={'Email'}
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
    </FormWrapper>
  );
};