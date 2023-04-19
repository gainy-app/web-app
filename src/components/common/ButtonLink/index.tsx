import classNames from 'classnames';
import styles from './buttonLink.module.scss';
import React from 'react';

interface Props extends React.HTMLProps<HTMLAnchorElement> {
  children: JSX.Element | string | JSX.Element[]
  href: string,
  onClick?: () => void
  variant?: 'apple' | 'google' | 'download' | 'continue'
  type?: 'button' | 'submit' | 'reset',
  id?: string
}

export const ButtonLink = ({ children, onClick, variant, href, className,  ...rest }: Props) => {
  return (
    <a
      href={href}
      className={classNames(styles.button,  {
        [styles.button_apple]: variant === 'apple',
        [styles.button_google]: variant === 'google',
        [styles.button_download]: variant === 'download',
        [styles.button_continue]: variant === 'continue',
      }, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
};
