import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PlotuneStreams from '../components/streams/PlotuneStreams';

const Streams = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-gray-900 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
        </div>

        <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
          <PlotuneStreams />
        </div>
      </div>
    </div>
  );
};

export default Streams;