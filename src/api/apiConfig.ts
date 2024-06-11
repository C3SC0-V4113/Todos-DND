import { FirebaseError, FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseErrorMessages } from "./utils/firebaseErrorMessages";

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = import.meta.env;

const apiConfig: FirebaseOptions = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

export const FirebaseApp = initializeApp(apiConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);

export const handleFirebaseError = (error: FirebaseError): string => {
  if (error && error.code) {
    return firebaseErrorMessages[error.code] || "An unknown error occurred.";
  }
  return "An error occurred.";
};
