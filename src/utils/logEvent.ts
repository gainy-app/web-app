import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';
import { v4 } from 'uuid';
import { getUserLocale } from 'get-user-locale';
import TagManager from 'react-gtm-module-defer';
import amplitude from 'amplitude-js';


export const sendEvent = (
  content: string,
  userId?: string,
  appId?: number,
  params?: any,
  callback?: amplitude.Callback | undefined,
  errorCallback?: amplitude.Callback | undefined,
  outOfSession?: boolean | undefined
) => {
  logFirebaseEvent(content, userId, appId, params);
  sendAmplitudeData(content, params, callback, errorCallback, outOfSession);
};

export const logFirebaseEvent = (content:string, userId='', appId?: number, params?: any) => {
  logEvent(analytics, content, {
    ...params,
    v: 1,
    tid: v4(),
    source: 'webapp',
    av: '0.1.0',
    an: '0.1.0',
    ul: getUserLocale(),
    vp: `${window.innerHeight}x${window.innerWidth}`,
    uid: userId,
    user_id: appId?.toString() || 'anonymous',
    profileId: appId,
    date: Date.now()
  });
};

export const sendGoogleDataLayerEvent = (eventName: string, userId: any, dataLayer = {}) => {
  TagManager.dataLayer({ dataLayer: {
    ...dataLayer,
    event: eventName,
    user_id: userId
  } });
};

export const initAmplitude = ({ userId, config, callback } : {
  userId?: string | undefined,
  config?: amplitude.Config | undefined,
  callback?: (client: amplitude.AmplitudeClient) => void
}) => {
  const { REACT_APP_AMPLITUDE_API_KEY } = process.env;

  if (REACT_APP_AMPLITUDE_API_KEY) {
    amplitude.getInstance()?.init(
      REACT_APP_AMPLITUDE_API_KEY,
      userId,
      config,
      callback
    );
  } else {
    console.warn('can\'t initialize amplitude, because AMPLITUDE_API_KEY env. variable is missing');
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