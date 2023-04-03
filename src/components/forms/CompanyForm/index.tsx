import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button } from '../../common/Button';
import styles from './company.module.scss';
import { useEffect, useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { FloatingInput } from '../../common/FloatingInput';
import { Dropdown } from '../../common/Dropdown';
import { IChoices } from 'models';
import { Input } from 'components/common/Dropdown/Input';
import { getFilteredList } from 'utils/helpers';
import { sendEvent } from 'utils/logEvent';
import { useAuth } from 'contexts/AuthContext';

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
  const { currentUser, appId } = useAuth();
  const [openPosition, setOpenPosition] = useState(false);
  const [employmentPositionList, setEmploymentPositionList] = useState<IChoices>([]);
  const [employmentTypeList, setEmploymentTypeList] = useState<IChoices>([]);
  const [searchTypeInput, setSearchTypeInput] = useState(employment_type.name);
  const [searchPositionInput, setSearchPositionInput] = useState(employment_position.name);

  const typeListRender = employmentTypeList.map((choice: {value: string, name: string}) => {
    return <li
      key={choice.value}
      onClick={() => {
        updateFields({
          employment_type: {
            ...employment_type,
            prevValue: choice.value,
            name: choice.name
          }
        });
        setSearchTypeInput(choice.name);
      }
      }>{choice.name}</li>;
  });

  const positionListRender = employmentPositionList.map((choice: {value: string, name: string}) => {
    return <li
      key={choice.value}
      onClick={() => {
        updateFields({
          employment_position: {
            ...employment_position,
            prevValue: choice.value,
            name: choice.name
          }
        });
        setSearchPositionInput(choice.name);
      }
      }>{choice.name}</li>;
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
    sendEvent('kyc_profile_empl_firm_done', currentUser?.uid, appId, {
      companyName,
      industry: searchTypeInput,
      jobTitle:  searchPositionInput
    });
  };

  useEffect(() => {
    employment_type.choices && setEmploymentTypeList(employment_type.choices);
  }, [employment_type.choices]);
  useEffect(() => {
    employment_position.choices && setEmploymentPositionList(employment_position.choices);
  }, [employment_position.choices]);

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
        <Dropdown list={typeListRender} openDropdown={openType} onClick={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleVisibleTypePopUp();
        }} setOpenDropdown={setOpenType}>
          <div className={searchTypeInput? styles.activeLabel : styles.label}>Industry</div>
          <Input
            value={searchTypeInput}
            handleChangeInput={(value: string) => {
              setOpenType(true);
              employment_type?.choices && setEmploymentTypeList(
                getFilteredList({ data: employment_position.choices, value })
              );
              setSearchTypeInput(value);
            }}
          />
        </Dropdown>
        <Dropdown list={positionListRender} openDropdown={openPosition} onClick={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleVisibleOpenPopUp();
        }} setOpenDropdown={setOpenPosition}>
          <div className={searchPositionInput ? styles.activeLabel : styles.label}>Your job title</div>
          <Input
            value={searchPositionInput}
            handleChangeInput={(value: string) => {
              setOpenPosition(true);
              employment_position?.choices && setEmploymentPositionList(
                getFilteredList({ data: employment_position.choices, value })
              );
              setSearchPositionInput(value);
            }}
          />
        </Dropdown>
      </div>

      <ButtonsGroup onBack={back} onNext={onNextClick} disableNext={disabled}>
        <Button type={'button'}  disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};