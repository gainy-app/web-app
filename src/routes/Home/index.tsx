import { Layout } from 'components';
import styles from './home.module.scss';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home () {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/sign-in');
  };

  return (
    <Layout>
      <section className={styles.section}>
        <h1>index page</h1>
        <button onClick={onLogout}>logout</button>
      </section>
    </Layout>
  );
}
