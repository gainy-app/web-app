import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import React, { useEffect, useRef, useState } from 'react';
import styles from './social.module.scss';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { logFirebaseEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

const PIN_LENGTH = 9;

type Props =  {
  updateFields: (fields: any) => void
}

const PIN_MIN_VALUE = 0;
const PIN_MAX_VALUE = 9;
const BACKSPACE_KEY = 'Backspace';

export const SocialSecurityForm = ({ updateFields }:Props) => {
  const { next, back, onSendData, data, appId } = useFormContext();
  const { currentUser } = useAuth();

  const onNextClick = () => {
    logFirebaseEvent('dw_kyc_ssn_e', currentUser, appId);
    onSendData();
    next();
  };

  const [pin, setPin] = useState<Array<number | undefined>>(
    data.socialSecurityNumber ? data.socialSecurityNumber.split('') : new Array(PIN_LENGTH)
  );

  const [open, setOpen] = useState(true);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const onPinChanged = (pinEntry: number | undefined, index: number) => {
    const newPin = [...pin];
    newPin[index] = pinEntry;
    setPin(newPin);
    updateFields({ socialSecurityNumber: newPin.join('') });
  };

  const changePinFocus = (pinIndex: number) => {
    const ref = inputRefs.current[pinIndex];
    if (ref) {
      ref.focus();
    }
  };

  const removeValuesFromArray = (valuesArray: string[], value: string) => {

    const valueIndex = valuesArray.findIndex(entry => entry === value);
    if(valueIndex === -1) {
      return;
    }
    valuesArray.splice(valueIndex, 1);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const previousValue = event.target.defaultValue;
    const valuesArray = event.target.value.split('');
    removeValuesFromArray(valuesArray, previousValue);
    const value = valuesArray.pop();
    if (!value) {
      return;
    }
    const pinNumber = Number(value.trim());
    if (isNaN(pinNumber) || value.length === 0) {
      return;
    }

    if (pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
      onPinChanged(pinNumber, index);
      if (index < PIN_LENGTH - 1) {
        changePinFocus(index + 1);
      }
    }
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyboardKeyCode = event.nativeEvent.code;
    if (keyboardKeyCode !== BACKSPACE_KEY) {
      return;
    }

    if (pin[index] === undefined) {
      changePinFocus(index - 1);
    } else {
      onPinChanged(undefined, index);
    }
  };

  const { title,subtitle } = config;
  useEffect(() => {
    logFirebaseEvent('dw_kyc_ssn_s', currentUser, appId);
  }, []);

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <label className={styles.pinInputLabel} htmlFor={'first'}>
        <div className={styles.pinInputWrapper}>
          <div className={styles.pinInput}>
            {Array.from({ length: PIN_LENGTH }, (_, index) => (
              <input
                id={index === 0 ? 'first' : ''}
                placeholder={'*'}
                onKeyDown={(event) => onKeyDown(event, index)}
                key={index}
                type={open ? 'password' : 'text'}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                onChange={(event) => onChange(event, index)}
                value={pin[index] || ''}
              />
            ))}
          </div>
          <span onClick={() => setOpen(!open)} className={styles.pinInputShow}>{open ? 'Show': 'Hide'}</span>
        </div>
      </label>
      <ButtonsGroup onBack={back} onNext={onNextClick} disableNext={pin.filter(Boolean).length < 9}>
        <Button onClick={onNextClick} disabled={pin.filter(Boolean).length < 9}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};