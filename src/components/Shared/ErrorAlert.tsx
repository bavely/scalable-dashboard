import React from 'react';

const ErrorAlert: React.FC<{ message: string }> = ({ message }) => (
  <div
    role="alert"
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
  >
    <strong className="font-bold">Error: </strong>
    <span>{message}</span>
  </div>
);

export default ErrorAlert;
