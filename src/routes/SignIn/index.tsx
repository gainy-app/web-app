import { Image, Layout, Button } from 'components';
import { useLocation } from 'react-router-dom';
import styles from './signin.module.scss';
import { imageTypes } from 'utils/constants';
import { config } from './config';

export default function SignIn () {
  const {title,form} = config;
  const {pathname} = useLocation();
  const isAuth = !pathname.includes(pathname);

  return (
    <Layout isAuth={isAuth}>
      <section className={styles.section}>
        <Image type={imageTypes.logo} className={styles.logo}/>
        <Image type={'car'} className={styles.car}/>
        <p className={styles.description}>{title}</p>
        <div className={styles.authButtons}>
          <Button type={'apple'}>
            <Image type={'apple'} className={styles.signIcon}/>
            <span> {form.apple}</span>
          </Button>
          <Button
            type={'transparent'}
          >
            <Image type={'google'} className={styles.signIcon}/>
            <span> {form.google} </span>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
