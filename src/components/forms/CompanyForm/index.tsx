import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button } from '../../common/Button';
import styles from './company.module.scss';
import React, { useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { FloatingInput } from '../../common/FloatingInput';
import { Dropdown } from '../../common/Dropdown';

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
  const { next, back, onSendData } = useFormContext();
  const [openType,setOpenType] = useState(false);

  const [openPosition,setOpenPosition] = useState(false);

  const typeList = employment_type?.choices?.map((choice: {value: string, name: string}) => {
    return <div onClick={() => {
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
    return <div onClick={() => {
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
    onSendData();
    next();
  };

  const disabled = false;

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
          {/*{*/}
          {/*  !employment_type.name && (*/}
          {/*   */}
          {/*  )*/}
          {/*}*/}

          <div>{employment_type.name}</div>
          <div></div>
        </Dropdown>
        <Dropdown list={positionList} openDropdown={openPosition} onClick={toggleVisibleOpenPopUp} setOpenDropdown={setOpenPosition}>
          <div className={employment_position.name ? styles.activeLabel : styles.label}>Your job title</div>
          <div>{employment_position.name}</div>
        </Dropdown>
      </div>

      <ButtonsGroup onBack={back}>
        <Button type={'button'}  disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};