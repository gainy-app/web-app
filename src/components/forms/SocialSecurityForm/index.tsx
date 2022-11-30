import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface socialSecurityData {
  socialSecurityNumber: string
}

type Props = socialSecurityData & {
  updateFields: (fields: Partial<socialSecurityData>) => void
}

export const SocialSecurityForm = ({ updateFields }:Props) => {
  console.log(updateFields);
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
    </FormWrapper>
  );
};