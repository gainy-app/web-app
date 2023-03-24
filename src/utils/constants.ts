export const routes = {
  signIn: '/sign-in',
  notFound: '*',
  home: '/',
  getApp: '/get-the-app',
  success: '/success',
  notify: '/notify'
};

export const imageTypes = {
  logo: 'logo',
  car: 'car',
  apple: 'apple',
  google: 'google',
  logoWhite: 'logoWhite',
  divider: 'divider',
  arrow: 'arrow',
  arrowDropdown: 'arrowDropdown',
  shield: 'shield',
  checkbox: 'checkbox',
  line: 'line'
};

export const accessConst = {
  'trading_access': 'arie3IBiep6phai7ieg4Eej0ShahJaaB'
};

export const phoneMasks = {
  us: 'us'
};

export const regExps = {
  email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
};

/**
 * sbjs_first (equal to sbjs_current)
 *
 * typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29
 */
export const utmConfig = {
  // sbjs.get.first.src
  source: 'direct',
  // sbjs.get.first.mdm
  channel: 'none',
  // sbjs.get.first.cmp
  company: 'none',
};