import { Button, Image, Loader, StepControl } from 'components';
import { FormWrapper } from '../FormWrapper';
import { useFormContext } from '../../../contexts/FormContext';
import styles from './stepcontrol.module.scss';
import { useEffect, useState } from 'react';
import { config } from './config';
import { imageTypes, routes } from '../../../utils/constants';
import { useMutation } from '@apollo/client';
import { KYC_SEND_FORM } from '../../../services/gql/queries';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { logFirebaseEvent, trackEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

interface Props {
  currentStepIndex: number
  goToStep: (step: number) => void
}
export const StepsControlForm = ({ currentStepIndex, goToStep }: Props) => {
  const { isLastPage, next, onSendData, data, appId } = useFormContext();
  const { currentUser } = useAuth();
  const [checked, setChecked] = useState(true);
  const [sendFormFinale, { error }] = useMutation(KYC_SEND_FORM);
  const navigate = useNavigate();
  const { titleWithLink, subtitleWithLink } = config;

  const createAccountEdit = !!data.country?.prevValue || !!data.phone;

  const verifyIdentityEdit = !!data.addressLine;

  const investProfileEdit = !!data.investor_profile_annual_income.value;

  const steps = [
    { title: 'Create your account',
      step: 0, redirect: 1,
      edit:  createAccountEdit
    },
    { title: 'Verify your identity',
      step: 7, redirect: 8,
      edit: verifyIdentityEdit
    },
    { title: 'Your investor profile',
      step: 11, redirect: 12,
      edit: investProfileEdit
    },
  ];
  const buttonRender = () => {
    switch (true) {
      case currentStepIndex === 0:
        return (
          <Button onClick={() => {
            trackEvent('KYC_what_now_create_acc_start', currentUser?.uid);
            next();
          }}>{'Start'}</Button>
        );
      case currentStepIndex === 7:
        return (
          <Button onClick={() => {
            trackEvent('KYC_what_now_verify_continue', currentUser?.uid);
            next();
          }}>{'Continue'}</Button>
        );
      case currentStepIndex === 11:
        return (
          <Button onClick={() => {
            trackEvent('KYC_what_now_profile_continue', currentUser?.uid);
            next();
          }}>{'Continue'}</Button>
        );
      case isLastPage:
        return (
          <Button type={'button'}
            disabled={!checked}
            onClick={() => {
              if(checked) {
                onSendData();
                sendFormFinale({
                  variables: {
                    profile_id: appId
                  }
                }).then((res) => {
                  if(res.data.kyc_send_form.status) {
                    localStorage.setItem('status', res.data.kyc_send_form.status);
                    const status = localStorage.getItem('status');
                    if(status === res.data.kyc_send_form.status) {
                      logFirebaseEvent('dw_kyc_main_sumbitted', currentUser, appId);
                      trackEvent('KYC_done_open_account', currentUser?.uid);
                      navigate(routes.success);
                    }
                  }
                });
              }
            }}>{'Done! Open my account'}</Button>
        );
    }
  };

  useEffect(() => {
    if(!createAccountEdit && !verifyIdentityEdit && !investProfileEdit) {
      logFirebaseEvent('dw_kyc_main_state_change', currentUser, appId, { type: 0 });
    }
    if(createAccountEdit && !verifyIdentityEdit && !investProfileEdit) {
      logFirebaseEvent('dw_kyc_main_state_change', currentUser, appId, { type: 1 });
    }
    if (createAccountEdit && verifyIdentityEdit && !investProfileEdit) {
      logFirebaseEvent('dw_kyc_main_state_change', currentUser, appId, { type: 2 });
    }
    if (createAccountEdit && verifyIdentityEdit && investProfileEdit) {
      logFirebaseEvent('dw_kyc_main_state_change', currentUser, appId, { type: 3 });
    }

  }, [createAccountEdit,verifyIdentityEdit,investProfileEdit, data]);

  return (
    <FormWrapper title={'What now?'} subtitle={'On the next few screens we\'ll ask you some questions about your ID, employment status and so on. We\'re required to get this information by law.'}>
      {steps.map((step, i) => {
        return appId ? (
          <StepControl
            stepTitle={step.title}
            key={i.toString()}
            activeStep={step.edit || (!!i && !step.edit && a[i - 1].edit)}
            stepNumber={i + 1}
            onEdit={() => {
              if(i === 0) {
                logFirebaseEvent('dw_kyc_main_create', currentUser, appId);
              } else if (i === 1) {
                logFirebaseEvent('dw_kyc_main_verify', currentUser, appId);
              } else if (i === 2) {
                logFirebaseEvent('dw_kyc_main_investor', currentUser, appId);
              }
            }}
            goToStep={goToStep}
            step={step.redirect}
            withEdit={step.edit}
          />
        ) : <Loader/>;
      })}
      {isLastPage && (
        <div className={styles.acceptTerms}>
          <h2>Accept Terms & Conditions</h2>
          <p>By tapping Open my account, you are opening a new Individual Investment Account.</p>
          <p>{parse(titleWithLink)}</p>
          <ul className={styles.list}>
            <li>open a brokerage account with DriveWealth </li>
            <li>receive account-related communication electronically</li>
            <li>appoint Gainy as your Investment Advisor with limited discretion to buy and sell securities on your behalf</li>
            <li>resolve disputes with us through arbitration</li>
          </ul>
          <p>{parse(subtitleWithLink)}</p>
          <label htmlFor="agree" className={styles.checkboxLabel}>
            <div className={`${styles.checkbox} ${checked ? styles.activeCheckbox : ''}`}>
              {checked && <Image type={imageTypes.checkbox}/>}
            </div>
            <input
              type="checkbox"
              id="agree"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            I acknowledge and agree to the above
          </label>
        </div>
      )}
      <div className={styles.button}>
        {buttonRender()}
        {error?.message && (
          <p className={styles.error}>Something wrong</p>
        )}
      </div>
    </FormWrapper>
  );
};