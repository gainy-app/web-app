import {Image} from 'components';
import {imageTypes} from 'utils/constants';

export const Header = () => {
  return (
    <header>
      <nav>
        <Image type={imageTypes.logo}/>
        <div>link</div>
      </nav>
    </header>
  );
};
