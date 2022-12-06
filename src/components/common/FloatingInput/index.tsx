import styles from './floatinginput.module.scss';

interface Props {
  id?: string
  placeholder?: string
  label?: string
  onChange?: (e: any) => void
  value?: string
  children?: any
}

export const FloatingInput = ({
  placeholder,label,id, onChange, value, children
}: Props) => {
  return (
    <div className={`${styles.inputWrapper} ${value ? styles.active : ''}`}>
      {children ? children :  <input
        type="text"
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />}

      <label htmlFor={id}>{label}</label>
    </div>
  );
};
