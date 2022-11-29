import styles from './stepControl.module.scss';
import classNames from 'classnames';

interface Props {
  stepNumber?: number
  stepTitle: string
  activeStep?: boolean
  withEdit: boolean
  onEdit: (step: number) => void
  step: number
}
export const StepControl = ({ stepNumber,withEdit, stepTitle, activeStep, onEdit, step }: Props) => {
  console.log(step);
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

        <span className={styles.stepTitle}>{stepTitle}</span>
      </div>
      {withEdit && (
        <div className={styles.edit} onClick={() => onEdit(step)}>edit</div>
      )}
    </div>
  );
};