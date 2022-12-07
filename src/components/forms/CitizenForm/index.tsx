import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Field } from '../../common/Field';
import styles from './citizenform.module.scss';
import React, {  useState } from 'react';
import { Button, Image } from 'components';
import { imageTypes } from 'utils/constants';
import { useOutBoardingClick } from 'hooks';
import parse from 'html-react-parser';
import { useFormContext } from '../../../contexts/FormContext';

interface citizenData {
  address_country: {
    placeholder: string
    flag: string
  }
}

type Props = citizenData & {
  updateFields: (fields: Partial<citizenData>) => void
}

export const CitizenForm = ({ updateFields, address_country }: Props) => {
  const { title,subtitle, description, notAvailable } = config;
  const { countries, next, sendKycFormRequest, appId } = useFormContext();

  const [openDropdown, setOpenDropdown] = useState(false);

  const { ref } = useOutBoardingClick(() => setOpenDropdown(false));

  const toggleVisiblePopUp = () => {
    setOpenDropdown(!openDropdown);
  };
  const witheList = address_country?.placeholder === 'USA' ||address_country?.placeholder === 'US';

  const onNextClick = () => {
    if(witheList) {
      sendKycFormRequest.sendKycForm({
        variables: {
          profile_id:  appId?.app_profiles[0].id,
          country: address_country.placeholder,
        },
      });
      next();
    }
  };

  const listRender = countries?.countries?.map((country: { name: string, alpha2: string, flag_w40_url: string }, i: number) => {
    return <li onClick={() => {
      updateFields({ address_country: {
        placeholder:  country?.alpha2,
        flag: country?.flag_w40_url
      } });
    }}
    className={`${styles.listItem} ${country?.alpha2 === address_country?.placeholder ? styles.activeCountry : ''}`}
    key={i.toString()}
    >
      <img src={country.flag_w40_url} className={styles.flag} alt=""/>
      <span>{country?.name}</span>
    </li>;
  });

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <label
        ref={ref}
        onClick={toggleVisiblePopUp}
      >
        <Field>
          <div className={styles.countryWrapper}>
            <img src={address_country?.flag} alt={address_country?.placeholder}/>
            <div>{address_country?.placeholder}</div>
          </div>
          <Image type={imageTypes.arrowDropdown} className={openDropdown ? styles.rotate : ''}/>
          <ul className={`${styles.dropdownInner} ${openDropdown ? styles.openDropdown : ''}`}>
            {listRender}
          </ul>
        </Field>
      </label>
      <div className={styles.content}>
        {address_country?.placeholder === 'USA' || address_country?.placeholder === 'US'
          ? <p>{parse(description)}</p>
          : <p>{notAvailable}</p>}
        <Button type={'button'} onClick={onNextClick}>{witheList ? 'Continue' : 'Notify me'}</Button>
      </div>
    </FormWrapper>
  );
};