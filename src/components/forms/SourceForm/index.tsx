import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { useFormContext } from '../../../contexts/FormContext';
import { Button } from '../../common/Button';
import React from 'react';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface sourceData {
  source: string
}

type Props = sourceData & {
  updateFields: (fields: Partial<sourceData>) => void
}

export const SourceForm = ({ updateFields }:Props) => {
  const {  next, back } = useFormContext();
  const { title,subtitle } = config;
  console.log(updateFields);
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input/>
      <ButtonsGroup onBack={back}>
        <Button type={'button'} onClick={next}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};