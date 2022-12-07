import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import React from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface letUsKnowData {
  broker: boolean
  person: string
  tradedCompany: string
  notify: boolean
}

type Props = letUsKnowData & {
  updateFields: (fields: Partial<letUsKnowData>) => void
}

export const LetUsKnowForm = ({ updateFields }:Props) => {
  const { title,subtitle } = config;
  const {  next, back } = useFormContext();
  console.log(updateFields);

  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
      <Input/>
      <Input/>
      <Input/>
      <Input/>
      <ButtonsGroup onBack={back}>
        <Button type={'button'} onClick={next}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};