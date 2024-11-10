import React from 'react';

export const FileInput = ({ onChange, accept, className = '' }) => {
  return (
    <input
      type="file"
      onChange={onChange}
      accept={accept}
      className={`w-full p-2 border border-gray-300 rounded-lg ${className}`}
    />
  );
};