import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { FloatingInput } from '../../common/FloatingInput';
import styles from './residentaddress.module.scss';
import React from 'react';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface residentData {
  addressLine: string
  addressLine2: string
  city: string
  state: string
  zipcode: string
}

type Props = residentData & {
  updateFields: (fields: Partial<residentData>) => void
}

export const ResidentAddressForm = ({ updateFields, addressLine, addressLine2, city, state, zipcode }:Props) => {
  const { title,subtitle } = config;
  const { next, back, sendKycFormRequest, appId , data } = useFormContext();

  const onNextClick = () => {
    sendKycFormRequest.sendKycForm({
      variables: {
        profile_id:  appId?.app_profiles[0].id,
        country: data?.address_country?.placeholder,
        citizenship: data.citizenship ? 'US' : 'any',
        email_address: data.email_address.placeholder,
        phone_number: data.phone,
        last_name: data.last_name,
        birthdate: data.birthday,
        first_name: data.first_name,
        address_street1: addressLine,
        address_street2: addressLine2,
        address_city: city,
        address_postal_code: zipcode
      },
    });
    next();
  };

  const disabled = !addressLine || !city || !state || !zipcode;
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.residentFormWrapper}>
        <FloatingInput
          id={'addressLine'}
          placeholder={' '}
          label={'Address line 1'}
          onChange={(e) => {
            updateFields({ addressLine: e.target.value });
          }}
          value={addressLine}
        />
        <FloatingInput
          id={'addressLine2'}
          placeholder={' '}
          label={'Address line 2 (optional)'}
          onChange={(e) => {
            updateFields({ addressLine2: e.target.value });
          }}
          value={addressLine2}
        />
        <div className={styles.cityWithState}>
          <FloatingInput
            id={'City'}
            placeholder={' '}
            label={'City'}
            onChange={(e) => {
              updateFields({ city: e.target.value });
            }}
            value={city}
          />
          <FloatingInput
            id={'State'}
            placeholder={' '}
            label={'State'}
            onChange={(e) => {
              updateFields({ state: e.target.value });
            }}
            value={state}
          />
        </div>
        <FloatingInput
          id={'Zip Code'}
          placeholder={' '}
          label={'Zip Code'}
          onChange={(e) => {
            updateFields({ zipcode: e.target.value });
          }}
          value={zipcode}
        />
      </div>
      <ButtonsGroup onBack={back}>
        <Button type={'button'} disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};