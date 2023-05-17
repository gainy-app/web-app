import styles from './success.module.scss';
import { imageTypes, routes } from '../../utils/constants';
import { Button, ButtonLink, Image, Input, Loader } from '../../components';
import { FormEvent, useLayoutEffect, useEffect, useState } from 'react';
import { config } from './config';
import { QRCodeSVG } from 'qrcode.react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { formatNumber, getCurrentYear, getQueryAppLink, parseGQLerror } from '../../utils/helpers';
import { useMutation } from '@apollo/client';
import { SEND_APP_LINK } from '../../services/gql/queries';
import CosmonautImage from '../../assets/cosmonaut.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { sendEvent } from 'utils/logEvent';

export default function Success () {
  const { form, note, qrcode, subtitle, title, qrDescription, validate, downloadButton } = config;


  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, appId } = useAuth();

  const [sendLink, { loading, error, data }] = useMutation(SEND_APP_LINK);

  const [phoneState, setPhoneState] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  const status = localStorage.getItem('status');
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
    }
  };

  const onPhoneChange = (values: NumberFormatValues) => {
    if (values.value.length <= 10) {
      setPhoneState(values.value);
    }
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
          <p className={styles.note}>{note}</p>
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
          <p className={styles.qrDescription}>{qrDescription}</p>
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
                    className={`${errors ? '' : ''}`}
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = form.phone}
                  />
                </Input>
                <Button type={'submit'} id={'webapp_signin_send_link'} disabled={phoneState.length !== 10}>
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
