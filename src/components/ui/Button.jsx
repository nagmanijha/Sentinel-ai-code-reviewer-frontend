import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
const variants = {
  primary: `
    bg-indigo-600 text-white font-medium 
    hover:bg-indigo-700 active:bg-indigo-800 
    focus-visible:ring-2 focus-visible:ring-indigo-500 
    shadow-sm transition-all duration-200
  `,
  secondary: `
    bg-white text-gray-800 border border-gray-300 
    hover:bg-gray-50 active:bg-gray-100 
    focus-visible:ring-2 focus-visible:ring-gray-400 
    shadow-sm transition-all duration-200
  `,
  ghost: `
    text-gray-600 hover:text-gray-900 hover:bg-gray-50 
    active:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-300 
    transition-all duration-200
  `,
  danger: `
    bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 
    focus-visible:ring-2 focus-visible:ring-rose-500 
    shadow-sm transition-all duration-200
  `
};

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button 
      className={classes} 
      disabled={disabled || loading}
      {...props}
      
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button