import { Image } from '../Image';
import { imageTypes } from 'utils/constants';
import React from 'react';
import styles from './buttonsgroup.module.scss';

interface Props {
  children: any
  onBack: () => void
}

export const ButtonsGroup = ({ children, onBack }: Props) => {
  return (
    <div className={styles.buttons}>
      {children}
      <div
        className={styles.arrow}
        onClick={onBack}
      ><Image type={imageTypes.arrow}/></div>
    </div>
  );
};
