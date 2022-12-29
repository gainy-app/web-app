export const config = {
  subtitle: 'For now, you can use Gainy without trading, but with beautiful analytics and match score!',
  downloadButton: {
    text: 'Download App',
    link: 'https://go.gainy.app/ZOFw/Webp'
  },
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
