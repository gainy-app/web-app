import { getAuth, User as FirebaseUser } from 'firebase/auth';

type IonAuthChange = (user: FirebaseUser | null,
  setUser: (user:FirebaseUser | null) => void,
  setLoading: (erg: boolean) => void,
  appIdCondition: boolean,
  appLink: any
  ) => void

export const onAuthChange: IonAuthChange = (user, setUser, setLoading, appIdCondition, appLink) => {
  const auth = getAuth();
  setLoading(true);

  if(user) {
    setUser(user);
    setLoading(false);

    user.getIdToken()
      .then(token => auth.currentUser?.getIdTokenResult()
        .then(result => {
          sessionStorage.setItem('uid', user?.uid);
          if(result.claims['https://hasura.io/jwt/claims']) {
            return token;
          }
          return refreshToken(user);
        }))
      .then(res => {
        if(res) {
          const [tempUser, ...rest] = user.displayName?.split(' ') || [];
          if(!appIdCondition) {
            appLink({ variables: {
              email: user.email,
              firstName: tempUser,
              lastName: String(rest),
              userID: user.uid
            } });
          }
          localStorage.setItem('token', res);
        }
      })
      .catch(rej => console.log(rej));
  } else {
    setUser(null);
  }
  setLoading(false);
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