'use client';

import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  rounded?: 'top' | 'bottom' | 'both' | 'none';
}

const Input: FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  rounded = 'both',
  className = '',
  id,
  ...props
}) => {
  const baseStyles = 'appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const roundedStyles = {
    top: 'rounded-t-md',
    bottom: 'rounded-b-md',
    both: 'rounded-md',
    none: ''
  };
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${baseStyles} ${widthStyles} ${roundedStyles[rounded]} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;