import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <div className="text-center mt-12">
      <h2 className="text-red-500">404 - Not Found</h2>
      <p className="text-gray-800">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};
