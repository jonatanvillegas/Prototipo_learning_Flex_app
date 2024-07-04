import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_NATIVE_API_KEY,
  authDomain: process.env.REACT_NATIVE_AUTH_DOMAIN,
  projectId: process.env.REACT_NATIVE_PROJECT_ID,
  storageBucket: process.env.REACT_NATIVE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_NATIVE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_NATIVE_APP_ID,
  measurementId: process.env.REACT_NATIVE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {app, auth,db}