// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiS0F7jb7PY_Uiuc4cfuRcKgqCmqigrjg",
  authDomain: "digital-731c4.firebaseapp.com",
  projectId: "digital-731c4",
  storageBucket: "digital-731c4.appspot.com",
  messagingSenderId: "369968582439",
  appId: "1:369968582439:web:3f2fde1e656571d760e302",
  measurementId: "G-ZC6RQ4FY5E"
};

// Initialize Firebase

let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

//const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };