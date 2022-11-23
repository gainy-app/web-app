import { Image, Layout, Button, Input } from 'components';
import {config} from './config';
import { imageTypes } from 'utils/constants';
import {QRCodeSVG} from 'qrcode.react';
import {FormEvent, useState} from 'react';
import styles from './getApp.module.scss';
import {NumberFormatValues, PatternFormat} from 'react-number-format';

export default function GetApp () {
  const [phoneState, setPhoneState] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  const {form,qrcode,subtitle,title,description, validate} = config;

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(validate(phoneState, setErrors)) {
      console.log(phoneState, 'submit');
    }
  };

  const onPhoneChange = (values: NumberFormatValues) => {
    setPhoneState(values.value);
  };

  return (
    <Layout>
      <section className={styles.section}>
        <Image type={imageTypes.logo} className={styles.logo}/>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <QRCodeSVG value={qrcode} className={styles.qrCode}/>
        <div className={styles.description}>
          <p>{description}</p>
          <p>or</p>
        </div>
        <form
          onSubmit={onSubmitHandler}
        >
          <div className={styles.actions}>
            <Input>
              <PatternFormat placeholder={'Phone number'}
                valueIsNumericString format="(###) ###-####"
                mask="_"
                name={'phone'}
                onValueChange={onPhoneChange}
                value={phoneState}
              />
            </Input>
            {errors && (
              <p className={styles.error}>{errors}</p>
            )}
            <Button type={'submit'}>
              {form.button}
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
};
