import styles from './tag.module.scss';
import classNames from 'classnames';

interface Props {
  name: string
  onClick: () => void
  activeTag: boolean
}

export const Tag = ({ onClick,name, activeTag }: Props) => {
  return (
    <div onClick={onClick} className={classNames(styles.tag, {
      [styles.activeTag]: activeTag
    })}>
      {name}
    </div>
  );
};
