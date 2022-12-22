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
  isNested?: boolean
  type?: string
}

export const FloatingInput = ({
  placeholder,label,id, onChange, value, children, readOnly, onClick, isNested, type
}: Props) => {
  return (
    <div className={`${styles.inputWrapper} ${value ? styles.active : ''} ${isNested ? styles.nested : ''}`} onClick={onClick ? onClick : () => {}}>
      {children ? children :  <input
        type={type || 'text'}
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
