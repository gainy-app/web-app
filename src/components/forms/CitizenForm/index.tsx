import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenform.module.scss';
import React, { useEffect, useState } from 'react';
import { Button } from 'components';
import parse from 'html-react-parser';
import { useFormContext } from '../../../contexts/FormContext';
import { Dropdown } from '../../common/Dropdown';
import { logFirebaseEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../utils/constants';

interface citizenData {
  country: {
    placeholder: string
    flag: string
    prevValue?: string
    choices?: any
  }
}

type Props = citizenData & {
  updateFields: (fields: Partial<citizenData>) => void
}

export const CitizenForm = ({ updateFields, country }: Props) => {
  const { flags, next, onSendData, appId } = useFormContext();
  const { currentUser } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState('');
  const toggleVisiblePopUp = () => {

    setOpenDropdown(!openDropdown);
  };
  const whiteList = country?.prevValue === 'USA' || country.placeholder === 'USA';

  const { title,subtitle, description, notAvailable } = config(selectedCountry);
  const findCountryName = (countryValue: string) => country?.choices?.find((choicedCountry: any) => choicedCountry.value === countryValue).name;

  const onNextClick = () => {
    if(whiteList) {
      logFirebaseEvent('dw_kyc_ios_usa', currentUser, appId);
      onSendData();
      next();
    } else {
      logFirebaseEvent('dw_kyc_ios_none_usa', currentUser, appId, { code: country?.prevValue ? country?.prevValue : country?.placeholder });
      navigate(routes.notify);
    }
  };

  const listRender = country?.choices?.map((item: { name: string, value: string }, i: number) => {
    const selectedFlag = flags?.countries.find((flag: any) => flag.name === item.name)?.flag_w40_url;
    return <li onClick={() => {
      setSelectedCountry(item.name);
      updateFields({ country : { ...country,   placeholder: item.value,
        flag: selectedFlag,
        prevValue: item.value,
      }
      });
      localStorage.setItem('notify', item.name);
    }}
    className={`${styles.listItem}
      ${item?.name === country?.prevValue ? styles.activeCountry : ''}
     `}
    key={i.toString()}
    >
      <img src={selectedFlag} alt=""/>
      <span>{item?.name}</span>
    </li>;
  });

  useEffect(() => {
    logFirebaseEvent('dw_kyc_ios_s', currentUser, appId);
  }, []);


  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Dropdown
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        onClick={toggleVisiblePopUp}
        list={listRender}
        withPlaceholder={'country'}
        value={'1'}
      >
        <div className={styles.countryWrapper}>
          <img src={ country?.flag} alt={country?.prevValue}/>
          <div className={styles.selectedFlag}>{country?.prevValue ? findCountryName(country?.prevValue) : findCountryName(country.placeholder)}</div>
        </div>
      </Dropdown>
      <div className={styles.content}>
        {whiteList
          ? <p>{parse(description)}</p>
          : (
            <div>
              <p>{notAvailable.title}</p>
              <p>{notAvailable.subtitle}</p>
            </div>
          )}
        <Button type={'button'} onClick={onNextClick}>{whiteList ? 'Continue' : 'Notify me'}</Button>
      </div>
    </FormWrapper>
  );
};