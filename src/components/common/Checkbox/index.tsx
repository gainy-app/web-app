import styles from './checkbox.module.scss';
interface Props {
  onChange: (e: any) => void
  id: string
  label: string
}

export const Checkbox = ({ id,label,onChange }: Props) => {
  return (
    <div className={styles.switch}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
      />
      <div className={`${styles.slider} ${styles.round}`}/>
    </div>
  );
};