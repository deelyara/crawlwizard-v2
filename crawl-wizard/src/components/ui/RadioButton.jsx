import React from 'react';

const RadioButton = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  return (
    <div 
      className={`
        radio-button 
        ${checked ? 'active' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <div className="flex items-start">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 mt-1 text-md-primary focus:ring-md-primary border-gray-300"
        />
        <div className="ml-3">
          <label htmlFor={id} className="block text-sm font-medium cursor-pointer">
            {label}
          </label>
          {description && (
            <span className="block text-sm text-gray-500">
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioButton;