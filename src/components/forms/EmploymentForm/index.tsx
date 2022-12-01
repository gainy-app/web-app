import { FormWrapper } from '../FormWrapper';
import { config } from './config';

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
  console.log(updateFields);
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      {tags.map(tag => {
        return <div onClick={() => updateFields({ tag: tag })}>{tag}</div>;
      })}
    </FormWrapper>
  );
};