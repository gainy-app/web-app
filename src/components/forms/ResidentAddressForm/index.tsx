import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { FloatingInput } from '../../common/FloatingInput';
import styles from './residentaddress.module.scss';
import React, { useEffect, useState } from 'react';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Dropdown } from '../../common/Dropdown';
import { useLazyQuery } from '@apollo/client';
import { VALIDATE_ADDRESS } from '../../../services/gql/queries';
import { getFilteredList, parseGQLerror } from '../../../utils/helpers';
import { logFirebaseEvent, trackEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { Input } from 'components/common/Dropdown/Input';
import { IChoices } from 'models';

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
  const { next, back ,onSendData, data, appId } = useFormContext();
  const { currentUser } = useAuth();
  const [statesOpen, setStatesOpen] = useState(false);
  const [getValidation, {  error: validationError }] = useLazyQuery(VALIDATE_ADDRESS);
  const [stateList, setStateList] = useState<IChoices>([]);
  const [searchStateInput, setStateSearchInput] = useState(state?.prevValue || 'State');

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
    }).then(res => {
      if(!res.error) {
        logFirebaseEvent('dw_kyc_res_addr_e', currentUser, appId);
        trackEvent('KYC_identify_address_input', currentUser?.uid);
        onSendData();
        next();
      }
    });
  };

  const statesListRender = stateList.map((choice: {value: string, name: string}) => {
    return (
      <li
        onClick={() => {
          updateFields({
            state: {
              ...state,
              prevValue: choice.value
            }
          });
          setStateSearchInput(choice.name);
        }
        }
        key={choice.value}
      >
        <div>{choice.name}</div>
      </li>
    );
  });
  const disabled = !addressLine || !city || !state?.prevValue || zipcode?.length !== 5;
  useEffect(() => {
    logFirebaseEvent('dw_kyc_res_addr_s', currentUser, appId);
  }, []);

  useEffect(() => {
    state?.choices && setStateList(state?.choices);
  }, [state?.choices]);

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
            list={statesListRender}
            openDropdown={statesOpen}
            active={!!state?.prevValue}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              e.preventDefault();
              setStatesOpen(!statesOpen);
            }}
            setOpenDropdown={setStatesOpen}>
            <Input
              value={searchStateInput}
              inActive={!state?.prevValue}
              handleChangeInput={(value: string) => {
                setStatesOpen(true);
                state?.choices && setStateList(
                  getFilteredList({ data: state?.choices, value })
                );
                setStateSearchInput(value);
              }}
            />
            {/* <div>
              {state?.prevValue ? state?.prevValue : <span style={{ color: '#b1bdc8' }}>State</span> }
            </div> */}
          </Dropdown>
        </div>
        <FloatingInput
          id={'Zip Code'}
          placeholder={' '}
          label={'Zip Code'}
          onChange={(e) => {
            const limit = 5;
            const val = e.target.value.split('')?.map(Number)?.filter((i:number) => !isNaN(i))?.join('');

            updateFields({ zipcode: val?.toString().slice(0, limit) });
          }}
          type={'number'}
          value={zipcode?.toString()}
        />
      </div>
      {
        parseGQLerror(validationError) && (
          <p className={styles.error}>{parseGQLerror(validationError)}</p>
        )
      }

      <ButtonsGroup onBack={back} onNext={onNextClick} disableNext={disabled}>
        <Button type={'button'} disabled={disabled} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};