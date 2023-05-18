export const config = {
  title: 'Thanks for signing up!',
  subtitle: 'To install the app, kindly click on the provided link and access it through the AppStore.',
  note: 'Regrettably, as of today, it is only available for iOS.',
  downloadButton: {
    text: 'Download App',
    link: 'https://go.gainy.app/ZOFw/Webp',
    id: 'download_app_web_platform'
  },
  qrcode: {
    link: 'https://go.gainy.app/ZOFw/Webp?af_qr=true',
    id: 'qr_code_place'
  },
  qrDescription: 'Scan the QR code or enter your phone number for the download link',
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
