import classNames from 'classnames';
import styles from './button.module.scss';

interface Props {
    children: JSX.Element | string | JSX.Element[]
    onClick?: () => void
    type?: 'apple' | 'transparent'
}

export const Button = ({children, onClick, type}: Props) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.button_apple]: type === 'apple',
        [styles.button_transparent]: type === 'transparent',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
