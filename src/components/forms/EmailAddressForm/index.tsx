import { FormWrapper } from '../FormWrapper';

interface emailData {
  email: string
}

type Props = emailData & {
  updateFields: (fields: Partial<emailData>) => void
}

export const EmailAddressForm = ({ updateFields,email }:Props) => {
  return (
    <FormWrapper>
      <div>s</div>
    </FormWrapper>
  );
};