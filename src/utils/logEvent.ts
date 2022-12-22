import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

export const logFirebaseEvent = (content:string, params: any) => {
  logEvent(analytics, content, params);
};