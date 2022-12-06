import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './legalname.module.scss';
import { FloatingInput } from '../../common/FloatingInput';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import React from 'react';

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
    </FormWrapper>
  );
};