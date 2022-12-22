import React from "react"

interface BoxProps {
  className?: string
  children: React.ReactNode
}

export const Box = ({ children, className }: BoxProps) => {
  return (
    <div
      className={`p-8 rounded-lg bg-base-200 shadow-md text-base-content/70 ${className}`}
    >
      {children}
    </div>
  )
}
