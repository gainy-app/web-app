import { signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { appleProvider, auth, googleProvider } from '../firebase';
import { onAuthChange } from 'services/auth';
import {  useMutation, useQuery } from '@apollo/client';
import { CREATE_APP_LINK, GET_APP_PROFILE } from '../services/gql/queries';
import { sendEvent } from 'utils/logEvent';

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
      sendEvent('sign_in_clicked', currentUser?.uid, appId, { accountType: 'google' });
      await signInWithPopup(auth, googleProvider);
      sendEvent('authorization_fully_authorized', currentUser?.uid, appId, { accountType: 'google' });
    } catch (err: any) {
      console.error(err);
      sendEvent('authorization_failed', currentUser?.uid, appId, { accountType: 'google', errorType: err.message });
    }
  }

  async function signInWithApple () {
    try {
      sendEvent('sign_in_clicked', currentUser?.uid, appId, { accountType: 'apple' });
      await signInWithPopup(auth, appleProvider);
      sendEvent('authorization_fully_authorized', currentUser?.uid, appId, { accountType: 'apple' });
    } catch (err: any) {
      console.error(err);
      sendEvent('authorization_failed', currentUser?.uid, appId, { accountType: 'apple', errorType: err.message });
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

      sendEvent('authorization_need_create_profile', currentUser?.uid, appId);

      appLink({
        variables: {
          email: currentUser.email,
          firstName,
          lastName,
          userID: currentUser.uid
        }
      }).then(() => {
        sendEvent('sign_up_success', currentUser?.uid, appId);
      }).catch(() => {
        sendEvent('sign_up_failed', currentUser?.uid, appId);
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
