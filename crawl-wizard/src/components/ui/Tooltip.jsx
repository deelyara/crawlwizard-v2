import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

const Tooltip = ({ 
  text, 
  children,
  position = 'top',
  className = '',
  iconClassName = '',
  tooltipClassName = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };
  
  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };
  
  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // If children are provided, use them as the trigger
  if (children) {
    return (
      <div className={`relative inline-block ${className}`} ref={tooltipRef}>
        <div
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {children}
        </div>
        
        {isVisible && (
          <div className={`absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded shadow-lg ${positionClasses[position]} ${tooltipClassName}`}>
            {text}
            <div className={`absolute w-0 h-0 border-4 border-gray-800 ${arrowClasses[position]}`} />
          </div>
        )}
      </div>
    );
  }
  
  // Otherwise use the default info icon
  return (
    <div className={`relative inline-block ${className}`} ref={tooltipRef}>
      <div
        className={`information-tooltip ${iconClassName}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Info size={14} />
      </div>
      
      {isVisible && (
        <div className={`absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded shadow-lg ${positionClasses[position]} ${tooltipClassName}`}>
          {text}
          <div className={`absolute w-0 h-0 border-4 border-gray-800 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;