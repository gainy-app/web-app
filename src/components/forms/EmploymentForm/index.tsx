import { config } from './config';
import { Button, Tag, ButtonsGroup, FormWrapper } from 'components';
import React, { useEffect } from 'react';
import styles from './emloymentform.module.scss';
import { useFormContext } from 'contexts/FormContext';
import { logFirebaseEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

interface tagsData {
  employment_status: {
    choices?: any,
    prevValue: string
  },
}

type Props = tagsData & {
  updateFields: (fields: Partial<tagsData>) => void
}

export const EmploymentForm = ({ updateFields, employment_status }:Props) => {
  const { title,subtitle } = config;
  const { next, back, onSendData, appId } = useFormContext();
  const { currentUser } = useAuth();

  const onNextClick = () => {
    if(employment_status?.prevValue === 'EMPLOYED' || employment_status?.prevValue === 'SELF_EMPLOYED') {
      logFirebaseEvent('dw_kyc_your_empl_empl', currentUser, appId);
      next();
      return;
    }
    logFirebaseEvent('dw_kyc_your_empl_non_empl', currentUser, appId);
    onSendData();
    next();
  };

  const onTagClick = (tag: {value: string}) => updateFields({ employment_status: {
    ...employment_status,
    prevValue: tag.value
  } });

  const disabled = !employment_status.prevValue;
  useEffect(() => {
    logFirebaseEvent('dw_kyc_your_empl_s', currentUser, appId);
  }, []);

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.tagsWrapper}>
        {employment_status?.choices?.map((tag: {name:string, value: string}) => {
          return <Tag
            key={tag.name}
            activeTag={employment_status.prevValue === tag.value}
            name={tag.name}
            onClick={() => onTagClick(tag)}/>;
        })}
      </div>

      <ButtonsGroup onBack={back} disableNext={disabled} onNext={onNextClick}>
        <Button disabled={disabled} type={'button'} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};
