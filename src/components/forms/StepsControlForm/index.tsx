import { StepControl } from 'components';

interface Props {
  currentStepIndex: number
}
export const StepsControlForm = ({ currentStepIndex }: Props) => {

  const steps = [
    { title: 'Create your account', step: 0 },
    { title: 'Verify your identity', step: 6 },
    { title: 'Create your account', step: 10 },
  ];

  return (
    <div>
      {steps.map((step, i) => {
        return (
          <StepControl
            stepTitle={step.title}
            key={i.toString()}
            activeStep={currentStepIndex === step.step}
            stepNumber={i + 1}
            withEdit={currentStepIndex > 0}
          />
        );
      })}
    </div>
  );
};