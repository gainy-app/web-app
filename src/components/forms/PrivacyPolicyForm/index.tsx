import styles from './privacy.module.scss';
import { Button } from 'components';
import { useFormContext } from 'contexts/FormContext';
import { config } from './config';
import parse from 'html-react-parser';

export const PrivacyPolicyForm = () => {
  const { next } = useFormContext();
  const { title, lists, cookie, buttonText } = config;
  return (
    <div className={styles.privacyWrapper}>
      <h1>Gainy Inc. Privacy Policy</h1>
      <h2 className={styles.mainTitle}>{title}</h2>
      <ol className={styles.mainList}>
        {lists.map((i, index) => {
          return (
            <li className={styles.mainItem} key={index.toString()}>
              {i.title}
              {i.subtitle && (
                <p className={styles.mainItemTitle}>{i.subtitle}</p>
              )}
              {i.content && (
                <p className={styles.mainItemContent}>{parse(i.content)}</p>
              )}
              {i.subcontent && (
                <p className={styles.mainItemContent}>{parse(i.subcontent)}</p>
              )}
              {i.ol && (
                <ol className={styles.innerList}>
                  {i.ol.map((j, jIndex) => {
                    return <li key={jIndex.toString()}>{j}</li> ;
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
      <div className={styles.acceptBlock}>
        <Button onClick={next}>{buttonText}</Button>
        <p className={styles.paragraph}>{parse(cookie)}</p>
      </div>
    </div>
  );
};
