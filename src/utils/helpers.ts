import {phoneMasks} from './constants';

export const formatNumber = (phone: string, mask: string) => {
  switch (mask) {
    case phoneMasks.us: {
      return `+1${phone}`;
    }
    default: return phone;
  }
};
