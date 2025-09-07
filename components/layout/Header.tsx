import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, ICONS } from '../../constants';
import { useCart, useAuth } from '../../App';
import Button from '../ui/Button';
import NavLinkIcon from '../ui/NavLinkIcon';

const Header: React.FC = () => {
    const { itemCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/start" className="flex items-center gap-2">
                    <ICONS.Logo />
                    <span className="text-2xl font-bold text-cyan-700">PacketNet</span>
                </Link>

                <nav className="hidden md:flex items-center gap-4">
                    {NAV_LINKS.map((link) => (
                        <NavLinkIcon key={link.href} to={link.href} icon={link.icon}>
                            {link.name}
                        </NavLinkIcon>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative p-2 rounded-full hover:bg-stone-100 transition-colors">
                        <ICONS.ShoppingCart className="w-6 h-6 text-stone-600" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated ? (
                        <div className="relative group">
                            <Link to="/profile" className="flex items-center gap-2 p-2 rounded-full hover:bg-stone-100 transition-colors">
                                <ICONS.User className="w-6 h-6 text-stone-600" />
                                <span className="hidden sm:inline text-sm font-medium text-stone-700">{user?.email?.split('@')[0]}</span>
                            </Link>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
                                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
                                    <ICONS.User className="w-4 h-4" /> Mi Perfil
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <ICONS.Logout className="w-4 h-4" /> Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="primary">
                                Iniciar Sesión
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;