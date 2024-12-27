// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2BmUSbvEd63grQaK_JQYh0k7h283lDak",
  authDomain: "react-chat-app-62f18.firebaseapp.com",
  projectId: "react-chat-app-62f18",
  storageBucket: "react-chat-app-62f18.firebasestorage.app",
  messagingSenderId: "431864553074",
  appId: "1:431864553074:web:60c11205640aaa4910eceb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);