import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenform.module.scss';
import React, { useEffect, useState } from 'react';
import { Button } from 'components';
import parse from 'html-react-parser';
import { useFormContext } from '../../../contexts/FormContext';
import { Dropdown } from '../../common/Dropdown';
import { logFirebaseEvent, trackEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../utils/constants';
import { Input } from 'components/common/Dropdown/Input';
import { IChoices } from 'models';
import { getFilteredList } from 'utils/helpers';

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
  const findCountryName = (countryValue: string) => country?.choices?.find((choicedCountry: any) => choicedCountry.value === countryValue).name;
  const [searchInput, setSearchInput] = useState(country?.prevValue ? findCountryName(country?.prevValue) : findCountryName(country.placeholder));
  const [list, setList] = useState<IChoices>([]);
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState('');
  const toggleVisiblePopUp = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenDropdown(!openDropdown);
  };
  const whiteList = country?.prevValue === 'USA' || country.placeholder === 'USA';

  const { title,subtitle, description, notAvailable } = config(selectedCountry);

  const onNextClick = () => {
    if(whiteList) {
      logFirebaseEvent('dw_kyc_ios_usa', currentUser, appId);
      trackEvent('KYC_acc_choose_country_based', currentUser?.uid, { 'text_button' : 'Continue' });
      onSendData();
      next();
    } else {
      logFirebaseEvent('dw_kyc_ios_none_usa', currentUser, appId, { code: country?.prevValue ? country?.prevValue : country?.placeholder });
      trackEvent('KYC_acc_choose_country_based', currentUser?.uid, { 'text_button' : 'Notify me' });
      navigate(routes.notify);
    }
  };
  const listRender = list.map((item: { name: string, value: string }, i: number) => {
    const selectedFlag = flags?.countries.find((flag: any) => flag.alpha3 === item.value)?.flag_w40_url;
    return <li onClick={() => {
      setSelectedCountry(item.name);
      updateFields({
        country: {
          ...country, placeholder: item.value,
          flag: selectedFlag,
          prevValue: item.value,
        }
      });
      localStorage.setItem('notify', item.name);
      setSearchInput(item.name);
    }}
    className={`${styles.listItem}
        ${item?.name === country?.prevValue ? styles.activeCountry : ''}
      `}
    key={i.toString()}
    >
      <img src={selectedFlag} alt="" />
      <span>{item?.name}</span>
    </li>;
  });

  useEffect(() => {
    logFirebaseEvent('dw_kyc_ios_s', currentUser, appId);
  }, []);

  useEffect(() => {
    country?.choices && setList(country?.choices);
  }, [country?.choices]);

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
          <Input
            value={searchInput}
            handleChangeInput={(value: string) => {
              setOpenDropdown(true);
              country?.choices && setList(
                getFilteredList({ data: country?.choices, value })
              );
              setSearchInput(value);
            }}
          />
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