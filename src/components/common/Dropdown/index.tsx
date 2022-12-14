import React, { ReactElement } from 'react';
import { Field, Image } from 'components';
import { imageTypes } from '../../../utils/constants';
import styles from './dropdown.module.scss';
import { useOutBoardingClick } from '../../../hooks';

interface Props {
  children: ReactElement | ReactElement[]
  list: ReactElement | ReactElement[]
  openDropdown: boolean
  onClick: () => void
  setOpenDropdown: (arg: boolean) => void
  withPlaceholder?: string
  value?: string
}

export const Dropdown = ({ children, openDropdown, list, onClick, setOpenDropdown, withPlaceholder, value }:Props) => {
  const { ref } = useOutBoardingClick(() => setOpenDropdown(false));

  return (
    <label ref={ref} onClick={onClick}>
      <Field>
        {
          withPlaceholder && (
            <span className={`${styles.placeholder} ${value ? styles.active : ''}`}>{withPlaceholder}</span>
          )
        }
        {children}
        <Image type={imageTypes.arrowDropdown} className={openDropdown ? styles.rotate : ''}/>
        <ul className={`${styles.dropdownInner} ${openDropdown ? styles.openDropdown : ''}`}>
          {list}
        </ul>
      </Field>
    </label>
  );
};
