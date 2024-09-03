// Import the functions you need from the SDKs you need

import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU1F7336YA3I3VdHKx5JM10ty5tQxFHZQ",
  authDomain: "sykoti.firebaseapp.com",
  databaseURL: "https://sykoti-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sykoti",
  storageBucket: "sykoti.appspot.com",
  messagingSenderId: "96492002224",
  appId: "1:96492002224:web:b84694532eab387ffb1475",
  measurementId: "G-TG3P4NR0PV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initualize Firestore
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth();
const storage = getStorage(app);


export { db, auth , storage};
export default app;