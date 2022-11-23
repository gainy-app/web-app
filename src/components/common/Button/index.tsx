import classNames from 'classnames';
import styles from './button.module.scss';
import React from 'react';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    children: JSX.Element | string | JSX.Element[]
    onClick?: () => void
    variant?: 'apple' | 'transparent'
    type?: 'button' | 'submit' | 'reset'
}

export const Button = ({children, onClick, variant, ...rest}: Props) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.button_apple]: variant === 'apple',
        [styles.button_transparent]: variant === 'transparent',
      })}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
