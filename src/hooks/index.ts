import { useLocation } from 'react-router-dom';
import { routes } from 'utils/constants';
import { ReactElement, useEffect, useRef, useState } from 'react';

export const usePage = () => {
  const { pathname } = useLocation();
  const withHeader = (!pathname.includes(routes.signIn) && !pathname.includes(routes.getApp));
  const withFooter = (!pathname.includes(routes.signIn) && !pathname.includes(routes.getApp));
  const isSuccess = pathname.includes(routes.success);

  return {
    withHeader,
    withFooter,
    isSuccess
  };
};
export type IuseMultistepForm = ReactElement | null

export const useMultistepForm = (steps: IuseMultistepForm[]) => {
  const [currentStepIndex,setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex(prev => {
      if(prev >= steps.length - 1) return prev;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return prev + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex(prev => {
      if(prev <= 0) return prev;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return prev - 1;
    });
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goToStep,
    next,
    back,
    steps,
    isLastPage: currentStepIndex === steps.length - 1,
  };
};

export const useOutBoardingClick = (cb:any) => {
  const ref = useRef(null);

  const handleOutsideClick = (e:any) => {
    if(!e.path.includes(ref.current)) {
      cb();
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return { ref };
};