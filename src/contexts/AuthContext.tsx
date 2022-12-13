import { signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { appleProvider, auth, googleProvider } from '../firebase';
import { onAuthChange } from 'services/auth';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_APP_LINK, GET_APP_PROFILE } from '../services/gql/queries';
import { Loader } from '../components';

interface IAuthContext {
  currentUser: FirebaseUser | null,
  logout: () => void
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  loading: boolean,
  appId: any
}

const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  logout: () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  loading: true,
  appId: {}
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
  const { data: appId, loading: addIdLoading, error } = useQuery(GET_APP_PROFILE, {
    skip: !currentUser
  });

  const [applink, { data, loading: appLinkLoading }] = useMutation(CREATE_APP_LINK);

  const appLinkAppId =  data?.insert_app_profiles?.returning?.find((i: any) => i?.id)?.id;
  const appIdAppId = appId?.app_profiles?.find((i: any) => i?.id).id;

  async function logout() {
    await auth.signOut();
  }

  const appIdCondition = appIdAppId;

  console.log(appIdCondition);
  console.log(appIdAppId);

  async function signInWithGoogle ()  {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function signInWithApple () {
    try {
      await signInWithPopup(auth, appleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => onAuthChange(
        user,
        setCurrentUser,
        setUserLoading,
        appIdCondition,
        applink
      )
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
    signInWithGoogle,
    loading: userLoading,
    signInWithApple,
    appId: appIdAppId ? appIdAppId : appLinkAppId
  };
  if(addIdLoading || appLinkLoading) return <Loader/>;
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}