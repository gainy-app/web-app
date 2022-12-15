import { Button, Image, StepControl } from 'components';
import { FormWrapper } from '../FormWrapper';
import { useFormContext } from '../../../contexts/FormContext';
import styles from './stepcontrol.module.scss';
import React, { useState } from 'react';
import { config } from './config';
import { imageTypes, routes } from '../../../utils/constants';
import { useMutation } from '@apollo/client';
import { KYC_SEND_FORM } from '../../../services/gql/queries';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

interface Props {
  currentStepIndex: number
  goToStep: (step: number) => void
}
export const StepsControlForm = ({ currentStepIndex, goToStep }: Props) => {
  const { isLastPage, next, onSendData, data, updateFields, appId } = useFormContext();
  const [checked, setChecked] = useState(false);
  const [sendFormFinale] = useMutation(KYC_SEND_FORM);
  const navigate = useNavigate();
  const status = localStorage.getItem('status');
  const { titleWithLink, subtitleWithLink } = config;

  const steps = [
    { title: 'Create your account', step: 0, redirect: 1 },
    { title: 'Verify your identity', step: 7, redirect: 8 },
    { title: 'Your investor profile', step: 11, redirect: 12 },
  ];

  const buttonRender = () => {
    switch (true) {
      case currentStepIndex === 0:
        return (
          <Button onClick={() => {
            console.log(status, 'navifator');
            if(status) {
              localStorage.removeItem('status');
              navigate(routes.success);
            }
            next();
          }}>{'Start'}</Button>
        );
      case currentStepIndex === 7:
        return (
          <Button onClick={next}>{'Continue'}</Button>
        );
      case currentStepIndex === 11:
        return (
          <Button onClick={next}>{'Continue'}</Button>
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
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    const status = localStorage.getItem('status');
                    if(status === res.data.kyc_send_form.status) {
                      navigate(routes.success);
                    }
                  }
                });
              }
            }}>{'Done ! Open my account'}</Button>
        );
    }
  };

  return (
    <FormWrapper title={'What now?'} subtitle={'On the next few screens we\'ll ask you some questions about your ID, employment status and so on. We\'re required to get this information by law.'}>
      {steps.map((step, i) => {
        return (
          <StepControl
            stepTitle={step.title}
            key={i.toString()}
            activeStep={currentStepIndex >= step.step}
            stepNumber={i + 1}
            onEdit={goToStep}
            step={step.redirect}
            withEdit={currentStepIndex > 0 && currentStepIndex > step.step || isLastPage}
          />
        );
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
                updateFields({
                  disclosures_drivewealth_customer_agreement: true,
                  disclosures_drivewealth_terms_of_use: true,
                  disclosures_drivewealth_ira_agreement: true,
                  disclosures_drivewealth_market_data_agreement: true,
                  disclosures_drivewealth_privacy_policy: true,
                  disclosures_rule14b: true,
                  disclosures_signed_by: data.last_name.prevValue ? data.last_name.prevValue : data.last_name.placeholder
                });
              }}
            />
            I acknowledge and agree to the above
          </label>
        </div>
      )}
      <div className={styles.button}>
        {buttonRender()}
      </div>
    </FormWrapper>
  );
};