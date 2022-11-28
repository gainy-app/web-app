import styles from './stepControl.module.scss';

interface Props {
  stepNumber: number
  stepTitle: string
}
export const StepControl = ({ stepNumber, stepTitle }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stepIndicatorWithTitle}>
        <div className={styles.stepIndicator}>
          {stepNumber}
        </div>
        <span className={styles.stepTitle}>{stepTitle}</span>
      </div>
      <div className={styles.edit}>edit</div>
    </div>
  );
};