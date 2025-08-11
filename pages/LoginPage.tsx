import React, { useState } from 'react';
import { ICONS } from '../constants';
import { useAuth } from '../App';
import Button from '../components/ui/Button';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

const LoginPage: React.FC = () => {
    // Ya no necesitas 'useAuth' aquí para el login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Para mostrar errores

    // 2. Actualiza la función de login con correo y contraseña
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpia errores previos
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                // No necesitas llamar a login() aquí. onAuthStateChanged lo hará por ti.
            } catch (err: any) {
                setError("Error: " + err.message);
            }
        } else {
            setError("Por favor, ingresa correo y contraseña.");
        }
    };
    
    // 3. Implementa el login con Google
    const handleGoogleLogin = async () => {
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Igual que antes, onAuthStateChanged se encargará del resto.
        } catch (err: any) {
             setError("Error al iniciar con Google: " + err.message);
        }
    };
    
    // 4. (Opcional pero recomendado) Añade una función de registro
    const handleSignUp = async () => {
        setError(null);
        if (email && password) {
             try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err: any) {
                setError("Error al registrar: " + err.message);
            }
        } else {
            setError("Por favor, ingresa correo y contraseña para registrarte.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                 {/* ... */}
                <form className="space-y-6" onSubmit={handleLogin}>
                    {/* ... campos de email y password ... */}
                    
                    <div className="flex items-center justify-between text-sm">
                        <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                            ¿Olvidaste tu contraseña?
                        </a>
                         {/* 5. Conecta la función de registro */}
                         <button type="button" onClick={handleSignUp} className="font-medium text-cyan-600 hover:text-cyan-500">
                            ¿No tienes una cuenta? Regístrate
                        </button>
                    </div>

                    {/* Muestra mensajes de error */}
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <Button type="submit" variant="primary" className="w-full">
                       Iniciar Sesión
                    </Button>
                </form>

                {/* ... */}

                <div>
                     <Button
                        type="button"
                        onClick={handleGoogleLogin} // <- Llama a la nueva función
                        variant="secondary"
                        className="w-full flex justify-center items-center gap-2"
                    >
                        {/* ... icono de google ... */}
                        Continuar con Google
                    </Button>
                </div>
            </div>
            {/* ... */}
        </div>
    );
};


export default LoginPage;