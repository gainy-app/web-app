import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import React from 'react';
import { useFormContext } from '../../../contexts/FormContext';
import { ButtonsGroup } from '../../common/ButtonsGroup';

interface profileData {
  anualIncome: string
  networthTotal: string
  networthLiqued: string
  exp: string
  objectives: string
  risk: string
}

type Props = profileData & {
  updateFields: (fields: Partial<profileData>) => void
}

export const InvestmentProfileForm = ({ updateFields }:Props) => {
  const { title,subtitle } = config;
  const {  next, back } = useFormContext();
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <Input onChange={(e) => {
        updateFields({ exp: e.target.value });
      }}/>
      <ButtonsGroup onBack={back}>
        <Button type={'button'} onClick={next}>{'Next'}</Button>
      </ButtonsGroup>
    </FormWrapper>
  );
};