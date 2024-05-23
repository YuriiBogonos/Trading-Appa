import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCFD1korrSkkGp0MWvQnKuzdE_HENpk9u0',
  authDomain: 'traiding-app.firebaseapp.com',
  projectId: 'traiding-app',
  databaseURL: 'https://traiding-app-default-rtdb.firebaseio.com/',
  storageBucket: 'traiding-app.appspot.com',
  messagingSenderId: '694957989762',
  appId: '1:694957989762:web:f06d8a61ab809004b6399b',
  measurementId: 'G-1JQ3Z0EE7M',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
