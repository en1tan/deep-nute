// src/firebase.js
import firebase from 'firebase';
// Import dotenv
require('dotenv').config();


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "deep-nute.firebaseapp.com",
  databaseURL: "https://deep-nute.firebaseio.com",
  projectId: "deep-nute",
  storageBucket: "deep-nute.appspot.com",
  messagingSenderId: "650367536865",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-CYQSW9J1EV"
};
// Initialize Firebase
firebase.initializeApp(config);

// Add Google Auth
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;