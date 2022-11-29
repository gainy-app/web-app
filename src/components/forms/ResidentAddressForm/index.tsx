import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface residentData {
  addressLine: string
  addressLine2: string
  city: string
  state: string
  zipcode: string
}

type Props = residentData & {
  updateFields: (fields: Partial<residentData>) => void
}

export const ResidentAddressForm = ({ updateFields,addressLine2,addressLine,state,city,zipcode }:Props) => {
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