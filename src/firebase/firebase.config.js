// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxbTGgOs3qFB6ue_xQOpWKfsWGuTejp_g",
  authDomain: "assetverse-website.firebaseapp.com",
  projectId: "assetverse-website",
  storageBucket: "assetverse-website.firebasestorage.app",
  messagingSenderId: "184784282434",
  appId: "1:184784282434:web:94e29144b5b1c22925dedb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);