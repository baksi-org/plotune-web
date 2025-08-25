import React, { useEffect } from 'react';

const RedirectPage = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="min-h-screen bg-dark-bg text-light-text flex items-center justify-center">
      <p>Redirecting to community discussions...</p>
    </div>
  );
};

export default RedirectPage;