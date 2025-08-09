import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../App';
import { NAV_LINKS, ICONS } from '../../constants';
import { useAuth } from '../../App';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { logout } = useAuth();

  return (
    <header className="bg-stone-50/80 backdrop-blur-sm sticky top-0 z-40 border-b border-stone-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/start" className="flex items-center gap-2">
            <ICONS.Logo />
            <span className="text-xl font-bold text-stone-800">PacketNet</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-stone-600 hover:text-cyan-600 transition-colors ${
                    isActive ? 'text-cyan-600 font-semibold' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-stone-600 hover:text-cyan-500">
              <ICONS.ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="text-stone-600 hover:text-cyan-500">
              <ICONS.User className="w-6 h-6" />
            </Link>
            <button onClick={logout} className="text-stone-600 hover:text-red-500" title="Logout">
                <ICONS.Logout className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;