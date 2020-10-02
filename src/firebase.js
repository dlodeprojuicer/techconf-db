// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/storage";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCYVHk7Vk0lC7GQsWpiEb0nGrj8pxFLKl8",
  authDomain: "oa-munchie.firebaseapp.com",
  databaseURL: "https://oa-munchie.firebaseio.com",
  projectId: "oa-munchie",
  storageBucket: "oa-munchie.appspot.com",
  messagingSenderId: "235160608103",
  appId: "1:235160608103:web:b48a015c158e353846a3c2",
  measurementId: "G-3M83Y8EL1Z"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfigProd);
firebase.initializeApp(firebaseConfig);

export default firebase;
