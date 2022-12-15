import styles from './success.module.scss';
import { imageTypes, routes } from '../../utils/constants';
import { Button, Image, Input, Loader } from '../../components';
import React, { FormEvent, useState } from 'react';
import { config } from '../GetApp/config';
import { QRCodeSVG } from 'qrcode.react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { formatNumber, parseGQLerror } from '../../utils/helpers';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_APP_LINK, TRADING_GET_PROFILE_STATUS } from '../../services/gql/queries';
import { Background } from './Background';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Success () {
  const { form,qrcode,subtitle,title,description,validate, downloadButton } = config;
  const { appId , appIdLoading } = useAuth();
  const [phoneState, setPhoneState] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [sendLink, { loading, error, data }] = useMutation(SEND_APP_LINK);


  const { data: formStatus, loading: formStatusLoading } = useQuery(TRADING_GET_PROFILE_STATUS, {
    variables: {
      profile_id: appId
    }
  });
  // eslint-disable-next-line no-debugger
  // debugger;
  if(appIdLoading) return <Loader/>;

  if(formStatusLoading) return <Loader/>;
  // // eslint-disable-next-line no-debugger
  // debugger;
  const status = formStatus?.trading_profile_status[0].kyc_status;
  console.log(status);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(validate(phoneState, setErrors)) {
      const phone_number = formatNumber(String(phoneState), 'us');
      sendLink({ variables: { phone_number } });
    }
  };
  const onPhoneChange = (values: NumberFormatValues) => {
    setPhoneState(values.value);
  };

  // useEffect(() => {
  //   logout();
  // }, []);


  if(status == null) {
    return <Navigate to={routes.home}/>;
  }

  return (
    <>
      <Background />
      <main className={styles.main}>
        <section className={styles.section}>
          <Image type={imageTypes.logoWhite} className={styles.logo}/>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <a href={downloadButton.link} className={styles.buttonLink}>
            <Button variant={'download'}>
              {downloadButton.text}
            </Button>
          </a>
          <Image type={imageTypes.divider}/>
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
                  className={`${errors ? styles.errorValidation : ''}`}
                />
              </Input>
              <Button type={'submit'} id={'webapp_signin_send_link'}>
                {loading ? <Loader className={styles.loader}/> : form.button}
              </Button>
              {error && (
                <p className={styles.error}>{parseGQLerror(error)}</p>
              )}
              {data?.send_app_link?.ok && (
                <p className={styles.success}>{form.successMessage}</p>
              )}
            </div>
          </form>

        </section>
      </main>
      <footer className={styles.footer}>
        <span>© 2021 Gainy, Inc. </span>
      </footer>
    </>

  );
}
