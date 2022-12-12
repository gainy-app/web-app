import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button } from '../../common/Button';
import React, { useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { FloatingInput } from '../../common/FloatingInput';
import { Dropdown } from '../../common/Dropdown';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import styles from '../../common/Invest/invest.module.scss';

interface profileData {
  investor_profile_annual_income: {
    formattedValue:string
    value: string
  }
  investor_profile_net_worth_total: {
    formattedValue:string
    value: string
  }
  investor_profile_net_worth_liquid: {
    formattedValue:string
    value: string
  }
  investor_profile_experience: {
    choices?: any
    prevValue: string
    name: string
  }
  investor_profile_objectives: {
    choices?: any
    prevValue: string
    name: string
  }
  investor_profile_risk_tolerance: {
    choices?: any
    prevValue: string
    name: string
  }
}

type Props = profileData & {
  updateFields: (fields: Partial<profileData>) => void
}

export const InvestmentProfileForm = ({
  updateFields,
  investor_profile_annual_income,
  investor_profile_net_worth_total,
  investor_profile_net_worth_liquid,
  investor_profile_experience,
  investor_profile_objectives,
  investor_profile_risk_tolerance
}:Props) => {
  const { title,subtitle } = config;
  const {  next, back , onSendData } = useFormContext();
  const [openExp,setOpenExp] = useState(false);
  const [openObj,setOpenObj] = useState(false);
  const [openTolerance,setOpenTolerance] = useState(false);

  const onNextClick = () => {
    onSendData();
    next();
  };

  const disabled = !investor_profile_annual_income?.value
    || !investor_profile_net_worth_total?.value
    || !investor_profile_net_worth_liquid?.value
    || !investor_profile_experience.prevValue
    || !investor_profile_objectives.prevValue
    || !investor_profile_risk_tolerance.prevValue
  ;

  const expList = investor_profile_experience?.choices?.map((choice: {value: string, name: string}) => {
    return <div onClick={() => {
      updateFields({
        investor_profile_experience: {
          ...investor_profile_experience,
          prevValue: choice.value,
          name: choice.name
        }
      });}
    }>{choice.name}</div>;
  });

  const objList = investor_profile_objectives?.choices?.map((choice: {value: string, name: string}) => {
    return <div onClick={() => {
      updateFields({
        investor_profile_objectives: {
          ...investor_profile_objectives,
          prevValue: choice.value,
          name: choice.name
        }
      });}
    }>{choice.name}</div>;
  });

  const toleranceList = investor_profile_risk_tolerance?.choices?.map((choice: {value: string, name: string}) => {
    return <div onClick={() => {
      updateFields({
        investor_profile_risk_tolerance: {
          ...investor_profile_risk_tolerance,
          prevValue: choice.value,
          name: choice.name
        }
      });}
    }>{choice.name}</div>;
  });

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <h2>What is your approximate annual income?</h2>
      <FloatingInput id={'investor_profile_annual_income'} label={'Approximate annual income'}>
        <NumericFormat
          value={investor_profile_annual_income?.formattedValue}
          prefix={'$'}
          thousandSeparator allowNegative={false}
          placeholder={'$'}
          className={styles.input}
          onValueChange={(values: NumberFormatValues) => {
            console.log(values);
            updateFields({
              //@ts-ignore
              investor_profile_annual_income: values
            });
          }}
        />
      </FloatingInput>
      <h2>What is your total net worth?</h2>
      <FloatingInput
        id={'investor_profile_net_worth_total'}
        label={'estimated total net worth'}
      >
        <NumericFormat
          value={investor_profile_net_worth_total?.formattedValue}
          prefix={'$'}
          thousandSeparator allowNegative={false}
          placeholder={'$'}
          className={styles.input}
          onValueChange={(values: NumberFormatValues) => {
            updateFields({
              //@ts-ignore
              investor_profile_net_worth_total: values
            });
          }}
        />
      </FloatingInput>
      <h2>What is your liquid net worth?</h2>
      <FloatingInput
        id={'investor_profile_net_worth_liquid'}
        label={'estimated liquid net worth'}
      >
        <NumericFormat
          value={investor_profile_net_worth_liquid?.formattedValue}
          prefix={'$'}
          thousandSeparator allowNegative={false}
          placeholder={'$'}
          className={styles.input}
          onValueChange={(values: NumberFormatValues) => {
            updateFields({
              //@ts-ignore
              investor_profile_net_worth_liquid: values
            });
          }}
        />
      </FloatingInput>
      <h2>What is your investment experience?</h2>
      <Dropdown list={expList} openDropdown={openExp} onClick={() => setOpenExp(!openExp)} setOpenDropdown={setOpenExp}>
        <div>{investor_profile_experience.name}</div>
      </Dropdown>
      <h2>What are your investment objectives?</h2>
      <Dropdown list={objList} openDropdown={openObj} onClick={() => setOpenObj(!openObj)} setOpenDropdown={setOpenObj}>
        <div>{investor_profile_objectives.name}</div>
      </Dropdown>
      <h2>What is your risk tolerance?</h2>
      <Dropdown list={toleranceList} openDropdown={openTolerance} onClick={() => setOpenTolerance(!openTolerance)} setOpenDropdown={setOpenTolerance}>
        <div>{investor_profile_risk_tolerance.name}</div>
      </Dropdown>
      <ButtonsGroup onBack={back}>
        <Button type={'button'} disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};
