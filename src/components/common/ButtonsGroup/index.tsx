import { Image } from '../Image';
import { imageTypes } from 'utils/constants';
import React from 'react';
import styles from './buttonsgroup.module.scss';

interface Props {
  children: any
  onBack: () => void
  onNext?: () => void
  disableNext?: boolean
}

export const ButtonsGroup = ({ children, onBack, onNext, disableNext }: Props) => {
  return (
    <div className={styles.buttons}>
      {children}
      <div className={styles.arrowWrapper}>
        <div
          className={styles.arrow}
          onClick={onBack}
        ><Image type={imageTypes.arrow}/></div>
        <button className={styles.arrowNext}
          onClick={onNext}
          disabled={disableNext}
        >
          <Image type={imageTypes.arrow}/>
        </button>
      </div>
    </div>
  );
};
