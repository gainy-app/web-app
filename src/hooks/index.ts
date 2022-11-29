import { useLocation } from 'react-router-dom';
import { routes } from 'utils/constants';
import { ReactElement, useState } from 'react';

export const usePage = () => {
  const { pathname } = useLocation();
  const withHeader = (!pathname.includes(routes.signIn) && !pathname.includes(routes.getApp));
  const withFooter = (!pathname.includes(routes.signIn) && !pathname.includes(routes.getApp));

  return {
    withHeader,
    withFooter
  };
};

export const useMultistepForm = (steps: any) => {
  const [currentStepIndex,setCurrentStepIndex] = useState(0);
  console.log(steps);
  const next = () => {
    setCurrentStepIndex(prev => {
      if(prev >= steps.length - 1) return prev;
      return prev + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex(prev => {
      if(prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };
  const isContinue = (
    currentStepIndex === 1 ||
    currentStepIndex === 2 ||
    currentStepIndex === 6 ||
    currentStepIndex === 10
  );

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goToStep,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastPage: currentStepIndex === steps.length - 1,
    isContinue,
    isControls: currentStepIndex >= 2,
  };
};