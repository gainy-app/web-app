import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button } from '../../common/Button';
import React, { useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Dropdown } from '../../common/Dropdown';
import styles from './investmentProfile.module.scss';

interface profileData {
  investor_profile_annual_income: {
    value: number
    name: string
  }
  investor_profile_net_worth_total: {
    value: number
    name: string
  }
  investor_profile_net_worth_liquid: {
    value: number
    name: string
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
  const { title,subtitle,income , networth, liquid } = config;
  const {  next, back , onSendData } = useFormContext();
  const [openExp,setOpenExp] = useState(false);
  const [openObj,setOpenObj] = useState(false);
  const [openTolerance,setOpenTolerance] = useState(false);
  const [openIncome,setOpenIncome] = useState(false);
  const [openNetWorth, setOpenNetWorth] = useState(false);
  const [openLiquid, setOpenLiquid] = useState(false);

  const onNextClick = () => {
    onSendData();
    next();
  };

  const disabled = !investor_profile_annual_income
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
    }
    key={choice.value}
    >{choice.name}</div>;
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
    }
    key={choice.value}
    >{choice.name}</div>;
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
    }
    key={choice.value}
    >{choice.name}</div>;
  });
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.investmentProfile}>
        <h2>What is your approximate annual income?</h2>
        <Dropdown
          withPlaceholder={'Annual Income'}
          openDropdown={openIncome}
          value={investor_profile_annual_income.name}
          onClick={() => setOpenIncome(!openIncome)}
          setOpenDropdown={setOpenIncome}
          list={income.map(i => {
            return <div
              key={i.value}
              onClick={() => {
                updateFields({
                  investor_profile_annual_income: {
                    name: i.name,
                    value: i.value
                  }
                });
              }
              }>{i.name}</div>;
          })} >
          <div>{investor_profile_annual_income.name}</div>
        </Dropdown>
        <h2>What is your total net worth?</h2>
        <p>Your assets minus your liabilities. Assets includes figures from checking, savings, liquid securities etc.</p>
        <Dropdown
          withPlaceholder={'Total net worth'}
          openDropdown={openNetWorth}
          value={investor_profile_net_worth_total.name}
          onClick={() => setOpenNetWorth(!openNetWorth)}
          setOpenDropdown={setOpenNetWorth}
          list={networth.map(i => {
            return <div
              key={i.value}
              onClick={() => {
                updateFields({
                  investor_profile_net_worth_total: {
                    name: i.name,
                    value: i.value
                  }
                });
              }
              }>{i.name}</div>;
          })} >
          <div>{investor_profile_net_worth_total.name}</div>
        </Dropdown>

        <h2>What is your liquid net worth?</h2>
        <p>{'the amount of money you\'ve got in cash  or cash equivalents after you deducted your liabilities from your liquid assets.'}</p>
        <Dropdown
          withPlaceholder={'liquid net worth'}
          openDropdown={openLiquid}
          value={investor_profile_net_worth_liquid.name}
          onClick={() => setOpenLiquid(!openLiquid)}
          setOpenDropdown={setOpenLiquid}
          list={liquid.map(i => {
            return <div
              key={i.value}
              onClick={() => {
                updateFields({
                  investor_profile_net_worth_liquid: {
                    name: i.name,
                    value: i.value
                  }
                });
              }
              }>{i.name}</div>;
          })} >
          <div>{investor_profile_net_worth_liquid.name}</div>
        </Dropdown>
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
      </div>
      <ButtonsGroup onBack={back}>
        <Button disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};
