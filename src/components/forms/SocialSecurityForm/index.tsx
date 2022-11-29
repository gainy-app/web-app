import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface socialSecurityData {
  socialSecurityNumber: string
}

type Props = socialSecurityData & {
  updateFields: (fields: Partial<socialSecurityData>) => void
}

export const SocialSecurityForm = ({ updateFields,socialSecurityNumber }:Props) => {
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
      <Input/>
      <Input/>
      <Input/>
      <Input/>
    </FormWrapper>
  );
};