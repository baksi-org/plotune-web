// components/streams/StreamCard.jsx
import React from 'react';

const StreamCard = ({ stream, isOwner, onEdit, onShare }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-dark-surface rounded-xl p-6 border border-white/10 hover:border-primary/30 transition group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
            🌊
          </div>
          <div className="ml-3">
            <h4 className="text-light-text font-semibold">{stream.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${getStatusColor(stream.status)}`}></span>
              <span className="text-gray-text text-sm capitalize">{stream.status}</span>
            </div>
          </div>
        </div>
        {isOwner && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onShare}
              className="p-1 text-gray-text hover:text-primary transition"
              title="Share stream"
            >
              👥
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-text text-sm">Throughput</p>
          <p className="text-light-text font-medium">{stream.messagesPerSecond}/s</p>
        </div>
        <div>
          <p className="text-gray-text text-sm">Storage</p>
          <p className="text-light-text font-medium">{formatBytes(stream.storageUsed)}</p>
        </div>
      </div>

      {/* Limitations */}
      <div className="mb-4">
        <p className="text-gray-text text-sm mb-2">Limitations</p>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Partitions</span>
            <span className="text-light-text">{stream.partitions} / {stream.maxPartitions}</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full" 
              style={{ width: `${(stream.partitions / stream.maxPartitions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition"
        >
          Manage
        </button>
        <div className="flex items-center text-gray-text text-sm">
          <span className="mr-2">👥 {stream.sharedUsers || 0}</span>
          shared
        </div>
      </div>
    </div>
  );
};

export default StreamCard;