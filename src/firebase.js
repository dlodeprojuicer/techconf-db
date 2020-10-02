// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/storage";
import "firebase/database";


var firebaseConfig = {
  apiKey: "AIzaSyA3LPByxDChFePmbkhK7EUIVr8o4b37U3s",
  authDomain: "techconf-db.firebaseapp.com",
  databaseURL: "https://techconf-db.firebaseio.com",
  projectId: "techconf-db",
  storageBucket: "techconf-db.appspot.com",
  messagingSenderId: "85418644814",
  appId: "1:85418644814:web:d135328d7a9dd4e1f67a1f",
  measurementId: "G-P8TJKFVZF8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
