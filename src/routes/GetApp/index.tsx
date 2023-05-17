import styles from './getApp.module.scss';
import { imageTypes, routes } from '../../utils/constants';
import { Button, Image, Input, Loader, ButtonLink } from '../../components';
import { FormEvent, useLayoutEffect, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { formatNumber, getCurrentYear, getQueryAppLink, parseGQLerror } from '../../utils/helpers';
import { useMutation } from '@apollo/client';
import { SEND_APP_LINK } from '../../services/gql/queries';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from './config';
import CosmonautImage from '../../assets/cosmonaut.png';
import { useAuth } from '../../contexts/AuthContext';
import { sendEvent, sendGoogleDataLayerEvent } from '../../utils/logEvent';

export default function GetApp () {
  const { form, qrcode, subtitle, paragraph, title, description, validate, downloadButton } = config;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, appId } = useAuth();

  const [sendLink, { loading, error, data }] = useMutation(SEND_APP_LINK, {
    onError: () => sendGoogleDataLayerEvent('click_button_after_input_not_target_phone', currentUser?.uid),
    onCompleted: () => sendGoogleDataLayerEvent('click_button_after_input_target_phone', currentUser?.uid || 'not authorized')
  });

  const [errors, setErrors] = useState<string>('');
  const [phoneState, setPhoneState] = useState<string>('');

  const status = localStorage.getItem('status');
  const authMethod = localStorage.getItem('login');

  const currentYear = getCurrentYear();

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

    return () => {
      localStorage.removeItem('login');
    };
  }, []);

  useEffect(() => {
    appId && sendEvent('get_app_page_viewed', currentUser?.uid, appId);
  }, [appId]);

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
          query_string: getQueryAppLink()
        }
      });
    } else {
      sendGoogleDataLayerEvent('click_button_after_input_not_target_phone', currentUser?.uid);
    }
  };

  const onPhoneChange = (values: NumberFormatValues) => {
    setPhoneState(values.value);
  };

  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logoWrapper}>
            <Image type={imageTypes.logoWhite} className={styles.logo}/>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.note}>{paragraph}</p>
          <div className={styles.buttonWrapper}>
            <ButtonLink
              href={downloadButton.link}
              onClick={handleDownloadButtonClick}
              variant={'download'}
              id={downloadButton.id}
            >
              {downloadButton.text}
            </ButtonLink>
          </div>
          <div className={styles.cosmonautMobileWrapper}>
            <img src={CosmonautImage} loading='lazy' alt='cosmonaut' width="100%" height="100%"/>
          </div>
          <div className={styles.line}>
            <Image type={imageTypes.line}/>
          </div>
          <div className={styles.qrWrapper} id={qrcode.id}>
            <QRCodeSVG value={qrcode.link} className={styles.qrCode}/>
          </div>
          <p className={styles.qrDescription}>{description}</p>
          <div className={styles.formWrapper}>
            <form onSubmit={onSubmitHandler} >
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
          </div>
          <footer className={styles.footer}>
            <span>© {currentYear} Gainy, Inc. </span>
          </footer>
        </div>
        <div className={styles.cosmonautWrapper}>
          <img src={CosmonautImage} loading='lazy' alt='cosmonaut' width="100%" height="100%"/>
        </div>
      </div>
      <div className={styles.starsBackground} />
    </section>
  );
}
