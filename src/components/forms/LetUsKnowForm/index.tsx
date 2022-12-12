import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button } from '../../common/Button';
import React, { useState } from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';
import { Checkbox } from '../../common/Checkbox';
import { Field } from '../../common/Field';
import { FloatingInput } from '../../common/FloatingInput';

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
  const { title,subtitle } = config;
  const {  next, back, onSendData } = useFormContext();
  const [politicallyOpen, setPoliticallyOpen] = useState(politically_exposed_names ? politically_exposed_names : false);
  const [directorOpen, setDirectorOpen] = useState(employment_is_director_of_a_public_company ? employment_is_director_of_a_public_company : false);

  const onNextClick = () => {
    onSendData();
    next();
  };

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <label htmlFor="broker">
        <Field>
          <p>Are you affiliated with or employed by another broker?</p>
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
          <div>
            You are obligated to notify your employer in writing of your intention to open an account
          </div>
        )}
      </label>

      <label htmlFor="member">
        <Field>
          <p>Are you or a family member a politically exposed person</p>
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
          <div>
            A politically exposed person is someone
            who has been entrusted with a prominent public function, or who is closely related
            to such a person.

            Please provide the names of that official and officials immediate family members (including former spouses).
            <FloatingInput
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
        <Field>
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
          <div>
            Please, provide the names of that companies.
            <FloatingInput
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
      <ButtonsGroup onBack={back}>
        <Button type={'button'} onClick={onNextClick}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};