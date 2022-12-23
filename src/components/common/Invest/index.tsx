import React, { useEffect, useState } from 'react';
import { Input, Button } from 'components';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import styles from './invest.module.scss';
import { KycLayout } from '../../layout/kyc';
import { useAuth } from '../../../contexts/AuthContext';
import { useFormContext } from '../../../contexts/FormContext';
import { logFirebaseEvent } from '../../../utils/logEvent';

interface Props {
  invest : {
    title: string
    subtitle: string
    buttonText: string
  }
  setStart: (arg: boolean) => void
}

export const Invest = React.memo(({
  invest: { title,buttonText,subtitle }, setStart
}: Props) => {

  const [sum, setSum] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const { appId } = useFormContext();

  const onSumChange = (values: NumberFormatValues) => {
    setSum(values.formattedValue);
  };

  useEffect(() => {
    logFirebaseEvent('dw_kyc_deposit_s', currentUser, appId);
  }, []);

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
      <Button
        onClick={() => {
          setStart(true);
          localStorage.setItem('invest', String(sum));
          logFirebaseEvent('dw_kyc_deposit_e', currentUser, appId, { amount: sum });
        }}
        className={styles.button}
        disabled={!sum}
      >{buttonText}</Button>
    </KycLayout>
  );
});
