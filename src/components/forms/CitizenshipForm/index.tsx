import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenshipform.module.scss';
import { Checkbox } from '../../common/Checkbox';
import { Field } from '../../common/Field';

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
      <div className={styles.formWrapper}>
        <label htmlFor={'test'}>
          <Field>
            <p>U.S. citizen</p>
            <Checkbox label={'US citizen'} id={'test'} onChange={(e) => updateFields({ citizenship: e.target.checked })}/>
          </Field>
        </label>
        <label htmlFor={'test1'}>
          <Field>
            <p>Not a U.S. citizen, but live here legaly</p>
            <Checkbox label={'Not a U.S. citizen, but live here legaly'} id={'test1'} onChange={(e) => updateFields({ citizenship: e.target.checked })}/>
          </Field>
        </label>
      </div>
    </FormWrapper>
  );
};