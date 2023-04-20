import styles from './stepControl.module.scss';
import classNames from 'classnames';

interface Props {
  stepNumber?: number
  stepTitle: string
  activeStep?: boolean
  withEdit?: boolean
  onEdit?: () => void
  step: number
  goToStep: (arg: number) => void
}
export const StepControl = ({ stepNumber,withEdit, stepTitle, activeStep, onEdit, step, goToStep }: Props) => {
  return (
    <div className={classNames(styles.wrapper, {
      [styles.active]: activeStep
    })}>
      <div className={styles.stepIndicatorWithTitle}>
        <div className={classNames(styles.stepIndicator, {
          [styles.activeStepIndicator] : activeStep
        })}>
          {stepNumber}
        </div>
        <span className={styles.stepTitle}>{stepTitle}</span>
      </div>
      {withEdit && (
        <div className={styles.edit} onClick={() => {
          goToStep(step);
          onEdit && onEdit();
        }}>Edit</div>
      )}
    </div>
  );
};