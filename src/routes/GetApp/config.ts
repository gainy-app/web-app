export const config = {
  title: 'Gey the mobile App',
  subtitle: 'To start invest in TTFs, please continue on our mobile app by signing in with the account you  just created.',
  qrcode: 'https://go.gainy.app/ZOFw/Webp?af_qr=true',
  description: 'Scan to get the app',
  form: {
    phone: 'Phone number',
    button: 'Text me App link'
  },
  validate(value:string, setErrors: (arg: string) => void) {
    let phoneError = '';
    if(value.length <= 9) {
      phoneError = 'Please, enter a valid phone number';
    }
    if(phoneError) {
      setErrors(phoneError);
      return false;
    }
    setErrors('');
    return true;
  }
};
