import {Button, Image} from 'components';
import {imageTypes, routes} from 'utils/constants';
import styles from './header.module.scss';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'contexts/AuthContext';

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onLogoClick = () => {
    navigate(routes.home);
  };

  const onLogout = async () => {
    await logout();
    navigate('/sign-in');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Image type={imageTypes.logo} onClick={onLogoClick}/>
        <Button onClick={onLogout}>Logout</Button>
      </nav>
    </header>
  );
};
