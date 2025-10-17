import React from 'react'
import { cn } from '../../lib/utils'

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200 focus:ring-gray-500',
    destructive: 'bg-red-100 text-red-800 border-red-200 focus:ring-red-500',
    warning: 'bg-orange-100 text-orange-800 border-orange-200 focus:ring-orange-500',
    success: 'bg-green-100 text-green-800 border-green-200 focus:ring-green-500',
    secondary: 'bg-blue-100 text-blue-800 border-blue-200 focus:ring-blue-500',
    outline: 'bg-transparent text-gray-600 border-gray-300 focus:ring-gray-500',
    premium: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200 focus:ring-purple-500'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  }

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge