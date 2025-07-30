// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSTdQ5eujcHxA4uG63cw_qsyXaKGqbbTY",
  authDomain: "fabbs-417dd.firebaseapp.com",
  projectId: "fabbs-417dd",
  storageBucket: "fabbs-417dd.appspot.com",
  messagingSenderId: "844456476161",
  appId: "1:844456476161:web:8fade7229967ebe9358a00",
  measurementId: "G-ZF4LYR3Q6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);
export { auth, provider,storage, firestore };