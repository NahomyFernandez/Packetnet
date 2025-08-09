import React, { useState } from 'react';
import { ICONS } from '../constants';
import { useAuth } from '../App';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would validate credentials here.
        if (email && password) {
            login();
        } else {
            alert("Please enter email and password.");
        }
    };
    
    // Mock Google login
    const handleGoogleLogin = () => {
        login();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                        <ICONS.Logo />
                        <h1 className="text-3xl font-bold text-stone-900">PacketNet</h1>
                    </div>
                    <p className="text-stone-600">Bienvenido de nuevo</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">Correo electrónico</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-stone-50 text-stone-900"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-stone-700">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-stone-50 text-stone-900"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                            ¿Olvidaste tu contraseña?
                        </a>
                         <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                            ¿No tienes una cuenta? Regístrate
                        </a>
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                       Iniciar Sesión
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-stone-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-stone-500">o</span>
                    </div>
                </div>

                <div>
                     <Button
                        type="button"
                        onClick={handleGoogleLogin}
                        variant="secondary"
                        className="w-full flex justify-center items-center gap-2"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8S109.8 11.8 244 11.8c70.3 0 129.5 28.3 173.4 72.4l-63.5 61.9C324.4 122.3 287 99.8 244 99.8c-67.2 0-121.5 54.3-121.5 121.5s54.3 121.5 121.5 121.5c73.8 0 109.8-32.7 114.8-77.4H244V202.9h234.3c2.6 13.2 4.7 27.6 4.7 42.9z"></path></svg>
                        Continuar con Google
                    </Button>
                </div>
            </div>
            <p className="mt-8 text-center text-sm text-stone-500">
                PacketNet: Conectividad y Rendimiento Garantizado con Cisco.
            </p>
        </div>
    );
};

export default LoginPage;