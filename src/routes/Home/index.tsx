import {Button, Layout} from 'components';
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
        <h1 className={styles.title}>index page</h1>
        <Button onClick={onLogout}>Logout</Button>
      </section>
    </Layout>
  );
}
