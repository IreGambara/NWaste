// Import the functions you need from the SDKs you need
import { firebase } from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAJQ6mYO0ArAyfk_m6UKHaCfqJNPQ7sftg",
  authDomain: "nwaste-app.firebaseapp.com",
  projectId: "nwaste-app",
  storageBucket: "nwaste-app.appspot.com",
  messagingSenderId: "381158578835",
  appId: "1:381158578835:web:22dfd911965ada8e3ccb66"
};

const app = initializeApp(firebaseConfig)
export const db =  getFirestore(app)
export const auth = getAuth(app)
