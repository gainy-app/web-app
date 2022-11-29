export const config = {
  title: 'Get the mobile App',
  subtitle: 'Our brand new web platform is so new it’s not even there yet. For now, please continue in our mobile app by signing in with the account you’ve just created.',
  qrcode: 'https://go.gainy.app/ZOFw/Webp?af_qr=true',
  description: 'Scan the QR code or enter your phone number for the download link',
  form: {
    phone: 'Enter your phone number',
    button: 'Text me the link',
    successMessage: 'Link sent!'
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
