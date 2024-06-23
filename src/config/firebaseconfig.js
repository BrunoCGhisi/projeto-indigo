import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Mudar pro nosso banco
const firebaseConfig = {
  apiKey: "AIzaSyAIgFuTyAywbwnVnvBfnha5Bj1KuWOTHts",
  authDomain: "indigo-123.firebaseapp.com",
  projectId: "indigo-123",
  storageBucket: "indigo-123.appspot.com",
  messagingSenderId: "506699494758",
  appId: "1:506699494758:web:23056ab45cc8139d8004a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app); /* chamando o banco de dados que criamos */
const auth = getAuth(app); // para fazer a autenticação
const storage = getStorage(app);
const functions = getFunctions(app);

export {
  database,
  collection,
  doc,
  deleteDoc,
  addDoc,
  auth,
  onAuthStateChanged,
  storage,
  functions,
};
// npm install firebase
