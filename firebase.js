import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ0FUAtlvxITJlTD9uQ_DbjcxKE9iD-SI",

  authDomain: "flashcardapp-cf864.firebaseapp.com",

  projectId: "flashcardapp-cf864",

  storageBucket: "flashcardapp-cf864.appspot.com",

  messagingSenderId: "401680489775",

  appId: "1:401680489775:web:614ef8dc2e25e1106f55da",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, db, googleProvider, githubProvider };
