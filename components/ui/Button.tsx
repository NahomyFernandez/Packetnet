import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = 'px-5 py-2.5 rounded-lg font-semibold text-sm focus:outline-none focus:ring-4 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-cyan-500 hover:bg-cyan-600 text-white focus:ring-cyan-300',
    secondary: 'bg-stone-200 hover:bg-stone-300 text-stone-700 focus:ring-stone-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;