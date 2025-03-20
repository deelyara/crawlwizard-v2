import React from 'react';

const variants = {
  primary: 'bg-md-primary text-md-on-primary hover:bg-primary-600 focus:ring-primary-200 shadow-sm hover:shadow-md',
  secondary: 'bg-md-secondary text-md-on-secondary hover:bg-blue-100 focus:ring-blue-200',
  outlined: 'border border-md-outline text-md-primary bg-white hover:bg-md-primary-container hover:text-md-on-primary-container focus:ring-primary-200',
  danger: 'bg-md-error text-md-on-error hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
  text: 'bg-transparent text-md-primary hover:bg-md-primary-container',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const renderContent = () => {
    if (!icon) return children;
    
    return (
      <span className="flex items-center gap-2">
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </span>
    );
  };
  
  return (
    <button
      type={type}
      className={`
        btn
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        rounded-md
        font-medium
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-offset-1
        relative
        overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
      
      {/* Ripple effect placeholder - would require JS implementation */}
      <span className="ripple-effect absolute"></span>
    </button>
  );
};

export default Button;