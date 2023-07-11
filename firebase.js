// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6-IuCwtfrHJsqXPZK3Mem4q3qIi_5dQk",
  authDomain: "connoisseur-fd354.firebaseapp.com",
  databaseURL: "https://connoisseur-fd354-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "connoisseur-fd354",
  storageBucket: "connoisseur-fd354.appspot.com",
  messagingSenderId: "317962503996",
  appId: "1:317962503996:web:ff0b66c7bcccf6ca4e8039",
  measurementId: "G-G7YQSJWNL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);