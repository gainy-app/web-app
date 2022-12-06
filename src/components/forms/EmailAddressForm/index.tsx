import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

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
    </FormWrapper>
  );
};