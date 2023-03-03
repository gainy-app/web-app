import { useLocation } from 'react-router-dom';
import { routes } from 'utils/constants';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

export const usePage = () => {
  const { pathname } = useLocation();
  const withHeader = (!pathname.includes(routes.signIn));
  const withFooter = (!pathname.includes(routes.signIn) && !pathname.includes(routes.getApp));
  const isSuccess = (pathname.includes(routes.success) && pathname.includes(routes.getApp));

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
    if(!e.path?.includes(ref.current)) {
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

const BACKSPACE_KEY = 'Backspace';

export const usePin = (max: number,min: number,length: number,data: any,updateFields: any ,field: string) => {
  const [pin, setPin] = useState<Array<number | undefined>>(
    data[field] ? data[field].split('') : new Array(length)
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const onPinChanged = (pinEntry: number | undefined, index: number) => {
    const newPin = [...pin];
    newPin[index] = pinEntry;
    setPin(newPin);
    updateFields({ [field]: newPin.join('') });
  };

  const resetValues = () => {
    setPin([]);
  };

  const changePinFocus = (pinIndex: number) => {
    const ref = inputRefs.current[pinIndex];
    if (ref) {
      ref.focus();
    }
  };
  const removeValuesFromArray = (valuesArray: string[], value: string) => {

    const valueIndex = valuesArray.findIndex(entry => entry === value);
    if(valueIndex === -1) {
      return;
    }
    valuesArray.splice(valueIndex, 1);
  };
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const previousValue = event.target.defaultValue;
    const valuesArray = event.target.value.split('');
    removeValuesFromArray(valuesArray, previousValue);
    const value = valuesArray.pop();
    if (!value) {
      return;
    }
    const pinNumber = Number(value.trim());
    if (isNaN(pinNumber) || value.length === 0) {
      return;
    }

    if (pinNumber >= min && pinNumber <= max) {
      onPinChanged(pinNumber, index);
      if (index < length - 1) {
        changePinFocus(index + 1);
      }
    }
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyboardKeyCode = event.nativeEvent.code;
    if (keyboardKeyCode !== BACKSPACE_KEY) {
      return;
    }

    if (pin[index] === undefined) {
      changePinFocus(index - 1);
    } else {
      onPinChanged(undefined, index);
    }
  };

  return {
    PIN_LENGTH: length,
    onKeyDown,
    inputRefs,
    pin,
    onChange,
    resetValues
  };
};