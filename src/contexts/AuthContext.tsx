import { signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { appleProvider, auth, googleProvider } from '../firebase';
import { onAuthChange } from 'services/auth';
import {  useMutation, useQuery } from '@apollo/client';
import { CREATE_APP_LINK, GET_APP_PROFILE } from '../services/gql/queries';
import { initAmplitude, sendEvent } from 'utils/logEvent';
import { getDeviceId } from 'utils/helpers';

interface IAuthContext {
  currentUser: FirebaseUser | null,
  logout: () => void
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  loading: boolean,
  appId: any
  appIdLoading: boolean
  isTreadingEnabled: any
}

const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  logout: () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  loading: true,
  appId: {},
  appIdLoading: false,
  isTreadingEnabled: {}
});

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isRefreshTokenLoaded, setIsRefreshTokenLoaded] = useState(false);
  const { data: appIdData, loading: addIdLoading } = useQuery(GET_APP_PROFILE, {
    skip: !currentUser
  });
  const [appLink, { data, loading: appLinkLoading }] = useMutation(CREATE_APP_LINK);
  const appLinkAppId =  data?.insert_app_profiles?.returning?.find((i: any) => i?.id)?.id;
  const appIdAppId = appIdData?.app_profiles?.find((i: any) => i?.id)?.id;
  const isTreadingEnabled =  appIdData || appLinkAppId;
  const appId = appIdAppId || appLinkAppId;

  const reinitAmplitude = () => {
    const appIdString = appId.toString();
    let newUserId = appIdString;

    while (newUserId.length < 5) {
      newUserId = '0' + newUserId;
    }
    const urlParams = new URLSearchParams(window.location.search);

    initAmplitude({
      userId: newUserId,
      config: {
        includeUtm: true,
        includeReferrer: true,
        includeFbclid: true,
        includeGclid: true,
        deviceId: getDeviceId(urlParams.get('deviceId')),
      }
    });
  };

  async function logout() {
    await auth.signOut();
  }

  async function signInWithGoogle ()  {
    try {
      sendEvent('sign_in_clicked', currentUser?.uid, appIdData, { accountType: 'google' });
      await signInWithPopup(auth, googleProvider);
      reinitAmplitude();
      sendEvent('authorization_fully_authorized', currentUser?.uid, appIdData, { accountType: 'google' });
    } catch (err: any) {
      console.error(err);
      sendEvent('authorization_failed', currentUser?.uid, appIdData, { accountType: 'google', errorType: err.message });
    }
  }

  async function signInWithApple () {
    try {
      sendEvent('sign_in_clicked', currentUser?.uid, appIdData, { accountType: 'apple' });
      await signInWithPopup(auth, appleProvider);
      reinitAmplitude();
      sendEvent('authorization_fully_authorized', currentUser?.uid, appIdData, { accountType: 'apple' });
    } catch (err: any) {
      console.error(err);
      sendEvent('authorization_failed', currentUser?.uid, appIdData, { accountType: 'apple', errorType: err.message });
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => onAuthChange({
        user,
        setCurrentUser,
        setUserLoading,
        setIsRefreshTokenLoaded
      })
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (
      isRefreshTokenLoaded &&
      !addIdLoading && (!appIdData || appIdData.app_profiles?.length === 0) &&
      !appIdAppId &&
      currentUser &&
      currentUser.displayName
    ) {
      const [firstName, lastName] = currentUser.displayName.split(' ');

      sendEvent('authorization_need_create_profile', currentUser?.uid, appIdData);

      appLink({
        variables: {
          email: currentUser.email,
          firstName,
          lastName,
          userID: currentUser.uid
        }
      }).then(()=>{
        reinitAmplitude();
        sendEvent('sign_up_success', currentUser?.uid, appId);
      }).catch(() => {
        sendEvent('sign_up_failed', currentUser?.uid, appIdData);
      });


    }
  }, [addIdLoading, isRefreshTokenLoaded]);

  const value = {
    currentUser,
    logout,
    signInWithGoogle,
    loading: userLoading,
    signInWithApple,
    appId,
    appIdLoading: addIdLoading || appLinkLoading,
    isTreadingEnabled
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
