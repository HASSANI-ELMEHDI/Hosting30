import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBFpJ9uLpcep5bQwkBruNLn4EiqBQvHeYI",
    authDomain: "hosting30.firebaseapp.com",
    projectId: "hosting30",
    storageBucket: "hosting30.appspot.com",
    messagingSenderId: "356821213872",
    appId: "1:356821213872:web:34b8b0ac9db6f065765175",
    measurementId: "G-EZXSJ7BG3W"
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};