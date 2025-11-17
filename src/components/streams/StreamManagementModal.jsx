// components/streams/StreamManagementModal.jsx
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const StreamManagementModal = ({ stream, onClose, onUpdate, onShare, onUnshare, streamToken, user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermissions, setSharePermissions] = useState({
    can_read: true,
    can_write: false
  });
  const [sharedUsers, setSharedUsers] = useState([]);
  const [loadingSharedUsers, setLoadingSharedUsers] = useState(false);

  useEffect(() => {
    if (activeTab === 'share' && streamToken) {
      fetchSharedUsers();
    }
  }, [activeTab, streamToken]);

  const fetchSharedUsers = async () => {
    setLoadingSharedUsers(true);
    try {
      setSharedUsers(stream.auths || []);
    } catch (err) {
      console.error('Error fetching shared users:', err);
      toast.error('Failed to load shared users');
    } finally {
      setLoadingSharedUsers(false);
    }
  };

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    if (!shareEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    if (!streamToken) {
      toast.error('Stream access not available');
      return;
    }

    await onShare(stream.name, shareEmail, sharePermissions);
    setShareEmail('');
    setSharePermissions({ can_read: true, can_write: false });
  };

  const handleUnshare = async (userEmail) => {
    if (!streamToken) {
      toast.error('Stream access not available');
      return;
    }

    await onUnshare(stream.name, userEmail);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPermissionText = (user) => {
    if (user.can_read && user.can_write) return 'Read & Write';
    if (user.can_read) return 'Read Only';
    if (user.can_write) return 'Write Only';
    return 'No Access';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-2xl border border-white/10 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-semibold text-light-text">{stream.name}</h3>
            <p className="text-gray-text text-sm">Stream Management</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-text hover:text-light-text transition p-2"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex space-x-1 px-6">
            {['overview', 'share', 'access'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium transition relative ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-gray-text hover:text-light-text'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-light-text font-medium mb-4">Stream Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-text">Status</p>
                    <p className="text-light-text">
                      {stream.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-text">Public</p>
                    <p className="text-light-text">
                      {stream.is_public ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-text">Created</p>
                    <p className="text-light-text">
                      {formatDate(stream.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-text">Last Updated</p>
                    <p className="text-light-text">
                      {stream.updated_at ? formatDate(stream.updated_at) : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-light-text font-medium mb-4">Stream Limits</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-text">Max Messages/Second</p>
                    <p className="text-light-text">{stream.max_messages_per_second || 5}</p>
                  </div>
                  <div>
                    <p className="text-gray-text">Max Message Size</p>
                    <p className="text-light-text">{stream.max_message_size_bytes || 1024} bytes</p>
                  </div>
                  <div>
                    <p className="text-gray-text">Max Retention</p>
                    <p className="text-light-text">{stream.max_retention_messages || 1000} messages</p>
                  </div>
                </div>
              </div>

              {stream.description && (
                <div>
                  <h4 className="text-light-text font-medium mb-2">Description</h4>
                  <p className="text-gray-text text-sm">{stream.description}</p>
                </div>
              )}
            </div>
          )}

          {/* Share Tab */}
          {activeTab === 'share' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-light-text font-medium mb-4">Share Stream</h4>
                <form onSubmit={handleShareSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-text mb-2 text-sm">Email Address</label>
                    <input
                      type="email"
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                      placeholder="Enter user's email address"
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="can_read"
                        checked={sharePermissions.can_read}
                        onChange={(e) => setSharePermissions(prev => ({
                          ...prev,
                          can_read: e.target.checked
                        }))}
                        className="mr-2"
                      />
                      <label htmlFor="can_read" className="text-gray-text text-sm">
                        Can Read (Consumer)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="can_write"
                        checked={sharePermissions.can_write}
                        onChange={(e) => setSharePermissions(prev => ({
                          ...prev,
                          can_write: e.target.checked
                        }))}
                        className="mr-2"
                      />
                      <label htmlFor="can_write" className="text-gray-text text-sm">
                        Can Write (Producer)
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                  >
                    Share Stream
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-light-text font-medium mb-4">Shared Users</h4>
                {loadingSharedUsers ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : sharedUsers.length > 0 ? (
                  <div className="space-y-3">
                    {sharedUsers.map((user) => (
                      <div key={user.id} className="flex justify-between items-center p-3 bg-dark-surface rounded-lg">
                        <div>
                          <p className="text-light-text">{user.user_email}</p>
                          <p className="text-gray-text text-sm">
                            {getPermissionText(user)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleUnshare(user.user_email)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-text text-center py-4">No users shared with this stream</p>
                )}
              </div>
            </div>
          )}

          {/* Access Tab */}
          {activeTab === 'access' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-light-text font-medium mb-4">Connection Details</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-text text-sm mb-2">Producer URL</p>
                    <code className="block w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-primary text-sm break-all">
                      wss://stream.plotune.net/ws/producer/{user?.username}/{stream.name}
                    </code>
                  </div>
                  <div>
                    <p className="text-gray-text text-sm mb-2">Consumer URL</p>
                    <code className="block w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-primary text-sm break-all">
                      wss://stream.plotune.net/ws/consumer/{user?.username}/{stream.name}/[group_name]
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <h5 className="text-blue-400 font-medium mb-2">Connection Info</h5>
                <p className="text-blue-300 text-sm">
                  Use these WebSocket URLs to connect your applications to this stream.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamManagementModal;