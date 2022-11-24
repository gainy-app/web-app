import { Image, Layout, Button, Input, Loader } from 'components';
import { config } from './config';
import { imageTypes } from 'utils/constants';
import { formatNumber, parseGQLerror } from 'utils/helpers';
import { QRCodeSVG } from 'qrcode.react';
import { FormEvent, useState } from 'react';
import styles from './getApp.module.scss';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { useMutation } from '@apollo/client';
import { SEND_APP_LINK } from 'services/gql/queries/appLink';

export default function GetApp () {
  const [phoneState, setPhoneState] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [sendLink, {loading, error, data}] = useMutation(SEND_APP_LINK);

  const {form,qrcode,subtitle,title,description,validate} = config;

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(validate(phoneState, setErrors)) {
      const phone_number = formatNumber(String(phoneState), 'us');
      sendLink({variables: {phone_number}});
    }
  };

  const onPhoneChange = (values: NumberFormatValues) => {
    setPhoneState(values.value);
  };

  return (
    <Layout>
      <section className={styles.section}>
        <Image type={imageTypes.logoWhite} className={styles.logo}/>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.qrWrapper}>
          <QRCodeSVG value={qrcode} className={styles.qrCode}/>
        </div>
        <p className={styles.description}>{description}</p>
        <form
          onSubmit={onSubmitHandler}
        >
          <div className={styles.actions}>
            <Input>
              <PatternFormat
                placeholder={form.phone}
                valueIsNumericString
                format="(###) ###-####"
                mask="_"
                name={'phone'}
                onValueChange={onPhoneChange}
                value={phoneState}
              />
            </Input>
            {errors && (
              <p className={styles.error}>{errors}</p>
            )}
            <Button type={'submit'} id={'webapp_signin_send_link'}>
              {loading ? <Loader className={styles.loader}/> : form.button}
            </Button>
            {error && (
              <p className={styles.error}>{parseGQLerror(error)}</p>
            )}
            {data?.send_app_link?.ok && (
              <p className={styles.success}>Link sent</p>
            )}
          </div>
        </form>
      </section>
    </Layout>
  );
}
