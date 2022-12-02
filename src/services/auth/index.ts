import { getAuth, User as FirebaseUser } from 'firebase/auth';

type IonAuthChange = (user: FirebaseUser | null, setUser: (user:FirebaseUser | null) => void, setLoading: (erg: boolean) => void, appLink: any) => void

export const onAuthChange: IonAuthChange = (user, setUser, setLoading, appLink) => {
  const auth = getAuth();
  setLoading(true);

  if(user) {
    setUser(user);
    setLoading(false);
    // appLink()
    user.getIdToken()
      .then(token => auth.currentUser?.getIdTokenResult()
        .then(result => {
          if(result.claims['https://hasura.io/jwt/claims']) {
            return token;
          }
          return refreshToken(user);
        }))
      .then(res => {
        res &&
        localStorage.setItem('token', res);
      })
      .catch(rej => console.log(rej));
  } else {
    setUser(null);
  }
  setLoading(false);
};

export const refreshToken = (user: FirebaseUser) => {
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