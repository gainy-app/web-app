import { signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { appleProvider, auth, googleProvider } from '../firebase';
import { onAuthChange } from 'services/auth';
import {  useMutation, useQuery } from '@apollo/client';
import { CREATE_APP_LINK, GET_APP_PROFILE } from '../services/gql/queries';
import { logFirebaseEvent, sendAmplitudeData } from 'utils/logEvent';

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
  const { data: appId, loading: addIdLoading } = useQuery(GET_APP_PROFILE, {
    skip: !currentUser
  });
  const [appLink, { data, loading: appLinkLoading }] = useMutation(CREATE_APP_LINK);
  const appLinkAppId =  data?.insert_app_profiles?.returning?.find((i: any) => i?.id)?.id;
  const appIdAppId = appId?.app_profiles?.find((i: any) => i?.id)?.id;
  const isTreadingEnabled =  appId || appLinkAppId;

  async function logout() {
    await auth.signOut();
  }

  async function signInWithGoogle ()  {
    try {
      logFirebaseEvent('sign_in_clicked', currentUser, appId, { accountType: 'google' });
      sendAmplitudeData('sign_in_clicked', { accountType: 'google' });
      await signInWithPopup(auth, googleProvider);
      logFirebaseEvent('authorization_fully_authorized', currentUser, appId, { accountType: 'google' });
      sendAmplitudeData('authorization_fully_authorized', { accountType: 'google' });
    } catch (err: any) {
      console.error(err);
      logFirebaseEvent('authorization_failed', currentUser, appId, { accountType: 'google', errorType: err.message });
      sendAmplitudeData('authorization_failed', { accountType: 'google', errorType: err.message });
    }
  }

  async function signInWithApple () {
    try {
      logFirebaseEvent('sign_in_clicked', currentUser, appId, { accountType: 'apple' });
      sendAmplitudeData('sign_in_clicked', { accountType: 'apple' });
      await signInWithPopup(auth, appleProvider);
      logFirebaseEvent('authorization_fully_authorized', currentUser, appId, { accountType: 'apple' });
      sendAmplitudeData('authorization_fully_authorized', { accountType: 'apple' });
    } catch (err: any) {
      console.error(err);
      logFirebaseEvent('authorization_failed', currentUser, appId, { accountType: 'apple', errorType: err.message });
      sendAmplitudeData('authorization_failed', { accountType: 'apple', errorType: err.message });
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
      !addIdLoading && (!appId || appId.app_profiles?.length === 0) &&
      !appIdAppId &&
      currentUser &&
      currentUser.displayName
    ) {
      const [firstName, lastName] = currentUser.displayName.split(' ');

      logFirebaseEvent('authorization_need_create_profile', currentUser, appId);
      sendAmplitudeData('authorization_need_create_profile');

      appLink({
        variables: {
          email: currentUser.email,
          firstName,
          lastName,
          userID: currentUser.uid
        }
      }).then(() => {
        logFirebaseEvent('sign_up_success', currentUser, appId);
        sendAmplitudeData('sign_up_success');
      }).catch(() => {
        logFirebaseEvent('sign_up_failed', currentUser, appId);
        sendAmplitudeData('sign_up_failed');
      });


    }
  }, [addIdLoading, isRefreshTokenLoaded]);

  const value = {
    currentUser,
    logout,
    signInWithGoogle,
    loading: userLoading,
    signInWithApple,
    appId: appIdAppId || appLinkAppId,
    appIdLoading: addIdLoading || appLinkLoading,
    isTreadingEnabled
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
