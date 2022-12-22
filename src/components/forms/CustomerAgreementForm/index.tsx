import styles from './customeragreement.module.scss';
import { Button, ButtonsGroup } from 'components';
import { useFormContext } from 'contexts/FormContext';
import parse from 'html-react-parser';
import { config } from './config';
import React from 'react';

export const CustomerAgreementForm = () => {
  const { next, back } = useFormContext();
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
              {i.content && (
                <p>{parse(i.content)}</p>
              )}
              {i.subcontent && (
                <p>{i.subcontent}</p>
              )}
              {i.lists && (
                <ul className={styles.innerList}>
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
        <ButtonsGroup onBack={back} onNext={next}>
          <Button onClick={next}>{buttonText}</Button>
        </ButtonsGroup>
      </div>
    </div>

  );
};
