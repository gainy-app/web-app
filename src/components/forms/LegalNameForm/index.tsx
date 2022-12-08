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
  first_name: {
    placeholder?: string
    prevValue?: string
  }
  last_name: {
    placeholder?: string
    prevValue?: string
  }
  birthday: string
}

type Props = userData & {
  updateFields: (fields: Partial<userData>) => void
}

export const LegalNameForm = ({ updateFields, first_name, last_name, birthday }:Props) => {
  const { title,subtitle } = config;
  const { next ,back, onSendData } = useFormContext();

  const disable = !first_name.prevValue || !first_name.prevValue || birthday?.length !== 8;
  const onNextClick = () => {
    onSendData();
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
            updateFields(
              {
                first_name : {
                  placeholder: e.target.value,
                  prevValue: e.target.value
                }
              }
            );
          }}
          value={first_name?.prevValue ? first_name.prevValue : first_name.placeholder}
        />
        <FloatingInput
          id={'last_name'}
          placeholder={' '}
          label={'Legal last name'}
          onChange={(e) => {
            updateFields({
              last_name: {
                placeholder: e.target.value,
                prevValue: e.target.value
              }
            });
          }}
          value={last_name?.prevValue ? last_name.prevValue : last_name.placeholder}
        />
        <FloatingInput
          id={'birthday'}
          label={'Birthday'}
          value={birthday}
        >
          <PatternFormat
            valueIsNumericString
            format="####.##.##"
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