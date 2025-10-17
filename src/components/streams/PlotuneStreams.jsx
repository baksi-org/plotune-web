// components/streams/PlotuneStreams.jsx
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import CreateStreamModal from './CreateStreamModal';
import StreamManagementModal from './StreamManagementModal';
import StreamCard from './StreamCard';
import StreamIcon from '../../assets/icons/stream.svg';

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
      
      // ✅ API V1 + Bearer Token + Direkt Response
      const [myStreamsResponse, sharedStreamsResponse] = await Promise.all([
        api.get('/streams/my-streams', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get('/streams/shared-with-me', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      
      // ✅ Direkt response.data ALMIYORUZ - BEKEND DİREKT ARRAY DÖNÜYOR
      setStreams(Array.isArray(myStreamsResponse.data) ? myStreamsResponse.data : []);
      setSharedStreams(Array.isArray(sharedStreamsResponse.data) ? sharedStreamsResponse.data : []);
      
    } catch (err) {
      console.error('Error fetching streams:', err);
      toast.error(err.response?.data?.detail || 'Failed to load streams');
      setStreams([]);
      setSharedStreams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStream = async (streamData) => {
    try {
      const response = await api.post('/streams/create', streamData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setStreams(prev => [...prev, response.data]);
      setShowCreateModal(false);
      toast.success('Stream created successfully!');
      fetchStreams(); // ✅ Refresh list
    } catch (err) {
      console.error('Create error:', err);
      toast.error(err.response?.data?.detail || 'Failed to create stream');
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
        
        {streams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <img src={StreamIcon} alt="Streams" className="mx-auto mb-4 w-16 h-16 opacity-50" />
            <h3 className="text-lg font-medium text-light-text mb-2">No streams yet</h3>
            <p className="text-gray-text mb-4">Create your first stream to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Create Your First Stream
            </button>
          </div>
        )}
      </div>

      {/* Shared Streams */}
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
        <CreateStreamModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateStream} />
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