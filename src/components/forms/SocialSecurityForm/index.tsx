import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import React, { useEffect, useState } from 'react';
import styles from './social.module.scss';
import { Button } from '../../common/Button';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { logFirebaseEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';
import { usePin } from '../../../hooks';

type Props =  {
  updateFields: (fields: any) => void
}


export const SocialSecurityForm = ({ updateFields }:Props) => {
  const { next, back, onSendData, data, appId } = useFormContext();
  const { currentUser } = useAuth();

  const { PIN_LENGTH,pin,onChange,onKeyDown,inputRefs } = usePin(9,0, 9, data, updateFields, 'socialSecurityNumber');

  const onNextClick = () => {
    logFirebaseEvent('dw_kyc_ssn_e', currentUser, appId);
    onSendData();
    next();
  };

  const [open, setOpen] = useState(true);

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
                value={pin[index]}
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