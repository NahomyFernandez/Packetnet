import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinkIconProps {
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const NavLinkIcon: React.FC<NavLinkIconProps> = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'bg-cyan-600 text-white'
            : 'text-stone-600 hover:bg-stone-100 hover:text-cyan-700'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </NavLink>
  );
};

export default NavLinkIcon;