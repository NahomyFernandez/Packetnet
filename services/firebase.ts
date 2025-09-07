// services/firebase.ts
import { initializeApp } from "firebase/app";
// 1. IMPORTACIONES NECESARIAS
import { getAuth, browserSessionPersistence, setPersistence } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChtYy2_bpqln4UMwDs4fQdDQlfhVo52GY",
  authDomain: "packetnet.firebaseapp.com",
  projectId: "packetnet",
  storageBucket: "packetnet.firebasestorage.app",
  messagingSenderId: "957651750233",
  appId: "1:957651750233:web:f509aa43640535a89fd048",
  measurementId: "G-PXNSSQKSJJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 2. APLICAMOS LA PERSISTENCIA DE SESIÓN
// Esto asegura que el usuario deba iniciar sesión cada vez que abra el navegador.
setPersistence(auth, browserSessionPersistence)
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });