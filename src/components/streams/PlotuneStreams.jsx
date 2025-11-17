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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeStream, setActiveStream] = useState(null);
  const [streamToken, setStreamToken] = useState(null);

  useEffect(() => {
    fetchStreamToken();
  }, []);

  // Get stream token from backend first
  const fetchStreamToken = async () => {
    try {
      const response = await api.get('/auth/stream', {
        headers: { Authorization: token },
      });
      setStreamToken(response.data.token);
      fetchStreams(response.data.token);
    } catch (err) {
      console.error('Error fetching stream token:', err);
      toast.error('Failed to get stream access token');
      setLoading(false);
    }
  };

  const fetchStreams = async (tokenToUse = streamToken) => {
    if (!tokenToUse) return;

    try {
      setLoading(true);
      const response = await api.post('/stream/streams/list', {}, {
        headers: { Authorization: tokenToUse },
      });
      
      setStreams(response.data.streams || []);
      
    } catch (err) {
      console.error('Error fetching streams:', err);
      toast.error(err.response?.data?.detail || 'Failed to load streams');
      setStreams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStream = async (streamData) => {
    if (!streamToken) {
      toast.error('Stream access token not available');
      return;
    }

    try {
      // Backend expects { name: string, owner: string } and optional limits
      const createData = {
        name: streamData.name,
        owner: user.email,
        description: streamData.description || '',
        max_messages_per_second: streamData.max_messages_per_second,
        max_message_size_bytes: streamData.max_message_size_bytes,
        max_retention_messages: streamData.max_retention_messages
      };

      const response = await api.post('/stream/streams/create', createData, {
        headers: { Authorization: streamToken },
      });
      
      setShowCreateModal(false);
      toast.success('Stream created successfully!');
      fetchStreams(); // Refresh list
    } catch (err) {
      console.error('Create error:', err);
      toast.error(err.response?.data?.detail || 'Failed to create stream');
    }
  };

  const handleDeleteStream = async (streamName) => {
    if (!streamToken) {
      toast.error('Stream access token not available');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this stream? This action cannot be undone.')) {
      return;
    }

    try {
      await api.post('/stream/streams/delete', { name: streamName }, {
        headers: { Authorization: streamToken },
      });
      
      toast.success('Stream deleted successfully');
      fetchStreams(); // Refresh list
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.detail || 'Failed to delete stream');
    }
  };

  const handleShareStream = async (streamName, shareEmail, permissions) => {
    if (!streamToken) {
      toast.error('Stream access token not available');
      return;
    }

    try {
      await api.post('/stream/streams/share', 
        {
          stream_name: streamName,
          user_email: shareEmail,
          can_read: permissions.can_read,
          can_write: permissions.can_write
        },
        { headers: { Authorization: streamToken } }
      );
      toast.success(`Stream shared with ${shareEmail}`);
      fetchStreams(); // Refresh to get updated shared users
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to share stream');
    }
  };

  const handleUnshareStream = async (streamName, userEmail) => {
    if (!streamToken) {
      toast.error('Stream access token not available');
      return;
    }

    try {
      await api.post('/stream/streams/unshare', 
        {
          stream_name: streamName,
          user_email: userEmail
        },
        { headers: { Authorization: streamToken } }
      );
      toast.success('User removed from stream');
      fetchStreams(); // Refresh to get updated shared users
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to remove user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!streamToken && !loading) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-2">Stream Access Error</h3>
          <p>Unable to get stream access token. Please try refreshing the page.</p>
          <button
            onClick={fetchStreamToken}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-light-text">My Streams</h3>
          <p className="text-gray-text text-sm">Real-time data streams for your applications</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center"
        >
          <span className="mr-2">+</span> Create New Stream
        </button>
      </div>

      {/* Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream) => (
          <StreamCard
            key={stream.id}
            stream={stream}
            onManage={() => setActiveStream(stream)}
            onDelete={() => handleDeleteStream(stream.name)}
          />
        ))}
        
        {streams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <img src={StreamIcon} alt="Streams" className="mx-auto mb-4 w-16 h-16 opacity-50" />
            <h3 className="text-lg font-medium text-light-text mb-2">No streams yet</h3>
            <p className="text-gray-text mb-4">Create your first stream to start streaming data</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Create Your First Stream
            </button>
          </div>
        )}
      </div>

      {/* Connection Information */}
      <div className="bg-dark-surface rounded-xl p-6 border border-white/10">
        <h4 className="text-light-text font-medium mb-4">WebSocket Connection Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-text">Producer Endpoint:</p>
            <code className="text-primary bg-dark-card px-2 py-1 rounded">
              /ws/producer/{user?.username}/[stream_name]
            </code>
          </div>
          <div>
            <p className="text-gray-text">Consumer Endpoint:</p>
            <code className="text-primary bg-dark-card px-2 py-1 rounded">
              /ws/consumer/{user?.username}/[stream_name]/[group_name]
            </code>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-text">
          <p>Note: WebSocket connections require proper authentication headers</p>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateStreamModal 
          onClose={() => setShowCreateModal(false)} 
          onSubmit={handleCreateStream}
          user={user}
        />
      )}
      {activeStream && (
        <StreamManagementModal
          stream={activeStream}
          onClose={() => setActiveStream(null)}
          onUpdate={fetchStreams}
          onShare={handleShareStream}
          onUnshare={handleUnshareStream}
          streamToken={streamToken}
        />
      )}
    </div>
  );
};

export default PlotuneStreams;