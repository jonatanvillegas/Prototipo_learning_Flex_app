import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDlFeKxKQmW7eTyJNtrqCMTJ_pcluBGVhE",
  authDomain: "learningflex-60ce0.firebaseapp.com",
  projectId: "learningflex-60ce0",
  storageBucket: "learningflex-60ce0.appspot.com",
  messagingSenderId: "365966381185",
  appId: "1:365966381185:web:22560b817ac8afbb027d80",
  measurementId: "G-GTQ6HM15JG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {app, auth,db}