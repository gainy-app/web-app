import styles from './stepControl.module.scss';
import classNames from 'classnames';

interface Props {
  stepNumber?: number
  stepTitle: string
  activeStep?: boolean
  withEdit?: boolean
  onEdit: (step: number) => void
  step: number
}
export const StepControl = ({ stepNumber,withEdit, stepTitle, activeStep, onEdit, step }: Props) => {
  return (
    <div className={classNames(styles.wrapper, {
      [styles.active]: activeStep
    })}>
      <div className={styles.stepIndicatorWithTitle}>
        {activeStep && (
          <div className={styles.stepIndicator}>
            {stepNumber}
          </div>
        )}
        <span className={`${styles.stepTitle} ${activeStep ?  '' : styles.resetMargin}`}>{stepTitle}</span>
      </div>
      {withEdit && (
        <div className={styles.edit} onClick={() => onEdit(step)}>Edit</div>
      )}
    </div>
  );
};