import { StepControl } from 'components';
import { FormWrapper } from '../FormWrapper';
import { useFormContext } from '../../../contexts/FormContext';

interface Props {
  currentStepIndex: number
  goToStep: (step: number) => void
}
export const StepsControlForm = ({ currentStepIndex, goToStep }: Props) => {
  const { isLastPage,  } = useFormContext();

  const steps = [
    { title: 'Create your account', step: 0, redirect: 1 },
    { title: 'Verify your identity', step: 7, redirect: 8 },
    { title: 'Your investor profile', step: 11, redirect: 12 },
  ];

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
    </FormWrapper>
  );
};