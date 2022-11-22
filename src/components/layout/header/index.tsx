import {Image} from 'components';
import {imageTypes, routes} from 'utils/constants';
import styles from './header.module.scss';
import {useNavigate} from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate(routes.home);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Image type={imageTypes.logo} onClick={onLogoClick}/>
        <div>Download App</div>
      </nav>
    </header>
  );
};
