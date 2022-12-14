import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenform.module.scss';
import React, {  useState } from 'react';
import { Button } from 'components';
import parse from 'html-react-parser';
import { useFormContext } from '../../../contexts/FormContext';
import { Dropdown } from '../../common/Dropdown';
import { logFirebaseEvent } from '../../../utils/helpers';

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
  const { flags, next, onSendData } = useFormContext();
  const [openDropdown, setOpenDropdown] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const toggleVisiblePopUp = () => {

    setOpenDropdown(!openDropdown);
  };
  const witheList = country?.prevValue === 'USA' || country.placeholder === 'USA';

  const { title,subtitle, description, notAvailable } = config(selectedCountry);

  const onNextClick = () => {
    if(witheList) {
      logFirebaseEvent('dw_kyc_ios_none_usa', {
        country
      });
      onSendData();
      next();
    }
  };

  const listRender = country?.choices?.map((item: { name: string, value: string }, i: number) => {
    const selectedFlag = flags?.countries.find((flag: any) => flag.name === item.name)?.flag_w40_url;
    return <li onClick={() => {
      setSelectedCountry(item.name);
      updateFields({ country : { ...country,   placeholder: country.placeholder,
        flag: selectedFlag,
        prevValue: item.value
      }
      });
    }}
    className={`${styles.listItem}
      ${item?.name === country?.prevValue ? styles.activeCountry : ''}
     `}
    key={i.toString()}
    >
      <img src={selectedFlag} className={styles.flag} alt=""/>
      <span>{item?.name}</span>
    </li>;
  });

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Dropdown
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        onClick={toggleVisiblePopUp}
        list={listRender}
      >
        <div className={styles.countryWrapper}>
          <img src={ country?.flag} alt={country?.prevValue}/>
          <div>{country?.prevValue ? country?.prevValue : country.placeholder}</div>
        </div>
      </Dropdown>
      <div className={styles.content}>
        {witheList
          ? <p>{parse(description)}</p>
          : (
            <div>
              <p>{notAvailable.title}</p>
              <p>{notAvailable.subtitle}</p>
            </div>
          )}
        <Button type={'button'} onClick={onNextClick}>{witheList ? 'Continue' : 'Notify me'}</Button>
      </div>
    </FormWrapper>
  );
};