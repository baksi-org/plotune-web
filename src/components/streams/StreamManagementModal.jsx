// components/streams/StreamManagementModal.jsx
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const StreamManagementModal = ({ stream, onClose, onUpdate }) => {
  const { token } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(stream.action === 'share' ? 'share' : 'settings');
  const [shareEmail, setShareEmail] = useState('');
  const [performanceConfig, setPerformanceConfig] = useState({
    partitions: stream.partitions,
    retentionHours: stream.retentionHours,
    replicationFactor: stream.replicationFactor
  });

  const handleShare = async (e) => {
    e.preventDefault();
    if (!shareEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      await api.post(`/streams/${stream.id}/share`, 
        { email: shareEmail },
        { headers: { Authorization: token } }
      );
      toast.success(`Stream shared with ${shareEmail}`);
      setShareEmail('');
      onUpdate();
    } catch (err) {
      toast.error('Failed to share stream');
    }
  };

  const handleUnshare = async (userId) => {
    try {
      await api.post(`/streams/${stream.id}/unshare`, 
        { user_id: userId },
        { headers: { Authorization: token } }
      );
      toast.success('User removed from stream');
      onUpdate();
    } catch (err) {
      toast.error('Failed to remove user');
    }
  };

  const handlePerformanceUpdate = async () => {
    // Check if performance increase exceeds standard plan
    const exceedsStandard = performanceConfig.partitions > 10 || 
                           performanceConfig.replicationFactor > 1;

    if (exceedsStandard) {
      // Show cost calculation
      const cost = calculateCost(performanceConfig);
      if (window.confirm(`This performance upgrade will cost $${cost}/month. Continue?`)) {
        await updateStreamConfig();
      }
    } else {
      await updateStreamConfig();
    }
  };

  const calculateCost = (config) => {
    let baseCost = 10; // $10 base
    const partitionCost = Math.max(0, config.partitions - 10) * 2; // $2 per extra partition
    const replicationCost = (config.replicationFactor - 1) * 5; // $5 per extra replica
    return baseCost + partitionCost + replicationCost;
  };

  const updateStreamConfig = async () => {
    try {
      await api.put(`/streams/${stream.id}`, performanceConfig, {
        headers: { Authorization: token }
      });
      toast.success('Stream configuration updated');
      onUpdate();
    } catch (err) {
      toast.error('Failed to update stream configuration');
    }
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
            {['settings', 'share', 'metrics'].map((tab) => (
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
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-light-text font-medium mb-4">Performance Settings</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-text mb-2 text-sm">Partitions</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={performanceConfig.partitions}
                      onChange={(e) => setPerformanceConfig(prev => ({
                        ...prev,
                        partitions: parseInt(e.target.value)
                      }))}
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    />
                    <p className="text-gray-text text-xs mt-1">More partitions increase parallelism</p>
                  </div>

                  <div>
                    <label className="block text-gray-text mb-2 text-sm">Replication Factor</label>
                    <select
                      value={performanceConfig.replicationFactor}
                      onChange={(e) => setPerformanceConfig(prev => ({
                        ...prev,
                        replicationFactor: parseInt(e.target.value)
                      }))}
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    >
                      <option value={1}>1 (Standard)</option>
                      <option value={2}>2 (High Availability)</option>
                      <option value={3}>3 (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handlePerformanceUpdate}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                >
                  Update Performance
                </button>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-light-text font-medium mb-4">Danger Zone</h4>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Delete Stream
                </button>
              </div>
            </div>
          )}

          {/* Share Tab */}
          {activeTab === 'share' && (
            <div className="space-y-6">
              <form onSubmit={handleShare} className="flex space-x-2">
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  placeholder="Enter user's email address"
                  className="flex-1 p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                >
                  Share
                </button>
              </form>

              <div>
                <h4 className="text-light-text font-medium mb-4">Shared Users</h4>
                {stream.sharedUsers > 0 ? (
                  <div className="space-y-2">
                    {/* Mock shared users - replace with actual data */}
                    <div className="flex justify-between items-center p-3 bg-dark-surface rounded-lg">
                      <div>
                        <p className="text-light-text">user@example.com</p>
                        <p className="text-gray-text text-sm">Read & Write</p>
                      </div>
                      <button
                        onClick={() => handleUnshare(1)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-text text-center py-4">No users shared with this stream</p>
                )}
              </div>
            </div>
          )}

          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-surface rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{stream.messagesPerSecond}/s</p>
                  <p className="text-gray-text text-sm">Throughput</p>
                </div>
                <div className="bg-dark-surface rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">{stream.latency}ms</p>
                  <p className="text-gray-text text-sm">Avg Latency</p>
                </div>
                <div className="bg-dark-surface rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-500">{stream.partitions}</p>
                  <p className="text-gray-text text-sm">Partitions</p>
                </div>
                <div className="bg-dark-surface rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-500">{stream.uptime}%</p>
                  <p className="text-gray-text text-sm">Uptime</p>
                </div>
              </div>

              <div className="bg-dark-surface rounded-lg p-4">
                <h4 className="text-light-text font-medium mb-4">Recent Activity</h4>
                <div className="space-y-2 text-sm text-gray-text">
                  <p>• Stream created 2 days ago</p>
                  <p>• Last message received 5 minutes ago</p>
                  <p>• 1,234,567 total messages</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamManagementModal;