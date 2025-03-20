import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  footer, 
  className = '', 
  titleClassName = '',
  bodyClassName = '',
  footerClassName = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-md-outline overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className={`px-4 py-3 border-b border-md-outline ${titleClassName}`}>
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-4 py-3 border-t border-md-outline bg-gray-50 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;