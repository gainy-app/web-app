import { signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { appleProvider, auth, googleProvider } from '../firebase';
import { onAuthChange } from 'services/auth';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_APP_LINK, GET_APP_PROFILE } from '../services/gql/queries';
import { sendEvent, setAmplitudeUserId } from 'utils/logEvent';
import { getAuthProvider } from 'utils/helpers';

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

  const { data: appProfileData, loading: addIdLoading } = useQuery(GET_APP_PROFILE, {
    skip: !currentUser
  });
  const [appLink, { data, loading: appLinkLoading }] = useMutation(CREATE_APP_LINK);

  const appLinkAppId = useMemo(() => data?.insert_app_profiles?.returning?.find((i: any) => i?.id)?.id, [data]);
  const appIdAppId = useMemo(() => appProfileData?.app_profiles?.find((i: any) => i?.id)?.id, [appProfileData]);
  const isTreadingEnabled = useMemo(() => appProfileData || appLinkAppId, [appProfileData, appLinkAppId]);
  const appId = useMemo(() => appIdAppId || appLinkAppId, [appIdAppId, appLinkAppId]);

  async function logout() {
    setAmplitudeUserId(null);
    localStorage.removeItem('profileId');
    await auth.signOut();
  }

  async function signInWithGoogle ()  {
    try {
      sendEvent('sign_in_clicked', currentUser?.uid, appProfileData, { accountType: 'google' });
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error(err);
      sendEvent('authorization_failed', currentUser?.uid, appProfileData, { accountType: 'google', errorType: err.message });
    }
  }

  async function signInWithApple () {
    try {
      sendEvent('sign_in_clicked', currentUser?.uid, appProfileData, { accountType: 'apple' });
      await signInWithPopup(auth, appleProvider);
    } catch (err: any) {
      console.error(err);
      sendEvent('authorization_failed', currentUser?.uid, appProfileData, { accountType: 'apple', errorType: err.message });
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
    if (!isRefreshTokenLoaded || addIdLoading){
      return;
    }
    if ((!appProfileData || appProfileData.app_profiles?.length === 0) &&
      !appIdAppId &&
      currentUser &&
      currentUser.displayName
    ) {
      const [firstName, lastName] = currentUser.displayName.split(' ');
      sendEvent('authorization_need_create_profile', currentUser?.uid, appProfileData);

      appLink({
        variables: {
          email: currentUser.email,
          firstName,
          lastName,
          userID: currentUser.uid
        }
      }).then(async (response) => {
        const profileAppId = response.data.insert_app_profiles.returning[0].id.toString();

        setAmplitudeUserId(profileAppId.padStart(5,'0'));
        sendEvent('sign_up_success', currentUser?.uid, profileAppId, { accountType: getAuthProvider(currentUser) });
        sendEvent('authorization_fully_authorized', currentUser?.uid, profileAppId, { accountType: getAuthProvider(currentUser) });
        localStorage.setItem('profileId', profileAppId.padStart(5,'0'));
      }).catch(() => {
        sendEvent('sign_up_failed', currentUser?.uid, appProfileData);
      });
    } else {
      if (localStorage.getItem('profileId') !== appIdAppId.toString().padStart(5, '0')) {
        localStorage.setItem('profileId', appIdAppId.toString().padStart(5, '0'));
        setAmplitudeUserId(appIdAppId.toString().padStart(5, '0'));
        sendEvent('authorization_fully_authorized', currentUser?.uid, appIdAppId, { accountType: getAuthProvider(currentUser) });
      }
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
