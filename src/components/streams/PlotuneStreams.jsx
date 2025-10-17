// components/streams/PlotuneStreams.jsx
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import CreateStreamModal from './CreateStreamModal';
import StreamManagementModal from './StreamManagementModal';
import StreamCard from './StreamCard';

const PlotuneStreams = () => {
  const { user, token } = useContext(AuthContext);
  const [streams, setStreams] = useState([]);
  const [sharedStreams, setSharedStreams] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeStream, setActiveStream] = useState(null);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      setLoading(true);
      // Mock API calls - replace with actual endpoints
      const myStreamsResponse = await api.get('/streams/my-streams', {
        headers: { Authorization: token },
      });
      const sharedStreamsResponse = await api.get('/streams/shared-with-me', {
        headers: { Authorization: token },
      });
      
      setStreams(myStreamsResponse.data || []);
      setSharedStreams(sharedStreamsResponse.data || []);
    } catch (err) {
      toast.error('Failed to load streams');
      console.error('Error fetching streams:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStream = async (streamData) => {
    try {
      const response = await api.post('/streams/create', streamData, {
        headers: { Authorization: token },
      });
      setStreams([...streams, response.data]);
      setShowCreateModal(false);
      toast.success('Stream created successfully');
    } catch (err) {
      toast.error('Failed to create stream');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Create Stream Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-light-text">My Streams</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center"
        >
          <span className="mr-2">+</span> Create New Stream
        </button>
      </div>

      {/* My Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream) => (
          <StreamCard
            key={stream.id}
            stream={stream}
            isOwner={true}
            onEdit={() => setActiveStream(stream)}
            onShare={() => setActiveStream({...stream, action: 'share'})}
          />
        ))}
        
        {/* Empty State */}
        {streams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🌊</div>
            <h3 className="text-lg font-medium text-light-text mb-2">No streams yet</h3>
            <p className="text-gray-text mb-4">Create your first stream to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Create Your First Stream
            </button>
          </div>
        )}
      </div>

      {/* Shared Streams Section */}
      {sharedStreams.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-light-text mb-6">Shared With Me</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedStreams.map((stream) => (
              <StreamCard
                key={stream.id}
                stream={stream}
                isOwner={false}
                onEdit={() => setActiveStream(stream)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateStreamModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateStream}
        />
      )}

      {activeStream && (
        <StreamManagementModal
          stream={activeStream}
          onClose={() => setActiveStream(null)}
          onUpdate={fetchStreams}
        />
      )}
    </div>
  );
};

export default PlotuneStreams;