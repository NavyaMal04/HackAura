import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmH_9t3wIEjvZj3h9Co-muvlstrrAclnA",
  authDomain: "waste-exchange-a94b0.firebaseapp.com",
  projectId: "waste-exchange-a94b0",
  storageBucket: "waste-exchange-a94b0.firebasestorage.app",
  messagingSenderId: "226980807975",
  appId: "1:226980807975:web:169743fab8559313bf1502"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);