// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB42s3aGKuuMHZJMLHyjTR_2qHcRWPr35c",
  authDomain: "todo-1a3b4.firebaseapp.com",
  projectId: "todo-1a3b4",
  storageBucket: "todo-1a3b4.appspot.com",
  messagingSenderId: "992709605197",
  appId: "1:992709605197:web:58a53c414fc48732ed2904",
  measurementId: "G-X3S9L4HBMG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
