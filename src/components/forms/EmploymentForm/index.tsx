import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Button } from '../../common/Button';
import React from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface tagsData {
  tag: string
}

type Props = tagsData & {
  updateFields: (fields: Partial<tagsData>) => void
}
const tags = [
  'employment',
  'test'
];
export const EmploymentForm = ({ updateFields }:Props) => {
  const { title,subtitle } = config;
  const {  next, back } = useFormContext();
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      {tags.map(tag => {
        return <div onClick={() => updateFields({ tag: tag })}>{tag}</div>;
      })}
      <ButtonsGroup onBack={back}>
        <Button type={'button'} onClick={next}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};