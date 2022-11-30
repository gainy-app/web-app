import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface companyData {
  companyName: string
  industry: string
  jobTitle: string
}

type Props = companyData & {
  updateFields: (fields: Partial<companyData>) => void
}

export const CompanyForm = ({ updateFields }:Props) => {
  const { title,subtitle } = config;
  console.log(updateFields);
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
      <Input/>
      <Input/>
    </FormWrapper>
  );
};