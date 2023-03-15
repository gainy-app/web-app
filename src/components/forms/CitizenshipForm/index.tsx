import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import styles from './citizenshipform.module.scss';
import { Checkbox } from '../../common/Checkbox';
import { Field } from '../../common/Field';
import { Button } from '../../common/Button';
import { useEffect, useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Dropdown } from '../../common/Dropdown';
import { logFirebaseEvent, sendAmplitudeData, trackEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { Input } from 'components/common/Dropdown/Input';
import { ICitizenship } from 'models/citizenship';
import { IChoices } from 'models';
import { getFilteredList } from 'utils/helpers';

type Props = {
  updateFields: (fields: { citizenship: ICitizenship }) => void
  citizenship: ICitizenship
}

export const CitizenshipForm = ({ updateFields, citizenship }:Props) => {
  const { title,subtitle } = config;
  const {  next, back , onSendData, appId } = useFormContext();
  const { currentUser } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [list, setList] = useState<IChoices>([]);
  const [searchInput, setSearchInput] = useState(citizenship.prevValue?.name);

  const disable = citizenship.placeholder === 'USA' || !!citizenship.prevValue?.value;

  const toggleVisiblePopUp = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenDropdown(!openDropdown);
  };

  const onNextClick = () => {
    logFirebaseEvent('kyc_acc_citizenship_chose', currentUser, appId);
    sendAmplitudeData('kyc_acc_citizenship_chose');

    trackEvent('KYC_acc_citizenship_choose', currentUser?.uid);
    onSendData();
    next();
  };

  const listRender = list.map((item: { name: string, value: string }, i: number) => {
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
        setSearchInput(item.name);
      }
      }
      key={i.toString()}
    >
      <span>{item?.name}</span>
    </li>;
  });

  useEffect(() => {
    citizenship?.choices && setList(citizenship?.choices);
  }, [citizenship?.choices]);

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
              setOpenDropdown={setOpenDropdown}
              value={citizenship.prevValue?.name}>
              <Input
                value={searchInput}
                handleChangeInput={(value: string) => {
                  setOpenDropdown(true);
                  citizenship?.choices && setList(
                    getFilteredList({ data: citizenship?.choices, value })
                  );
                  setSearchInput(value);
                }}
              />
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