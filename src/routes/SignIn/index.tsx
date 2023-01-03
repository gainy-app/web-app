import { Image, Layout, Button } from 'components';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './signin.module.scss';
import { imageTypes, routes } from 'utils/constants';
import { config } from './config';
import { useAuth } from 'contexts/AuthContext';

export default function SignIn () {
  const { title,form, description, subDescription } = config;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signInWithGoogle, currentUser, signInWithApple } = useAuth();

  if(currentUser) {
    return <Navigate to={routes.home} replace state={{ path: pathname }}/>;
  }

  const onSignIn = (cb:() => Promise<void>, method: string) => {
    cb().then(() => {
      localStorage.setItem('login', method);
    })
      .finally(() => {
        navigate(routes.home);
      });
  };

  return (
    <Layout>
      <section className={styles.section}>
        <Image type={imageTypes.car} className={styles.car}/>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.description}>{subDescription}</p>

        <div className={styles.authButtons}>
          <Button
            variant={'apple'}
            id={'webapp_signin_apple'}
            onClick={() => onSignIn(signInWithApple, 'Apple')}>
            <Image type={imageTypes.apple} className={styles.signIcon}/>
            <span> {form.apple}</span>
          </Button>
          <Button
            variant={'google'}
            onClick={() => onSignIn(signInWithGoogle, 'Google')}
            id={'webapp_signin_google'}
          >
            <Image type={imageTypes.google} className={styles.signIcon}/>
            <span> {form.google} </span>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
