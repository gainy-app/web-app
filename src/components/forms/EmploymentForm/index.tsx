import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface tagsData {
  tags: string[]
}

type Props = tagsData & {
  updateFields: (fields: Partial<tagsData>) => void
}

export const EmploymentForm = ({ updateFields }:Props) => {
  const { title,subtitle } = config;
  console.log(updateFields);
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
    </FormWrapper>
  );
};