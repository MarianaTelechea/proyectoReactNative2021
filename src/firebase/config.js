import app from "firebase/app";
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA21rOK3LcU4ODqKRyh_dmKmQj2j9CmYXY",
  authDomain: "rn-proyectofinal2021.firebaseapp.com",
  projectId: "rn-proyectofinal2021",
  storageBucket: "rn-proyectofinal2021.appspot.com",
  messagingSenderId: "385373943685",
  appId: "1:385373943685:web:2bb53cabf06716c93b76ec"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();