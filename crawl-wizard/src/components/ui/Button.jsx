import React from 'react';

const variants = {
  primary: 'bg-md-primary text-md-on-primary hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-md-secondary text-md-on-secondary hover:bg-blue-100 focus:ring-blue-200',
  outlined: 'border border-md-outline text-md-primary hover:bg-blue-50 focus:ring-blue-200',
  danger: 'bg-md-error text-md-on-error hover:bg-red-600 focus:ring-red-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        btn
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        rounded-md
        font-medium
        transition-colors
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;