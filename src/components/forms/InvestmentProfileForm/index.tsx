import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface profileData {
  anualIncome: string
  networthTotal: string
  networthLiqued: string
  exp: string
  objectives: string
  risk: string
}

type Props = profileData & {
  updateFields: (fields: Partial<profileData>) => void
}

export const InvestmentProfileForm = ({ updateFields }:Props) => {
  console.log(updateFields);
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
    </FormWrapper>
  );
};