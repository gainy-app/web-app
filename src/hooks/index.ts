import {useLocation} from 'react-router-dom';
import {routes} from 'utils/constants';

export const usePage = () => {
  const {pathname} = useLocation();
  const withHeader = (!pathname.includes(routes.signIn) && !pathname.includes(routes.getApp));

  return {
    withHeader
  };
};
