import {Layout} from 'components';
import { useLocation } from 'react-router-dom';
import styles from './signin.module.scss';

export default function SignIn () {
  const {pathname} = useLocation();

  return (
    <Layout isAuth={!pathname.includes(pathname)}>
      <section className={styles.section}>
        <div>Gainy</div>
        <div>image</div>
        <p className={styles.description}>Sign in with one of the following options</p>
        <button>
                  Enter with Apple
        </button>
        <button>
                  Enter with Google
        </button>
      </section>
    </Layout>
  );
}
