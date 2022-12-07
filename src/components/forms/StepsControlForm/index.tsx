import { Button, StepControl } from 'components';
import { FormWrapper } from '../FormWrapper';
import { useFormContext } from '../../../contexts/FormContext';
import styles from './stepcontrol.module.scss';
import React from 'react';

interface Props {
  currentStepIndex: number
  goToStep: (step: number) => void
}
export const StepsControlForm = ({ currentStepIndex, goToStep }: Props) => {
  const { isLastPage, next } = useFormContext();

  const steps = [
    { title: 'Create your account', step: 0, redirect: 1 },
    { title: 'Verify your identity', step: 7, redirect: 8 },
    { title: 'Your investor profile', step: 11, redirect: 12 },
  ];

  const buttonRender = () => {
    switch (true) {
      case currentStepIndex === 0:
        return (
          <Button type={'button'} onClick={next}>{'Start'}</Button>
        );
      case currentStepIndex === 7:
        return (
          <Button type={'button'} onClick={next}>{'Continue'}</Button>
        );
      case currentStepIndex === 11:
        return (
          <Button type={'button'} onClick={next}>{'Continue'}</Button>
        );
      case isLastPage:
        return (
          <Button type={'button'} onClick={next}>{'Done ! Open my account'}</Button>
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
      <div className={styles.button}>
        {buttonRender()}
      </div>
    </FormWrapper>
  );
};