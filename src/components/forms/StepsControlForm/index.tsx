import { StepControl } from 'components';

interface Props {
  currentStepIndex: number
  goToStep: (step: number) => void
}
export const StepsControlForm = ({ currentStepIndex, goToStep }: Props) => {

  const steps = [
    { title: 'Create your account', step: 0, redirect: 1 },
    { title: 'Verify your identity', step: 6, redirect: 7 },
    { title: 'Create your account', step: 10, redirect: 11 },
  ];

  return (
    <div>
      {steps.map((step, i, array) => {
        return (
          <StepControl
            stepTitle={step.title}
            key={i.toString()}
            activeStep={currentStepIndex === step.step || currentStepIndex >= step.step}
            stepNumber={i + 1}
            onEdit={goToStep}
            step={step.redirect}
            withEdit={currentStepIndex > 0 && currentStepIndex > step.step}
          />
        );
      })}
    </div>
  );
};