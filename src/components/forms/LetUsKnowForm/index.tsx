import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface letUsKnowData {
  broker: boolean
  person: string
  tradedCompany: string
  notify: boolean
}

type Props = letUsKnowData & {
  updateFields: (fields: Partial<letUsKnowData>) => void
}

export const LetUsKnowForm = ({ updateFields }:Props) => {
  const { title,subtitle } = config;
  console.log(updateFields);
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