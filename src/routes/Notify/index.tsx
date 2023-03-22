import styles from './notify.module.scss';
import { imageTypes } from '../../utils/constants';
import { Button, ButtonLink, Image, Input, Loader } from '../../components';
import React, { FormEvent, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { formatNumber, parseGQLerror } from '../../utils/helpers';
import { useMutation } from '@apollo/client';
import { SEND_APP_LINK } from '../../services/gql/queries';
import { config } from './config';
import { Background } from '../Success/Background';
import { sendEvent } from 'utils/logEvent';
import { useFormContext } from 'contexts/FormContext';
import { useAuth } from 'contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export default function Notify () {
  const { form,qrcode,subtitle,description,validate, downloadButton } = config;
  const [phoneState, setPhoneState] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [sendLink, { loading, error, data }] = useMutation(SEND_APP_LINK);

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
  const notifyCountry = localStorage.getItem('notify') || 'Germany';
  const { appId } = useFormContext();
  const { currentUser } = useAuth();
  const { pathname } = useLocation();
  const handleDownloadButtonClick = () => {
    sendEvent('download_app_clicked', currentUser?.uid, appId, {
      pageUrl: window.location.href,
      pagePath: pathname,
      clickText: downloadButton.text,
      clickUrl: downloadButton.link,
      buttonId: downloadButton.id
    });
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <Image type={imageTypes.logoWhite} className={styles.logo}/>
          <h2 className={styles.mainTitle}>You’ll be notified when</h2>
          <h2 className={styles.title}>{`Trading feature will be available in ${notifyCountry}`}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <ButtonLink
            href={downloadButton.link}
            onClick={handleDownloadButtonClick}
            variant={'download'}
            id={downloadButton.id}
          >
            {downloadButton.text}
          </ButtonLink>
          <div className={styles.line}>
            <Image type={imageTypes.line}/>
          </div>
          <div className={styles.qrWrapper} id={qrcode.id}>
            <QRCodeSVG value={qrcode.link} className={styles.qrCode}/>
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
        <Background />
      </main>
      <footer className={styles.footer}>
        <span>© 2021 Gainy, Inc. </span>
      </footer>
    </>
  );
}
