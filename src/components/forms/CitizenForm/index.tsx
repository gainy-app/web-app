import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Field } from '../../common/Field';

interface citizenData {
  country: string
}

type Props = citizenData & {
  updateFields: (fields: Partial<citizenData>) => void
}

export const CitizenForm = ({ country, updateFields }: Props) => {
  const { title,subtitle, formContent } = config;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <label>
        <Field>
          <select
            value={country}
            onChange={(e) => updateFields({ country: e.target.value }) }
          >
            <option value={'us'}> us </option>
            <option value={'by'}> by </option>
            <option value={'ru'}> ru </option>
          </select>
        </Field>

      </label>
      <p>{formContent}</p>
    </FormWrapper>
  );
};