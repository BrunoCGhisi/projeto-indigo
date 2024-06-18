import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, deleteDoc, addDoc} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Mudar pro nosso banco
const firebaseConfig = {
  apiKey: "AIzaSyDi3bsKx7K0YIlzhNsX4rkVPdxTBP_ukXs",
  authDomain: "task-53ab8.firebaseapp.com",
  projectId: "task-53ab8",
  storageBucket: "task-53ab8.appspot.com",
  messagingSenderId: "175721793207",
  appId: "1:175721793207:web:4db623c38c67ee1f14af32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const database = getFirestore(app);  /* chamando o banco de dados que criamos */
const auth = getAuth(); // para fazer a autenticação

export {database, collection, doc, deleteDoc, addDoc, auth, onAuthStateChanged}; 
