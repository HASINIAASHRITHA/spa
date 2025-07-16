
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCtFEQM8E-IxtElOPTP3ns05tVmShVAYk4",
  authDomain: "spa11-f3797.firebaseapp.com",
  projectId: "spa11-f3797",
  storageBucket: "spa11-f3797.appspot.com",
  messagingSenderId: "767716007582",
  appId: "1:767716007582:web:e91d51d20b3aecb1c5258f",
  measurementId: "G-JBVLG2TNSD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
