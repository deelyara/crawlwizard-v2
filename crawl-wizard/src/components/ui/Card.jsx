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
  elevation = 'default',
  noBorder = false,
  noPadding = false,
  collapsible = false,
  collapsed = false,
  onToggle,
}) => {
  const elevationMap = {
    'none': '',
    'default': 'shadow-md-card',
    'hover': 'shadow-md-card hover:shadow-md-card-hover',
    'elevated': 'shadow-md-3',
  };
  
  const borderClasses = noBorder ? '' : 'border border-gray-100';
  const paddingClasses = noPadding ? '' : 'p-5';
  
  return (
    <div 
      className={`
        bg-white rounded-md overflow-hidden 
        ${elevationMap[elevation] || elevationMap.default} 
        ${borderClasses}
        transition-all duration-200 
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className={`px-5 py-4 border-b border-gray-50 flex justify-between items-center ${titleClassName}`}>
          <div>
            {title && <h3 className="text-lg font-medium text-md-on-surface">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          
          {collapsible && onToggle && (
            <button 
              onClick={onToggle} 
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${collapsed ? '' : 'rotate-180'}`}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
      
      {(!collapsible || (collapsible && !collapsed)) && (
        <div className={`${paddingClasses} ${bodyClassName}`}>
          {children}
        </div>
      )}
      
      {footer && (
        <div className={`px-5 py-4 border-t border-gray-50 bg-gray-50 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;