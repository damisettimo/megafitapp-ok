import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDmpn_q4jtsRMeoBgu6rPJtmMFpdMoMajM",
  authDomain: "megafit-backend.firebaseapp.com",
  projectId: "megafit-backend",
  storageBucket: "megafit-backend.appspot.com",
  messagingSenderId: "740224167282",
  appId: "1:740224167282:web:8677bf00dd06aa3e1041eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)