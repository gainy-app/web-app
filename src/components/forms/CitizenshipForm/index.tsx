import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenshipform.module.scss';
import { Checkbox } from '../../common/Checkbox';
import { Field } from '../../common/Field';
import { Button } from '../../common/Button';
import React, { useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Dropdown } from '../../common/Dropdown';

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
  const {  next, back , onSendData } = useFormContext();


  const [openDropdown, setOpenDropdown] = useState(false);
  const disable = citizenship.prevValue?.value !== 'USA' && !citizenship.prevValue?.name ;

  const toggleVisiblePopUp = () => {
    setOpenDropdown(!openDropdown);
  };

  const onNextClick = () => {
    onSendData();
    next();
  };
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

  const first = citizenship.prevValue?.value === 'USA';
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.formWrapper}>
        <label htmlFor={'test'}>
          <Field>
            <p>U.S. citizen</p>
            <Checkbox
              value={first}
              id={'test'}
              onChange={() => {
                updateFields({
                  citizenship: {
                    ...citizenship,
                    prevValue: {
                      name: 'USA',
                      value: 'USA'
                    }
                  }
                });
              }}
            />
          </Field>
        </label>
        <label htmlFor={'test1'}>
          <Field>
            <p>Not a U.S. citizen, but live here legaly</p>
            <Checkbox
              value={citizenship.prevValue?.value !== 'USA'}
              id={'test1'}
              onChange={() => {
                updateFields({
                  citizenship: {
                    ...citizenship,
                    prevValue : {
                      value: citizenship.prevValue?.value === 'USA' ? undefined : citizenship.prevValue?.value,
                      name: citizenship.prevValue?.value === 'USA' ? undefined : citizenship.prevValue?.value
                    },
                  }
                });
              }}
            />
          </Field>
        </label>
        {citizenship.prevValue?.value !== 'USA' && (
          <div>
            <p>Tell us a bit more about your citizenship status. How long have you lived in the U.S.?</p>
            <div>More than 5 years</div>
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
      <ButtonsGroup onBack={back}>
        <Button disabled={disable} type={'button'} onClick={onNextClick}>{'Continue'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};