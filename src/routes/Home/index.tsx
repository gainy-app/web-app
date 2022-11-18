import {Layout} from 'components';
import styles from './home.module.scss';

export default function Home () {
  return (
    <Layout>
      <section className={styles.section}>
        <h1>index page</h1>
      </section>
    </Layout>
  );
}
