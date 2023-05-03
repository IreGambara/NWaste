// Import the functions you need from the SDKs you need
import { firebase } from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import 'firebase/firestore'
import { addDoc, collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
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

//Per Creare Account
export const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//Per fare Login
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//Password Reset
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//Per fare Logout
export const logout = () => {
  signOut(auth);
}


