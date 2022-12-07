import styles from './checkbox.module.scss';
interface Props {
  onChange: (e: any) => void
  id: string
  label: string
  value: boolean
}

export const Checkbox = ({ id,onChange, value }: Props) => {
  return (
    <div className={styles.switch}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        checked={value}
      />
      <div className={`${styles.slider} ${styles.round}`}/>
    </div>
  );
};