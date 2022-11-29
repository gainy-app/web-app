import React from 'react';
import { Input, Button } from 'components';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import styles from './invest.module.scss';
import { KycLayout } from '../../layout/kyc';

interface Props {
  invest : {
    title: string
    subtitle: string
    buttonText: string
  }
  sum: string | null
  onSumChange: (values: NumberFormatValues) => void
}

export const Invest = React.memo(({
  invest: { title,buttonText,subtitle },sum,onSumChange
}: Props) => {

  return (
    <KycLayout>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{subtitle}</p>
      <Input>
        <NumericFormat
          value={sum}
          prefix={'$'}
          thousandSeparator allowNegative={false}
          placeholder={'$'}
          className={styles.input}
          onValueChange={onSumChange}
        />
      </Input>
      <div className={sum ? styles.hidden : ''}>
        <Button className={styles.button}>{buttonText}</Button>
      </div>
    </KycLayout>
  );
});
