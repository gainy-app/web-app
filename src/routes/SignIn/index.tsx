import { Image, Layout, Button } from 'components';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './signin.module.scss';
import { imageTypes } from 'utils/constants';

export default function SignIn () {
  const {pathname} = useLocation();
  const isAuth = !pathname.includes(pathname);

  const shouldRedirect = true;

  const navigate = useNavigate();

  if (shouldRedirect) {
    navigate('/get-the-app');
  }

  return (
    <Layout isAuth={isAuth}>
      <section className={styles.section}>
        <Image type={imageTypes.logo}/>
        <Image type={'car'}/>
        <p className={styles.description}>Sign in with one of the following options</p>
        <div className={styles.authButtons}>
          <Button type={'apple'}>
            <Image type={'apple'}/>
            <span> Enter with Apple</span>
          </Button>
          <Button type={'transparent'}>
            <Image type={'google'}/>
            <span> Enter with Google </span>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
