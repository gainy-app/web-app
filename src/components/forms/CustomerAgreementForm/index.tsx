import styles from './customeragreement.module.scss';
import { Button } from 'components';
import { useFormContext } from 'contexts/FormContext';
import parse from 'html-react-parser';
import { config } from './config';

export const CustomerAgreementForm = () => {
  const { next } = useFormContext();
  const { title, list, buttonText } = config;
  return (
    <div className={styles.privacyWrapper}>
      <h1>Gainy Customer Agreement</h1>
      <h2 className={styles.mainTitle}>{parse(title)}</h2>
      <ol className={styles.mainList}>
        {list.map((i, index) => {
          return (
            <li className={styles.mainItem} key={index.toString()}>
              <h2>{i.title}</h2>
              <p>{parse(i.content)}</p>
              {i.subcontent && (
                <p>{i.subcontent}</p>
              )}
              {i.lists && (
                <ul>
                  {
                    i.lists.map((j, indexJ) => {
                      return (
                        <li key={indexJ.toString()}>{parse(j)}</li>
                      );
                    })
                  }
                </ul>
              )}
            </li>
          );
        })}
      </ol>
      <div className={styles.acceptBlock}>
        <Button onClick={next}>{buttonText}</Button>
      </div>
    </div>
  );
};
