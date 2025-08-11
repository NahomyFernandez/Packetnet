import React, { useState } from 'react';
import { ICONS } from '../constants';
import Button from '../components/ui/Button';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

const LoginPage: React.FC = () => {
    // La lógica de autenticación permanece sin cambios.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(null);
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (err: any) {
                setError(getFirebaseErrorMessage(err.code));
            }
        } else {
            setError("Por favor, ingresa correo y contraseña.");
        }
        setIsSubmitting(false);
    };
    
    const handleGoogleLogin = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            setError(getFirebaseErrorMessage(err.code));
        }
        setIsSubmitting(false);
    };
    
    const handleSignUp = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(null);
        if (email && password) {
             try {
                await createUserWithEmailAndPassword(auth, email, password);
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
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                 return 'Correo electrónico o contraseña incorrectos.';
            case 'auth/email-already-in-use':
                return 'Este correo electrónico ya está registrado.';
            case 'auth/weak-password':
                return 'La contraseña debe tener al menos 6 caracteres.';
            case 'auth/popup-closed-by-user':
                return 'El proceso de inicio de sesión fue cancelado.';
            default:
                return 'Ocurrió un error. Por favor, inténtalo de nuevo.';
        }
    };

    return (
        <div className="min-h-screen flex bg-stone-50">
            {/* Columna del Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                        <ICONS.Logo />
                        <h1 className="text-3xl font-bold text-stone-900">PacketNet</h1>
                    </div>
                    <h2 className="text-2xl font-semibold text-stone-800">Bienvenido de nuevo</h2>
                    <p className="text-stone-600 mt-2 mb-8">Ingresa a tu cuenta para gestionar tus equipos de red.</p>

                    <form className="space-y-5" onSubmit={handleLogin} noValidate>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="correo@ejemplo.com"
                                className="pl-10 mt-1 block w-full px-3 py-2.5 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-stone-50 text-stone-900"
                            />
                        </div>

                        <div className="relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="pl-10 mt-1 block w-full px-3 py-2.5 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-stone-50 text-stone-900"
                            />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                            <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">{error}</p>}

                        <Button type="submit" variant="primary" className="w-full !py-3" disabled={isSubmitting}>
                           {isSubmitting ? 'Procesando...' : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-stone-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-stone-500">o continúa con</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                         <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            variant="secondary"
                            className="w-full flex justify-center items-center gap-3 !py-3"
                            disabled={isSubmitting}
                        >
                            <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8S109.8 11.8 244 11.8c70.3 0 129.5 28.3 173.4 72.4l-63.5 61.9C324.4 122.3 287 99.8 244 99.8c-67.2 0-121.5 54.3-121.5 121.5s54.3 121.5 121.5 121.5c73.8 0 109.8-32.7 114.8-77.4H244V202.9h234.3c2.6 13.2 4.7 27.6 4.7 42.9z"></path></svg>
                            Google
                        </Button>
                    </div>

                     <p className="mt-8 text-center text-sm text-stone-500">
                        ¿No tienes una cuenta?{' '}
                        <button onClick={handleSignUp} className="font-semibold text-cyan-600 hover:text-cyan-500" disabled={isSubmitting}>
                            Regístrate aquí
                        </button>
                    </p>
                </div>
            </div>
            {/* Columna de Branding */}
            <div 
                className="hidden lg:flex w-1/2 items-center justify-center p-12 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            >
                <div className="w-full max-w-md text-center text-white bg-cyan-900/60 backdrop-blur-sm p-8 rounded-xl">
                    <h2 className="text-4xl font-bold leading-tight">Conectividad y Rendimiento Garantizado</h2>
                    <p className="mt-4 text-lg text-cyan-100">
                        Accede a nuestra plataforma para adquirir los mejores equipos Cisco y recibe asesoría de expertos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
