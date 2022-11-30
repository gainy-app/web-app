import { Layout
  // , Invest
} from 'components';
import styles from './home.module.scss';
// import { config } from './config';
// import { NumberFormatValues } from 'react-number-format';
import React
  // , { useState }
  from 'react';

export default function Home () {
  // const { invest } = config;
  // const [sum, setSum] = useState<string | null>(null);
  //
  // const onSumChange = (values: NumberFormatValues) => {
  //   setSum(values.formattedValue);
  // };

  return (
    <Layout footerClassName={styles.footer}>
      {/*<Invest sum={sum} onSumChange={onSumChange} invest={invest}/>*/}

    </Layout>
  );
}
