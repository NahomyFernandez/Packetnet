import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ICONS } from '../constants';
import Button from '../components/ui/Button';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../App'; // Importamos el hook de autenticación

const RegisterPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Si el usuario ya está autenticado, lo redirigimos
    if (isAuthenticated) {
        return <Navigate to="/start" />;
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(null);
        if (email && password) {
             try {
                await createUserWithEmailAndPassword(auth, email, password);
                // El onAuthStateChanged en App.tsx se encargará de redirigir
            } catch (err: any) {
                setError(getFirebaseErrorMessage(err.code));
            }
        } else {
            setError("Por favor, ingresa correo y contraseña para registrarte.");
        }
        setIsSubmitting(false);
    }
    
    // Función para traducir los errores de Firebase a mensajes amigables
    const getFirebaseErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'El formato del correo electrónico no es válido.';
            case 'auth/email-already-in-use':
                return 'Este correo electrónico ya está registrado.';
            case 'auth/weak-password':
                return 'La contraseña debe tener al menos 6 caracteres.';
            default:
                return 'Ocurrió un error. Por favor, inténtalo de nuevo.';
        }
    };

    return (
        <div className="min-h-screen flex bg-stone-50">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                        <ICONS.Logo />
                        <h1 className="text-3xl font-bold text-stone-900">PacketNet</h1>
                    </div>
                    <h2 className="text-2xl font-semibold text-stone-800">Crea tu cuenta</h2>
                    <p className="text-stone-600 mt-2 mb-8">Únete para acceder al mejor equipo de red.</p>

                    <form className="space-y-5" onSubmit={handleSignUp} noValidate>
                        <div className="relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </span>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="correo@ejemplo.com"
                                className="pl-10 mt-1 block w-full px-3 py-2.5 border border-stone-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </span>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña (mínimo 6 caracteres)"
                                className="pl-10 mt-1 block w-full px-3 py-2.5 border border-stone-300 rounded-md shadow-sm"
                            />
                        </div>

                        {error && <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">{error}</p>}

                        <Button type="submit" variant="primary" className="w-full !py-3" disabled={isSubmitting}>
                           {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </Button>
                    </form>

                     <p className="mt-8 text-center text-sm text-stone-500">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-semibold text-cyan-600 hover:text-cyan-500">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>
             <div 
                className="hidden lg:flex w-1/2 items-center justify-center p-12 bg-cover bg-center"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            >
                <div className="w-full max-w-md text-center text-white bg-cyan-900/60 backdrop-blur-sm p-8 rounded-xl">
                    <h2 className="text-4xl font-bold leading-tight">Conectividad y Rendimiento Garantizado</h2>
                    <p className="mt-4 text-lg text-cyan-100">
                        Regístrate para adquirir los mejores equipos Cisco y recibe asesoría de expertos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;