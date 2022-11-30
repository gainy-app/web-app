import { StepControl } from 'components';

interface Props {
  currentStepIndex: number
  goToStep: (step: number) => void
}
export const StepsControlForm = ({ currentStepIndex, goToStep }: Props) => {

  const steps = [
    { title: 'Create your account', step: 0, redirect: 1 },
    { title: 'Verify your identity', step: 7, redirect: 8 },
    { title: 'Create your account', step: 18, redirect: 12 },
  ];

  return (
    <div>
      {steps.map((step, i) => {
        return (
          <StepControl
            stepTitle={step.title}
            key={i.toString()}
            activeStep={currentStepIndex === step.step || currentStepIndex >= step.step}
            stepNumber={i + 1}
            onEdit={goToStep}
            step={step.redirect}
            withEdit={currentStepIndex > 0 && currentStepIndex > step.step || currentStepIndex === 18}
          />
        );
      })}
    </div>
  );
};