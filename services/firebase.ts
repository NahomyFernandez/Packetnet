// services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Exporta el servicio de autenticación para usarlo en otras partes de la app
export const auth = getAuth(app);