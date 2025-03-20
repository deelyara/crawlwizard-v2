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
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0 pt-0.5">
          <input
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="form-radio"
          />
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-md-primary"></div>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor={id} className="block text-sm font-medium cursor-pointer text-gray-900">
            {label}
          </label>
          {description && (
            <span className="block text-sm text-gray-500 mt-1">
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioButton;