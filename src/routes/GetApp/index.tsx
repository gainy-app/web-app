import { Image, Layout, Button, Input } from 'components';
import styles from './getApp.module.scss';
import { imageTypes } from 'utils/constants';
import {QRCodeSVG} from 'qrcode.react';
import {ChangeEvent, useState} from 'react';

export default function GetApp () {
  const [phone, setPhone] = useState('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <Layout>
      <section className={styles.section}>
        <Image type={imageTypes.logo}/>
        <h1>Gey the mobile App</h1>
        <p>To start invest in TTFs, please continue on our mobile app by signing in with the account you  just created.</p>
        <QRCodeSVG value="https://reactjs.org/" />
        <p>Scan to get the app</p>
        <p> or</p>
        <Input type="number" value={phone} onChange={onInputChange} placeholder={'Phone number'}/>
      </section>
    </Layout>
  );
}
