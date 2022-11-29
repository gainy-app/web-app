import { StepControl } from 'components';

export const StepsControl = () => {

  const steps = [
    'Create your account',
    'Verify your identity',
    'Your investor profile'
  ];

  return (
    <div>
      {steps.map((step, i) => {
        return (
          <StepControl stepTitle={step} key={i.toString()} stepNumber={i + 1}/>
        );
      })}
    </div>
  );
};