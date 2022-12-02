// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpDTs6TT1Nohf8UVwyvISrbT4UhxYHGMk",
  authDomain: "baby-monitor-b4997.firebaseapp.com",
  projectId: "baby-monitor-b4997",
  storageBucket: "baby-monitor-b4997.appspot.com",
  messagingSenderId: "460037885108",
  appId: "1:460037885108:web:6489ed471d0d33ce451be1",
  measurementId: "G-HFDZDQEJ6H",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {console.log(result)})
    .catch((error) => {
      console.log(error);
    });
};

