import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenform.module.scss';
import React, {  useState } from 'react';
import { Button } from 'components';
import parse from 'html-react-parser';
import { useFormContext } from '../../../contexts/FormContext';
import { Dropdown } from '../../common/Dropdown';

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
  const { title,subtitle, description, notAvailable } = config;
  const { flags, next, onSendData } = useFormContext();

  const [openDropdown, setOpenDropdown] = useState(false);


  const toggleVisiblePopUp = () => {
    setOpenDropdown(!openDropdown);
  };

  const witheList = country?.prevValue === 'USA' || country?.prevValue === 'US';

  const onNextClick = () => {
    if(witheList) {
      onSendData();
      next();
    }
  };

  const GE = flags.countries.find((i:any) => i.alpha2 === 'DE');

  const listRender = country?.choices?.map((item: { name: string, value: string }, i: number) => {
    const selectedFlag = flags?.countries.find((flag: any) => flag.name === item.name)?.flag_w40_url;
    return <li onClick={() => {
      updateFields({ country : { ...country,   placeholder: country.placeholder,
        flag: selectedFlag,
        prevValue: item.value }
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
          <img src={witheList ? country?.flag: GE.flag_w40_url} alt={country?.prevValue}/>
          <div>{witheList ? country?.prevValue : GE.alpha3}</div>
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