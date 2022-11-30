import { FormWrapper } from '../FormWrapper';
import { config } from './config';

interface citizenData {
  citizenship: boolean
}

type Props = citizenData & {
  updateFields: (fields: Partial<citizenData>) => void
}

export const CitizenshipForm = ({ updateFields }:Props) => {
  const { title,subtitle } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <label>
        US citizen
        <input type="checkbox"
          onChange={(e) => updateFields({ citizenship: e.target.checked }) }
        />
      </label>
      <label>
        Not a U.S. citizen, but live here legaly
        <input type="checkbox"/>
      </label>
    </FormWrapper>
  );
};