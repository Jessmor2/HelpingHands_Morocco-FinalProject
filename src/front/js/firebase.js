import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6U39tMjmiuhehKIYC92cxl4Y7SFfRAy8",
  authDomain: "fund-raising-app-a1439.firebaseapp.com",
  projectId: "fund-raising-app-a1439",
  storageBucket: "fund-raising-app-a1439.appspot.com",
  messagingSenderId: "1046209162926",
  appId: "1:1046209162926:web:b9fb99cfef1250a35c073f",
  // measurementId: "G-B9603372N1"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };