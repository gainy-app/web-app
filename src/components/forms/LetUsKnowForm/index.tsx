import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button, Image } from 'components';
import styles from './letusknow.module.scss';
import { useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Checkbox } from '../../common/Checkbox';
import { Field } from '../../common/Field';
import { FloatingInput } from '../../common/FloatingInput';
import { imageTypes } from '../../../utils/constants';
import { trackEvent } from '../../../utils/logEvent';
import { useAuth } from '../../../contexts/AuthContext';

interface letUsKnowData {
  employment_affiliated_with_a_broker: boolean
  politically_exposed_names: string | null
  employment_is_director_of_a_public_company: string | null
  irs_backup_withholdings_notified: boolean
}

type Props = letUsKnowData & {
  updateFields: (fields: Partial<letUsKnowData>) => void
}

export const LetUsKnowForm = ({
  updateFields,
  employment_affiliated_with_a_broker,
  politically_exposed_names,
  employment_is_director_of_a_public_company,
  irs_backup_withholdings_notified
}:Props) => {
  const { title,subtitle, broker, member } = config;
  const {  next, back, onSendData } = useFormContext();
  const { currentUser } = useAuth();
  const [politicallyOpen, setPoliticallyOpen] = useState(politically_exposed_names ? politically_exposed_names : false);
  const [directorOpen, setDirectorOpen] = useState(employment_is_director_of_a_public_company ? employment_is_director_of_a_public_company : false);

  const disabled = (!employment_is_director_of_a_public_company && !!directorOpen) || (!politically_exposed_names && !!politicallyOpen);
  const onNextClick = () => {
    trackEvent('KYC_profile_law_info', currentUser?.uid);
    onSendData();
    next();
  };

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <div className={styles.letUsKnow}>
        <label htmlFor="broker">
          <Field fieldClass={employment_affiliated_with_a_broker ? styles.activeField : ''}>
            <p>{broker.title}</p>
            <Checkbox
              value={employment_affiliated_with_a_broker}
              id={'broker'}
              onChange={(e) => {
                updateFields({
                  employment_affiliated_with_a_broker: e.target.checked
                });
              }}
            />
          </Field>
          {employment_affiliated_with_a_broker && (
            <div className={`${styles.activeContent} ${styles.wrapper}`}>
              <p>
                {broker.innerContent.first}
              </p>
              <Image type={imageTypes.shield}/>
            </div>
          )}
        </label>

        <label htmlFor="member">
          <Field fieldClass={politically_exposed_names ? styles.activeField : ''}>
            <p>{member.title}</p>
            <Checkbox
              value={!!politicallyOpen}
              id={'member'}
              onChange={() => {
                setPoliticallyOpen(!politicallyOpen);
                updateFields({
                  politically_exposed_names: null
                });
              }}
            />
          </Field>
          {politicallyOpen && (
            <div className={styles.activeContent}>
              <p>{member.innerContent.first}</p>
              <p style={{ marginTop: '16px' , marginBottom: '20px' }}>{member.innerContent.last}</p>
              <FloatingInput
                isNested
                id={'politically_exposed_names'}
                placeholder={' '}
                label={'List Names'}
                value={politically_exposed_names}
                onChange={(e) => {
                  updateFields({
                    politically_exposed_names: e.target.value
                  });
                }}
              />
            </div>
          )}
        </label>
        <label htmlFor="owner">
          <Field fieldClass={employment_is_director_of_a_public_company ? styles.activeField : ''}>
            <p>Is the account holder(s) a control person of a publicly traded company? A director, officer or 10% stock owner?</p>
            <Checkbox
              value={!!directorOpen}
              id={'owner'}
              onChange={() => {
                setDirectorOpen(!directorOpen);
                updateFields({
                  employment_is_director_of_a_public_company: null
                });
              }}
            />
          </Field>
          {directorOpen && (
            <div className={styles.activeContent}>
              <p style={{ marginTop: '16px' , marginBottom: '20px' }}>
                Please, provide the names of that companies.
              </p>
              <FloatingInput
                isNested
                id={'employment_is_director_of_a_public_company'}
                placeholder={' '}
                label={'List Names'}
                value={employment_is_director_of_a_public_company}
                onChange={(e) => {
                  updateFields({
                    employment_is_director_of_a_public_company: e.target.value
                  });
                }}
              />
            </div>
          )}
        </label>
        <label htmlFor="backup">
          <Field>
            <p>Have you been notified by the IRS that you are subject to backup withholding?</p>
            <Checkbox
              value={irs_backup_withholdings_notified}
              id={'backup'}
              onChange={(e) => {
                updateFields({
                  irs_backup_withholdings_notified: e.target.checked
                });
              }}
            />
          </Field>
        </label>
      </div>
      <ButtonsGroup onBack={back} disableNext={disabled} onNext={onNextClick}>
        <Button type={'button'} onClick={onNextClick}
          disabled={disabled}
        >{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};