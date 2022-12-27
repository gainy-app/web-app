import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenshipform.module.scss';
import { Checkbox } from '../../common/Checkbox';
import { Field } from '../../common/Field';
import { Button } from '../../common/Button';
import React, { useEffect, useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Dropdown } from '../../common/Dropdown';
import { logFirebaseEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

interface citizenData {
  citizenship: {
    placeholder?: string
    prevValue?: {
      name?:string
      value?:string
    }
    choices?: any
  }
}

type Props = citizenData & {
  updateFields: (fields: Partial<citizenData>) => void
}

export const CitizenshipForm = ({ updateFields, citizenship }:Props) => {
  const { title,subtitle } = config;
  const {  next, back , onSendData, appId } = useFormContext();
  const { currentUser } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(false);
  const disable = citizenship.placeholder === 'USA' || !!citizenship.prevValue?.value;

  const toggleVisiblePopUp = () => {
    setOpenDropdown(!openDropdown);
  };

  const onNextClick = () => {
    if(citizenship.placeholder === 'USA') {
      logFirebaseEvent('dw_kyc_citz_usa', currentUser, appId);
    } else {
      logFirebaseEvent('dw_kyc_citz_non_usa', currentUser, appId);
    }

    onSendData();
    next();
  };
  useEffect(() => {
    logFirebaseEvent('dw_kyc_citz_s', currentUser, appId);
  }, []);
  const listRender = citizenship?.choices?.map((item: { name: string, value: string }, i: number) => {
    return <li
      onClick={() => {
        updateFields({
          citizenship: {
            ...citizenship,
            prevValue : {
              value:  item.value,
              name: item.name
            },
          }
        });
      }
      }
      key={i.toString()}
    >
      <span>{item?.name}</span>
    </li>;
  });

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.formWrapper}>
        <label htmlFor={'test'}>
          <Field>
            <p>U.S. citizen</p>
            <Checkbox
              value={citizenship.placeholder === 'USA'}
              id={'test'}
              onChange={() => {
                updateFields({
                  citizenship: {
                    ...citizenship,
                    placeholder: 'USA',
                    prevValue: {
                      value: '',
                      name: ''
                    }
                  }
                });
              }}
            />
          </Field>
        </label>
        <label htmlFor={'test1'}>
          <Field>
            <p>Not a U.S. citizen, but live here legally</p>
            <Checkbox
              value={citizenship.placeholder !== 'USA'}
              id={'test1'}
              onChange={() => {
                updateFields({
                  citizenship: {
                    ...citizenship,
                    placeholder: citizenship.prevValue?.value === 'USA' ? '' : citizenship.prevValue?.value,
                    prevValue : {
                      value: citizenship.prevValue?.value ? '' : citizenship.prevValue?.value,
                      name: citizenship.prevValue?.name ? '' : citizenship.prevValue?.name
                    },
                  }
                });
              }}
            />
          </Field>
        </label>
        {citizenship.placeholder !== 'USA' && (
          <div>
            <p>Which country are you a citizen of?</p>
            <Dropdown
              list={listRender}
              openDropdown={openDropdown}
              onClick={toggleVisiblePopUp}
              setOpenDropdown={setOpenDropdown}>
              <div>{citizenship.prevValue?.name}</div>
            </Dropdown>
          </div>
        )}
      </div>
      <ButtonsGroup onBack={back} disableNext={!disable} onNext={onNextClick}>
        <Button disabled={!disable} type={'button'} onClick={onNextClick}>{'Continue'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};