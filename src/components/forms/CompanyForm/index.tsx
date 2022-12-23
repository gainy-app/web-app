import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button } from '../../common/Button';
import styles from './company.module.scss';
import React, { useEffect, useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { FloatingInput } from '../../common/FloatingInput';
import { Dropdown } from '../../common/Dropdown';
import { logFirebaseEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

interface companyData {
  companyName: string
  employment_type: {
    prevValue: string
    choices?: any,
    name: string,
  }
  employment_position: {
    prevValue: string
    choices?: any,
    name: string,
  }
}

type Props = companyData & {
  updateFields: (fields: Partial<companyData>) => void
}

export const CompanyForm = ({ updateFields, companyName, employment_position, employment_type }:Props) => {
  const { title,subtitle } = config;
  const { next, back, onSendData, appId } = useFormContext();
  const { currentUser } = useAuth();
  const [openType,setOpenType] = useState(false);

  const [openPosition,setOpenPosition] = useState(false);

  const typeList = employment_type?.choices?.map((choice: {value: string, name: string}) => {
    return <div
      key={choice.value}
      onClick={() => {
        updateFields({
          employment_type: {
            ...employment_type,
            prevValue: choice.value,
            name: choice.name
          }
        });}
      }>{choice.name}</div>;
  });

  const positionList = employment_position?.choices?.map((choice: {value: string, name: string}) => {
    return <div
      key={choice.value}
      onClick={() => {
        updateFields({
          employment_position: {
            ...employment_position,
            prevValue: choice.value,
            name: choice.name
          }
        });}
      }>{choice.name}</div>;
  });

  const toggleVisibleTypePopUp = () => {
    setOpenType(!openType);
  };

  const toggleVisibleOpenPopUp = () => {
    setOpenPosition(!openPosition);
  };

  const onNextClick = () => {
    logFirebaseEvent('dw_kyc_your_firm_e', currentUser, appId, { company: companyName });
    onSendData();
    next();
  };

  useEffect(() => {
    logFirebaseEvent('dw_kyc_your_firm_s', currentUser, appId);
  }, []);

  const disabled = !companyName || !employment_type.name || !employment_position.name;

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.companyInnerForm}>
        <FloatingInput
          id={'company_name'}
          placeholder={' '}
          label={'Company name'}
          value={companyName}
          onChange={(e) => {
            updateFields({
              companyName: e.target.value
            });
          }}
        />
        <Dropdown list={typeList} openDropdown={openType} onClick={toggleVisibleTypePopUp} setOpenDropdown={setOpenType}>
          <div className={employment_type.name ? styles.activeLabel : styles.label}>Industry</div>
          <div>{employment_type.name}</div>
        </Dropdown>
        <Dropdown list={positionList} openDropdown={openPosition} onClick={toggleVisibleOpenPopUp} setOpenDropdown={setOpenPosition}>
          <div className={employment_position.name ? styles.activeLabel : styles.label}>Your job title</div>
          <div>{employment_position.name}</div>
        </Dropdown>
      </div>

      <ButtonsGroup onBack={back} onNext={onNextClick} disableNext={disabled}>
        <Button type={'button'}  disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};