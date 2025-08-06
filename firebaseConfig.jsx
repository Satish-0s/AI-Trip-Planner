// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF-uXMGuSoUWMzNKwdnv49-KmK8vla0vM",
  authDomain: "sample-firebase-ai-app-79049.firebaseapp.com",
  projectId: "sample-firebase-ai-app-79049",
  storageBucket: "sample-firebase-ai-app-79049.firebasestorage.app",
  messagingSenderId: "255510662514",
  appId: "1:255510662514:web:7c034fca9e7529eb6de1eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);