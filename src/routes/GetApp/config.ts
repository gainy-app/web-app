export const config = {
  title: 'Get the mobile App',
  subtitle: 'Our brand new web platform is so new it’s not even there yet. ',
  paragraph: 'For now, please continue in our mobile app by signing in with the account you’ve just created.',
  downloadButton: {
    text: 'Download App',
    link: 'https://go.gainy.app/ZOFw/Webp',
    id: 'download_app_web_platform'
  },
  qrcode: {
    link: 'https://go.gainy.app/ZOFw/Webp?af_qr=true',
    id: 'qr_code_place'
  },
  description: 'Scan the QR code or enter your phone number for the download link',
  form: {
    phone: 'Enter your phone number',
    button: 'Text me the link',
    successMessage: 'Link sent!'
  },
  /**
   * sbjs_first (equal to sbjs_current)
   *
   * typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29
   */
  utm: {
    // sbjs.get.first.src
    source :'direct',
    // sbjs.get.first.mdm
    channel: 'none',
    // sbjs.get.first.cmp
    company: 'none',
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
