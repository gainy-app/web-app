import styles from './success.module.scss';
import { imageTypes, routes, utmConfig } from '../../utils/constants';
import { Button, ButtonLink, Image, Input, Loader } from '../../components';
import React, { FormEvent, useLayoutEffect, useState } from 'react';
import { config } from './config';
import { QRCodeSVG } from 'qrcode.react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { formatNumber, parseGQLerror } from '../../utils/helpers';
import { useMutation } from '@apollo/client';
import { SEND_APP_LINK } from '../../services/gql/queries';
import { Background } from './Background';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormContext } from 'contexts/FormContext';
import { useAuth } from 'contexts/AuthContext';
import { sendEvent } from 'utils/logEvent';

export default function Success () {
  const { form,qrcode,subtitle,title,description,validate, downloadButton } = config;
  const [phoneState, setPhoneState] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [sendLink, { loading, error, data }] = useMutation(SEND_APP_LINK);
  const navigate = useNavigate();
  const status = localStorage.getItem('status');
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

  useLayoutEffect(()=> {
    if(status === null) {
      navigate(routes.home);
    }

    sendEvent('get_app_page_viewed', currentUser?.uid, appId);
  }, [status]);

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
      sendLink({
        variables: {
          phone_number,
          query_string: `https://go.gainy.app/ZOFw?af_js_web=true&af_ss_ver=2_2_0&pid=website_${utmConfig.source}_${utmConfig.channel}&c=${utmConfig.company}`
        }
      });
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
          <h1>Congratulations!</h1>
          <h2 className={styles.title}>{title}</h2>
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
