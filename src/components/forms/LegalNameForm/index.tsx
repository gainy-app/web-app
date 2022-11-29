import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';

interface userData {
  username: string
  lastname: string
  birthday: string
}

type Props = userData & {
  updateFields: (fields: Partial<userData>) => void
}

export const LegalNameForm = ({ updateFields,lastname,username,birthday }:Props) => {
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
      <Input/>
      <Input/>
    </FormWrapper>
  );
};