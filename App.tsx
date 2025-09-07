import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type { Product, CartItem } from './types';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // 1. Importar la nueva página
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import Header from './components/layout/Header';
import ChatWidget from './components/chat/ChatWidget';
import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { auth } from './services/firebase'; 
import { onAuthStateChanged, signOut, User } from 'firebase/auth'; 

// --- CONTEXTS Y PROVIDERS (sin cambios) ---
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  itemCount: number;
  clearCart: () => void;
}


const CartContext = createContext<CartContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth).catch((error) => console.error("Error al cerrar sesión:", error));
  };
  
  const value = useMemo(() => ({ isAuthenticated, user, logout }), [isAuthenticated, user]);
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const clearCart = () => setCart([]);
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } 
       const value = useMemo(() => ({ cart, addToCart, removeFromCart, updateQuantity, itemCount, clearCart }), [cart, itemCount]); 

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, updateQuantity, itemCount }), [cart, itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


// --- HOOKS (sin cambios) ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// --- LAYOUT & ROUTING ---
const AppLayout: React.FC = () => {
    const location = useLocation();
    // Ya no necesitamos la lógica de isLoginPage aquí
    // const isLoginPage = location.pathname === '/login';

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/start" element={<StartPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/start" />} />
                </Routes>
            </main>
            <ChatWidget />
        </div>
    );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirigir a login, pero guardar la ruta a la que se quería acceder
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Main />
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

const Main = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Routes>
            {/* Rutas públicas que no requieren autenticación */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/start" /> : <LoginPage />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/start" /> : <RegisterPage />} /> {/* 2. Añadir la nueva ruta */}

            {/* Rutas protegidas */}
            <Route path="/*" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} />
        </Routes>
    );
};

export default App;