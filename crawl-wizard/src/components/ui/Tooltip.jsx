import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

const Tooltip = ({ 
  text, 
  children,
  position = 'top',
  className = '',
  iconClassName = '',
  tooltipClassName = '',
  delay = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  
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
  
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  
  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
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
      clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // If children are provided, use them as the trigger
  if (children) {
    return (
      <div className={`relative inline-block ${className}`} ref={tooltipRef}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        
        {isVisible && (
          <div className={`absolute z-50 w-64 p-2.5 text-sm text-white bg-gray-800 rounded-md shadow-md-2 transition-opacity duration-200 opacity-100 ${positionClasses[position]} ${tooltipClassName}`}>
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Info size={16} className="text-md-primary" />
      </div>
      
      {isVisible && (
        <div className={`absolute z-50 w-64 p-2.5 text-sm text-white bg-gray-800 rounded-md shadow-md-2 transition-opacity duration-200 opacity-100 ${positionClasses[position]} ${tooltipClassName}`}>
          {text}
          <div className={`absolute w-0 h-0 border-4 border-gray-800 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;