import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';
import { v4 } from 'uuid';
import { getUserLocale } from 'get-user-locale';
import TagManager from 'react-gtm-module-defer';
import amplitude from 'amplitude-js';


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

export const initAmplitude = (
  userId?: string | undefined,
  config?: amplitude.Config | undefined,
  callback?: (client: amplitude.AmplitudeClient) => void
) => {
  const { REACT_APP_AMPLITUDE_API_KEY } = process.env;

  if (REACT_APP_AMPLITUDE_API_KEY) {
    amplitude.getInstance()?.init(
      REACT_APP_AMPLITUDE_API_KEY,
      userId,
      config,
      callback
    );
    console.log("🚀 ~ file: logEvent.ts:43 ~ amplitude.getInstance():", amplitude.getInstance());
  }
};

export const setAmplitudeUserDevice = (installationToken: string | undefined | null) => {
  installationToken && amplitude.getInstance()?.setDeviceId(installationToken);
};

export const setAmplitudeUserId = (userId: string | null):void => {
  amplitude.getInstance()?.setUserId(userId);
};

export const setAmplitudeUserProperties = (properties: any):void => {
  amplitude.getInstance()?.setUserProperties(properties);
};

export const sendAmplitudeData = (
  eventType: string,
  eventProperties?: any,
  callback?: amplitude.Callback | undefined,
  errorCallback?: amplitude.Callback | undefined,
  outOfSession?: boolean | undefined
): void => {
  amplitude.getInstance()?.logEvent(eventType, eventProperties, callback, errorCallback, outOfSession);
};