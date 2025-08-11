// services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Importar getFirestore

// Tu configuración de Firebase que ya tenías
const firebaseConfig = {
  apiKey: "AIzaSyChtYy2_bpqln4UMwDs4fQdDQlfhVo52GY",
  authDomain: "packetnet.firebaseapp.com",
  projectId: "packetnet",
  storageBucket: "packetnet.firebasestorage.app",
  messagingSenderId: "957651750233",
  appId: "1:957651750233:web:f509aa43640535a89fd048",
  measurementId: "G-PXNSSQKSJJ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usaremos
export const auth = getAuth(app);
export const db = getFirestore(app); // 2. Inicializar y exportar Firestore