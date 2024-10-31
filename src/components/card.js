import React from 'react';

export function Card({ children, className }) {
  return <div className={`bg-white shadow rounded-md p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="border-b pb-2 mb-2">{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function CardContent({ children, className }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={`mt-4 ${className}`}>{children}</div>;
}
