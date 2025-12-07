// frontend/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBYGKQIf6-dDClOeO2thFQANPXF-glnu9Q",
  authDomain: "studentportalriphah.firebaseapp.com",
  databaseURL: "https://studentportalriphah-default-rtdb.firebaseio.com",
  projectId: "studentportalriphah",
  storageBucket: "studentportalriphah.firebasestorage.app",
  messagingSenderId: "44054193220",
  appId: "1:44054193220:web:7a7c9118af68ce8f440811"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase services
export { auth };
export const database = getDatabase(app);

export default app;