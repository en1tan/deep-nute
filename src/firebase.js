// src/firebase.js
import firebase from 'firebase';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAnlw3A415rQbDsNBzRJiJn8UVpU5Hp_SI",
  authDomain: "deep-nute.firebaseapp.com",
  databaseURL: "https://deep-nute.firebaseio.com",
  projectId: "deep-nute",
  storageBucket: "deep-nute.appspot.com",
  messagingSenderId: "650367536865",
  appId: "1:650367536865:web:b918402fa610873ab4b1a0",
  measurementId: "G-CYQSW9J1EV"
};
// Initialize Firebase
firebase.initializeApp(config);

// Add Google Auth
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;