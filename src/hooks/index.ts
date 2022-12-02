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
export type IuseMultistepForm = ReactElement | null

export const useMultistepForm = (steps: IuseMultistepForm[]) => {
  const [currentStepIndex,setCurrentStepIndex] = useState(0);
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
    currentStepIndex === 3 ||
    currentStepIndex === 7 ||
    currentStepIndex === 11
  );
  const isEditor = currentStepIndex !== 7 && currentStepIndex !== 11;
  const isPrivacy = currentStepIndex === 2 || currentStepIndex === steps.length - 2;

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
    isControls: currentStepIndex >= 2 && isEditor,
    isPrivacy,
  };
};