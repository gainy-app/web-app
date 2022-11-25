import {Layout} from 'components';
import styles from './home.module.scss';

export default function Home () {

  return (
    <Layout>
      <section className={styles.section}>
        <h1 className={styles.title}>index page</h1>
      </section>
    </Layout>
  );
}
