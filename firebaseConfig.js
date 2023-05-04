import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBDhZW5gyes75qk98HHzL_ftl9WF_m4I0Y",
  authDomain: "hannas-meals.firebaseapp.com",
  databaseURL: "https://hannas-meals-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hannas-meals",
  storageBucket: "hannas-meals.appspot.com",
  messagingSenderId: "206666813787",
  appId: "1:206666813787:web:f97cd4119311e5a4914a7e"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
