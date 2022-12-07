import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenshipform.module.scss';
import { Checkbox } from '../../common/Checkbox';
import { Field } from '../../common/Field';
import { Button } from '../../common/Button';
import React from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface citizenData {
  citizenship: boolean
}

type Props = citizenData & {
  updateFields: (fields: Partial<citizenData>) => void
}

export const CitizenshipForm = ({ updateFields, citizenship }:Props) => {
  const { title,subtitle } = config;
  const {  next, back , sendKycFormRequest, appId, data } = useFormContext();
  const disable = !citizenship;

  const onNextClick = () => {
    sendKycFormRequest.sendKycForm({
      variables: {
        profile_id:  appId?.app_profiles[0].id,
        country: data?.address_country?.placeholder,
        citizenship: citizenship ? 'US' : 'any'
      },
    });
    next();
  };

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.formWrapper}>
        <label htmlFor={'test'}>
          <Field>
            <p>U.S. citizen</p>
            <Checkbox value={citizenship} label={'US citizen'} id={'test'} onChange={(e) => updateFields({ citizenship: e.target.checked })}/>
          </Field>
        </label>
        <label htmlFor={'test1'}>
          <Field>
            <p>Not a U.S. citizen, but live here legaly</p>
            <Checkbox value={false} label={'Not a U.S. citizen, but live here legaly'} id={'test1'} onChange={(e) => updateFields({ citizenship: e.target.checked })}/>
          </Field>
        </label>

      </div>
      <ButtonsGroup onBack={back}>
        <Button disabled={disable} type={'button'} onClick={onNextClick}>{'Continue'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};