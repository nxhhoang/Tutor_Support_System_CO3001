import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'danger'
}

export function Button({ className = '', variant = 'default', ...props }: ButtonProps) {
  const base =
    'px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
