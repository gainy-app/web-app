import styles from './floatinginput.module.scss';

interface Props {
  id?: string
  placeholder?: string
  label?: string
  onChange?: (e: any) => void
  value?: any
  children?: any
  readOnly?: boolean
  onClick?: () => void
}

export const FloatingInput = ({
  placeholder,label,id, onChange, value, children, readOnly, onClick
}: Props) => {
  return (
    <div className={`${styles.inputWrapper} ${value ? styles.active : ''}`} onClick={onClick ? onClick : () => {}}>
      {children ? children :  <input
        type="text"
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
      />}
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
