import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './legalname.module.scss';
import { FloatingInput } from '../../common/FloatingInput';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React from 'react';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface userData {
  first_name: string
  last_name: string
  birthday: string
}

type Props = userData & {
  updateFields: (fields: Partial<userData>) => void
}

export const LegalNameForm = ({ updateFields, first_name, last_name, birthday }:Props) => {
  const { title,subtitle } = config;
  const { next ,back, sendKycFormRequest, appId, data } = useFormContext();
  const disable = !first_name || !first_name || birthday.length === 9;
  const onNextClick = () => {
    sendKycFormRequest.sendKycForm({
      variables: {
        profile_id:  appId?.app_profiles[0].id,
        country: data?.address_country?.placeholder,
        citizenship: data.citizenship ? 'US' : 'any',
        email_address: data.email_address.placeholder,
        phone_number: data.phone,
        last_name: last_name,
        birthdate: birthday,
        first_name: first_name
      },
    });
    next();
  };
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.inputFormWrapper}>
        <FloatingInput
          id={'first_name'}
          placeholder={' '}
          label={'Legal first name'}
          onChange={(e) => {
            updateFields({ first_name: e.target.value });
          }}
          value={first_name}
        />
        <FloatingInput
          id={'last_name'}
          placeholder={' '}
          label={'Legal last name'}
          onChange={(e) => {
            updateFields({ last_name: e.target.value });
          }}
          value={last_name}
        />
        <FloatingInput
          id={'birthday'}
          label={'Birthday'}
          value={birthday}
        >
          <PatternFormat
            valueIsNumericString
            format="##.##.####"
            placeholder={'Birthday'}
            name={'Birthday'}
            onValueChange={(values: NumberFormatValues) => {
              updateFields({ birthday: values.value });
            }}
            value={birthday}
          />
        </FloatingInput>
      </div>
      <ButtonsGroup onBack={back}>
        <Button disabled={disable} type={'button'} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};