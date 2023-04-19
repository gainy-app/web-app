import { getAuth, User as FirebaseUser } from 'firebase/auth';

type IonAuthChange = ({
  user,
  setCurrentUser,
  setUserLoading,
  setIsRefreshTokenLoaded
}:{
    user: FirebaseUser | null,
    setCurrentUser: (user:FirebaseUser | null) => void,
    setUserLoading: (erg: boolean) => void,
    setIsRefreshTokenLoaded: (isRefreshTokenLoaded: boolean) => void
}) => void;

export const onAuthChange: IonAuthChange = ({ user, setCurrentUser, setUserLoading, setIsRefreshTokenLoaded }) => {
  const auth = getAuth();
  setUserLoading(true);

  if(user) {
    setCurrentUser(user);
    setUserLoading(false);

    user.getIdToken()
      .then(token => auth.currentUser?.getIdTokenResult()
        .then(result => {
          if(result.claims['https://hasura.io/jwt/claims']) {
            return token;
          }
          return refreshToken(user);
        }))
      .then(res => {
        if (res) {
          setIsRefreshTokenLoaded(true);
          localStorage.setItem('token', res);
        }
      })
      .catch(rej => console.log(rej));
  } else {
    setCurrentUser(null);
  }
  setUserLoading(false);
};

export const refreshToken = (user: any) => {
  const endpoint = `https://us-central1-${process.env.REACT_APP_FIREBASE_PROJECT_ID}.cloudfunctions.net/refresh_token`;

  return fetch(`${endpoint}?uid=${user.uid}`)
    .then((res) => {
      if (res.status === 200) {
        return user.getIdToken(true);
      }
      return res.json()
        .then((e) => { throw e; });
    });
};