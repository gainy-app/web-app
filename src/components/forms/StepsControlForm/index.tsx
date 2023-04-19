import { Button, Image, Loader, StepControl } from 'components';
import { FormWrapper } from '../FormWrapper';
import { useFormContext } from '../../../contexts/FormContext';
import styles from './stepcontrol.module.scss';
import { useState } from 'react';
import { config } from './config';
import { imageTypes, routes } from '../../../utils/constants';
import { useMutation } from '@apollo/client';
import { KYC_SEND_FORM } from '../../../services/gql/queries';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { sendEvent, sendGoogleDataLayerEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

interface Props {
  currentStepIndex: number
  goToStep: (step: number) => void
}
export const StepsControlForm = ({ currentStepIndex, goToStep }: Props) => {
  const { isLastPage, next, onSendData, data } = useFormContext();
  const { currentUser, appId } = useAuth();
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
      case (createAccountEdit && verifyIdentityEdit && investProfileEdit) || isLastPage:
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
                      sendGoogleDataLayerEvent('KYC_done_open_account', currentUser?.uid);
                      sendEvent('kyc_open_account_done', currentUser?.uid, appId, {
                        error: ''
                      });
                      navigate(routes.success);
                    } else {
                      sendEvent('kyc_open_account_done', currentUser?.uid, appId, {
                        error: 'failed to open account'
                      });
                    }
                  }
                }).catch((err) => {
                  sendEvent('kyc_open_account_done', currentUser?.uid, appId, {
                    error: err || 'failed to open account'
                  });
                });
              }
            }}>{'Done! Open my account'}</Button>
        );
      case currentStepIndex === 0:
        return (
          <Button onClick={() => {
            sendGoogleDataLayerEvent('KYC_what_now_create_acc_start', currentUser?.uid);
            next();
          }}>{'Start'}</Button>
        );
      case currentStepIndex === 7 :
        return (
          <Button onClick={() => {
            sendGoogleDataLayerEvent('KYC_what_now_verify_continue', currentUser?.uid);
            next();
          }}>{'Continue'}</Button>
        );
      case currentStepIndex === 1:
        return (
          <Button onClick={() => {
            sendGoogleDataLayerEvent('KYC_what_now_profile_continue', currentUser?.uid);
            next();
          }}>{'Continue'}</Button>
        );

    }
  };

  return (
    <FormWrapper title={'What now?'} subtitle={'On the next few screens we\'ll ask you some questions about your ID, employment status and so on. We\'re required to get this information by law.'}>
      {steps.map((step, i) => (
        appId ? (
          <StepControl
            stepTitle={step.title}
            key={i.toString()}
            activeStep={step.step <= currentStepIndex || step.edit}
            stepNumber={i + 1}
            goToStep={goToStep}
            step={step.redirect}
            withEdit={step.edit}
          />
        ) : <Loader/>
      ))}
      {((createAccountEdit && verifyIdentityEdit && investProfileEdit) || isLastPage) && (
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