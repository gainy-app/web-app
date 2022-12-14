import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { FloatingInput } from '../../common/FloatingInput';
import styles from './residentaddress.module.scss';
import React, { useState } from 'react';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Dropdown } from '../../common/Dropdown';
import { useLazyQuery } from '@apollo/client';
import { VALIDATE_ADDRESS } from '../../../services/gql/queries';
import { parseGQLerror } from '../../../utils/helpers';

interface residentData {
  addressLine: string
  addressLine2: string
  city: string
  state: {
    choices: any
    prevValue: string
  }
  zipcode: string
}

type Props = residentData & {
  updateFields: (fields: Partial<residentData>) => void
}

export const ResidentAddressForm = ({ updateFields, addressLine, addressLine2, city, state, zipcode }:Props) => {
  const { title,subtitle } = config;
  const { next, back ,onSendData, data } = useFormContext();
  const [statesOpen, setStatesOpen] = useState(false);
  const [getValidation, {  error: validationError , called }] = useLazyQuery(VALIDATE_ADDRESS);

  const onNextClick = () => {
    getValidation({
      variables: {
        street1: addressLine,
        street2: addressLine2,
        city: city,
        province: state?.prevValue,
        postal_code: zipcode,
        country: data.country.prevValue ? data.country.prevValue : data.country.placeholder,
      }
    });
    if(!validationError  && called) {
      onSendData();
      next();
    }
  };

  const statesList = state.choices.map((choice: {value: string, name: string}) => {
    return (
      <li
        onClick={() => {
          updateFields({
            state: {
              ...state,
              prevValue: choice.value
            }
          });
        }
        }
        key={choice.value}
      >
        <div>{choice.name}</div>
      </li>
    );
  });

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
          <Dropdown
            list={statesList}
            openDropdown={statesOpen}
            onClick={() => setStatesOpen(!statesOpen)}
            setOpenDropdown={setStatesOpen}>
            <div>
              {state?.prevValue || 'State'}
            </div>
          </Dropdown>
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
      <p style={{ color: 'red' }}>{parseGQLerror(validationError)}</p>
      <ButtonsGroup onBack={back}>
        <Button type={'button'} disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};