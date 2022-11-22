import { Image, Layout, Button, Input } from 'components';
import {config} from './config';
import { imageTypes } from 'utils/constants';
import {QRCodeSVG} from 'qrcode.react';
import {ChangeEvent, useState} from 'react';
import styles from './getApp.module.scss';

export default function GetApp () {
  const [phone, setPhone] = useState('');
  const {form,qrcode,subtitle,title,description} = config;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <Layout>
      <section className={styles.section}>
        <Image type={imageTypes.logo} className={styles.logo}/>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <QRCodeSVG value={qrcode} className={styles.qrCode}/>
        <div className={styles.description}>
          <p>{description}</p>
          <p>or</p>
        </div>
        <div className={styles.actions}>
          <Input
            type="number"
            value={phone}
            onChange={onInputChange}
            placeholder={form.phone}
          />
          <Button>
            {form.button}
          </Button>
        </div>
      </section>
    </Layout>
  );
}
