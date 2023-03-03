import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';
import { v4 } from 'uuid';
import { getUserLocale } from 'get-user-locale';
import TagManager from 'react-gtm-module-defer';

export const logFirebaseEvent = (content:string, currentUser?: any, appId?: number, params?: any) => {
  logEvent(analytics, content, {
    ...params,
    v: 1,
    tid: v4(),
    source: 'web',
    av: '0.1.0',
    an: '0.1.0',
    ul: getUserLocale(),
    vp: `${window.innerHeight}x${window.innerWidth}`,
    uid: currentUser?.uid || '',
    user_id: currentUser?.uid || 'anonymous',
    profileId: appId,
    date: Date.now()
  });
};

export const trackEvent = (eventName: string, userId: any, dataLayer = {}) => {
  TagManager.dataLayer({ dataLayer: {
    ...dataLayer,
    event: eventName,
    user_id: userId
  } });
};