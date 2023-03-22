import styles from './getApp.module.scss';
import { imageTypes, routes } from '../../utils/constants';
import { Button, Image, Input, Loader, ButtonLink } from '../../components';
import React, { FormEvent, useLayoutEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { formatNumber, parseGQLerror } from '../../utils/helpers';
import { useMutation } from '@apollo/client';
import { SEND_APP_LINK } from '../../services/gql/queries';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from './config';
import { Background } from '../Success/Background';
import { useAuth } from '../../contexts/AuthContext';
import { sendEvent, sendGoogleDataLayerEvent } from '../../utils/logEvent';
import { useFormContext } from 'contexts/FormContext';

export default function GetApp () {
  const { form,qrcode,subtitle,paragraph,title,description,validate, downloadButton } = config;
  const [phoneState, setPhoneState] = useState<string>('');
  const { pathname } = useLocation();
  const [errors, setErrors] = useState<string>('');
  const [sendLink, { loading, error, data }] = useMutation(SEND_APP_LINK, {
    onError: () => sendGoogleDataLayerEvent('click_button_after_input_not_target_phone', currentUser?.uid),
    onCompleted: () => sendGoogleDataLayerEvent('click_button_after_input_target_phone', currentUser?.uid || 'not authorized')
  });
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const status = localStorage.getItem('status');
  const authMethod = localStorage.getItem('login');
  const { appId } = useFormContext();
  const handleDownloadButtonClick = () => {
    sendEvent('download_app_clicked', currentUser?.uid, appId, {
      pageUrl: window.location.href,
      pagePath: pathname,
      clickText: downloadButton.text,
      clickUrl: downloadButton.link,
      buttonId: downloadButton.id
    });
  };

  useLayoutEffect(()=> {
    if(status === null) {
      navigate(routes.home);
    }
  }, [status]);

  useLayoutEffect(() => {
    if(authMethod) {
      sendGoogleDataLayerEvent('web_login', currentUser?.uid, authMethod);
    }

    sendEvent('get_app_page_viewed', currentUser?.uid, appId);

    return () => {
      localStorage.removeItem('login');
    };
  }, []);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendEvent('text_the_link_clicked', currentUser?.uid, appId, {
      pageUrl: window.location.href,
      pagePath: pathname,
      clickText: downloadButton.text,
      clickUrl: downloadButton.link,
      buttonId: downloadButton.id
    });

    if(validate(phoneState, setErrors)) {
      const phone_number = formatNumber(String(phoneState), 'us');
      sendLink({ variables: { phone_number } });
    } else {
      sendGoogleDataLayerEvent('click_button_after_input_not_target_phone', currentUser?.uid);
    }
  };
  const onPhoneChange = (values: NumberFormatValues) => {
    setPhoneState(values.value);
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <Image type={imageTypes.logoWhite} className={styles.logo}/>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.paragraph}>{paragraph}</p>
          <ButtonLink
            href={downloadButton.link}
            className={styles.buttonLink}
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
