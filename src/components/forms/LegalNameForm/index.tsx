import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './legalname.module.scss';
import { FloatingInput } from '../../common/FloatingInput';
import React, { useState } from 'react';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
  const [value, onChange] = useState(birthday ? dayjs(birthday).toDate() : dayjs(new Date()).subtract(18, 'year').subtract(1, 'day').toDate());
  const [onShowCalender, setOnShowCalender] = useState(false);
  const onNextClick = () => {
    if(!birthday) {
      updateFields({
        birthday: dayjs(value).format('YYYY.MM.DD')
      });
    }
    onSendData();
    next();
  };
  const isYoungster = dayjs().diff(value, 'hour') < 157680;
  const disable = !last_name.placeholder || !first_name.placeholder || isYoungster ;

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

        <div style={{ position: 'relative' }}>
          <FloatingInput
            id={'birthday'}
            label={'Birthday'}
            readOnly
            onClick={() => setOnShowCalender(!onShowCalender)}
            value={value >= dayjs(new Date()).subtract(18, 'year').subtract(2, 'day').toDate() ? '' :dayjs(value).format('YYYY.MM.DD')}
          >

          </FloatingInput>
          {onShowCalender && (
            <div style={{ position: 'absolute', top: '58px' }}>
              <Calendar onChange={
                // eslint-disable-next-line @typescript-eslint/no-shadow
                (value: any) => {
                  onChange(value);
                  updateFields({
                    birthday: dayjs(value).format('YYYY.MM.DD')
                  });
                }}
              value={value}
              maxDate={dayjs(new Date()).toDate()}
              minDate={dayjs(new Date()).subtract(100, 'year').toDate()}/>
            </div>
          )}
        </div>
      </div>
      {isYoungster && (
        <p className={styles.error}>You are under 18</p>
      )}
      <ButtonsGroup onBack={back}>
        <Button disabled={disable} type={'button'} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};
