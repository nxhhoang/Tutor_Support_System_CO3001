import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border bg-white shadow-sm transition hover:shadow-md ${className}`}
      {...props}
    />
  )
}

export function CardContent({ className = '', ...props }: CardContentProps) {
  return <div className={`p-4 ${className}`} {...props} />
}
