// components/streams/PlotuneStreams.jsx
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api, { streamApi } from '../../services/api';
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
      const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 20));

      const response = await api.get(`/auth/stream?q=${cacheBuster}&user=${user?.username}`, {
        headers: { Authorization: token },
      });
      
      if (response.data && response.data.token) {
        setStreamToken(response.data.token);
        fetchStreams(response.data.token);
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Error fetching stream token:', err);
      toast.error('Failed to get stream access');
      setLoading(false);
    }
  };

  const fetchStreams = async (tokenToUse = streamToken) => {
    if (!tokenToUse) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await streamApi.post('/streams/list', {}, {
        headers: { Authorization: tokenToUse },
      });
      
      setStreams(response.data.streams || []);
      
    } catch (err) {
      console.error('Error fetching streams:', err);
      toast.error('Failed to load streams');
      setStreams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStream = async (streamData) => {
    if (!streamToken) {
      toast.error('Stream access not available');
      return;
    }

    try {
      // Match the exact StreamCreate model from backend
      const createData = {
        name: streamData.name,
        owner: user?.username,
        // These are optional in backend with default=None
        max_messages_per_second: 1000,
        max_message_size_bytes: 1000,
        max_retention_messages: 1000,
        max_consumers_per_group: 1000,
        max_consumer_group: 1000
      };

      const response = await streamApi.post('/streams/create', createData, {
        headers: { Authorization: streamToken },
      });
      
      setShowCreateModal(false);
      toast.success('Stream created successfully!');
      fetchStreams();
    } catch (err) {
      console.error('Create error:', err);
      if (err.response?.status === 422) {
        toast.error('Invalid stream data. Please check the stream name.');
      } else {
        toast.error('Failed to create stream');
      }
    }
  };

const handleDeleteStream = async (streamName) => {
  if (!streamToken) {
    toast.error('Stream access not available');
    return;
  }

  if (!window.confirm('Are you sure you want to delete this stream? This action cannot be undone.')) {
    return;
  }

  try {
    // This matches EXACTLY what your backend expects (StreamCreate model)
    await streamApi.post('/streams/delete', {
      name: streamName,
      owner: user?.username,                    // required field
      max_messages_per_second: 0,               // can be any number (backend ignores it)
      max_message_size_bytes: 0,                // same
      max_retention_messages: 0,                // same
      max_consumers_per_group: 0,              // same
      max_consumer_group: 0                     // same
    }, {
      headers: { Authorization: streamToken },
    });

    toast.success('Stream deleted successfully');
    fetchStreams();
  } catch (err) {
    console.error('Delete error:', err);
    toast.error('Failed to delete stream');
  }
};

  const handleShareStream = async (streamName, shareEmail, permissions) => {
    if (!streamToken) {
      toast.error('Stream access not available');
      return;
    }

    try {
      await streamApi.post('/streams/share', 
        {
          stream_name: streamName,
          user_email: shareEmail,
          can_read: permissions.can_read,
          can_write: permissions.can_write
        },
        { headers: { Authorization: streamToken } }
      );
      toast.success(`Stream shared with ${shareEmail}`);
      fetchStreams();
    } catch (err) {
      toast.error('Failed to share stream');
    }
  };

  const handleUnshareStream = async (streamName, userEmail) => {
    if (!streamToken) {
      toast.error('Stream access not available');
      return;
    }

    try {
      await streamApi.post('/streams/unshare', 
        {
          stream_name: streamName,
          user_email: userEmail
        },
        { headers: { Authorization: streamToken } }
      );
      toast.success('User removed from stream');
      fetchStreams();
    } catch (err) {
      toast.error('Failed to remove user');
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
        <div className="bg-red-500/20 text-red-400 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-2">Access Required</h3>
          <p className="text-sm mb-4">
            Unable to access stream services.
          </p>
          <button
            onClick={fetchStreamToken}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Try Again
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
          <p className="text-gray-text text-sm">Manage your data streams</p>
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

      {/* Connection Information */}
      <div className="bg-dark-surface rounded-xl p-6 border border-white/10">
        <h4 className="text-light-text font-medium mb-4">Connection Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-text">Producer Endpoint</p>
            <code className="text-primary bg-dark-card px-2 py-1 rounded break-all">
              wss://stream.plotune.net/ws/producer/{user?.username}/[stream_name]
            </code>
          </div>
          <div>
            <p className="text-gray-text">Consumer Endpoint</p>
            <code className="text-primary bg-dark-card px-2 py-1 rounded break-all">
              wss://stream.plotune.net/ws/consumer/{user?.username}/[stream_name]/[group_name]
            </code>
          </div>
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
          user={user}
        />
      )}
    </div>
  );
};

export default PlotuneStreams;