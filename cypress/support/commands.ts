import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: Cypress.env('FIREBASE_API_KEY'),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
