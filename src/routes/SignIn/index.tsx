import { Image, Button } from 'components';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './signin.module.scss';
import { imageTypes, routes } from 'utils/constants';
import { config } from './config';
import { useAuth } from 'contexts/AuthContext';
import { useLayoutEffect } from 'react';
import { sendEvent } from 'utils/logEvent';
import PhoneBanner from '../../assets/PhoneBanner.webm';
import { getCurrentYear } from 'utils/helpers';

export default function SignIn () {
  const { title, form, description, subDescription } = config;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signInWithGoogle, currentUser, signInWithApple, appId } = useAuth();

  if (currentUser) {
    return <Navigate to={routes.home} replace state={{ path: pathname }} />;
  }

  const currentYear = getCurrentYear();

  const onSignIn = (cb:() => Promise<void>, method: string) => {
    cb()
      .then(() => {
        localStorage.setItem('login', method);
      })
      .finally(() => {
        navigate(routes.home);
      });
  };

  useLayoutEffect(() => {
    sendEvent('sign_in_page_viewed', '', appId, {
      pageUrl: window.location.href,
      pagePath: pathname,
      title: document.title
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <Image type={imageTypes.logoWhite} className={styles.logo}/>
        </div>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.subDescription}>{subDescription}</p>
        <div className={styles.authButtons}>
          <Button
            variant={'apple'}
            id={'webapp_signin_apple'}
            onClick={() => onSignIn(signInWithApple, 'Apple')}>
            <Image type={imageTypes.apple} className={styles.signIcon}/>
            <span>{form.apple}</span>
          </Button>
          <Button
            variant={'google'}
            onClick={() => onSignIn(signInWithGoogle, 'Google')}
            id={'webapp_signin_google'}
          >
            <Image type={imageTypes.google} className={styles.signIcon}/>
            <span>{form.google}</span>
          </Button>
        </div>
        <span className={styles.contentFooter}> © {currentYear} Gainy, Inc.</span>
      </div>
      <div className={styles.mainVideo}>
        <video src={PhoneBanner} width="100%" height="100%" controls={false} autoPlay muted loop />
      </div>
      <div className={styles.sectionFooter}> © {currentYear} Gainy, Inc.</div>
      <div className={styles.starsBackground} />
    </section>
  );
}
