import { ReactNode } from 'react';

interface Props {
  title?: string
  subtitle?: string
  children: ReactNode
}
export const FormWrapper = ({ title, subtitle, children }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </>
  );
};