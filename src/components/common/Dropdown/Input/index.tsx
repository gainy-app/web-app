import styles from './input.module.scss';

interface Props {
  value?: string
  handleChangeInput: (value: string) => void
  inputClass?: string,
  inActive?: boolean
}

export const Input = ({ value, handleChangeInput, inputClass, inActive }:Props) => {
  return (
    <input
      type={'text'}
      className={`${styles.input} ${inputClass ? inputClass : ''} ${inActive ? styles.inActive: ''}`}
      value={value}
      onChange={({ target }) => {
        handleChangeInput(target.value);
      }}
    />
  );
};
