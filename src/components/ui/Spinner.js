import React from 'react';

export const Spinner = ({ className = '' }) => {
  return (
    <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 ${className}`} />
  );
};