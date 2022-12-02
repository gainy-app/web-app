import { FormWrapper } from '../FormWrapper';
import { config } from './config';
import { Field } from '../../common/Field';
import styles from './citizenform.module.scss';
import { useState } from 'react';
import { Image } from 'components';
import { imageTypes } from 'utils/constants';

interface citizenData {
  country: string
}

type Props = citizenData & {
  updateFields: (fields: Partial<citizenData>) => void
}

export const CitizenForm = ({ updateFields }: Props) => {
  const { title,subtitle } = config;

  const [openDropdown, setOpenDropdown] = useState(false);
  const options = [
    'us',
    'ge',
  ];
  return (
    <FormWrapper title={title} subtitle={subtitle}>
      <label className={styles.select}  onClick={(e: any) => {
        setOpenDropdown(true);
        if(e.target.tagName === 'LI' || e.target.tagName === 'UL') {
          setOpenDropdown(false);
        }
      }}>
        <Field>
          <div>
            <div>country</div>
          </div>
          <Image type={imageTypes.arrowDropdown} className={openDropdown ? styles.rotate : ''}/>
          {openDropdown && (
            <ul className={styles.dropdownInner}>
              {options.map(option => {
                return <li onClick={() => {
                  updateFields({ country: option });
                  setOpenDropdown(false);
                }
                }>{option}</li>;
              })}
            </ul>
          )}
        </Field>
      </label>
      <div className={styles.content}>
        <p>By pressing Continue, you agree to our <a href='https://www.gainy.app/terms-of-service' target={'_blank'} rel="noreferrer">Terms & Conditions</a>  and <a href="https://www.gainy.app/privacy-policy" target={'_blank'} rel="noreferrer">Privacy Policy.</a>  Your data will be securely collected by Drive Wealth</p>
      </div>

    </FormWrapper>
  );
};