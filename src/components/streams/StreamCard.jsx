// components/streams/StreamCard.jsx
import React from 'react';
import StreamIcon from '../../assets/icons/stream.svg';

const StreamCard = ({ stream, onManage, onDelete }) => {
  const getStatusColor = (isActive) => {
    return isActive ? 'bg-green-500' : 'bg-red-500';
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-dark-surface rounded-xl p-6 border border-white/10 hover:border-primary/30 transition group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <img 
              src={StreamIcon} 
              alt="Stream" 
              className="w-6 h-6"
            />
          </div>
          <div className="ml-3">
            <h4 className="text-light-text font-semibold">{stream.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${getStatusColor(stream.is_active)}`}></span>
              <span className="text-gray-text text-sm capitalize">
                {stream.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <button
            onClick={onManage}
            className="p-1 text-gray-text hover:text-primary transition"
            title="Manage stream"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Description */}
      {stream.description && (
        <p className="text-gray-text text-sm mb-4 line-clamp-2">{stream.description}</p>
      )}

      {/* Stream Limits */}
      <div className="space-y-3 mb-4">
        <div>
          <p className="text-gray-text text-sm">Message Rate</p>
          <p className="text-light-text font-medium">{stream.max_messages_per_second || 5}/s max</p>
        </div>
        <div>
          <p className="text-gray-text text-sm">Message Size</p>
          <p className="text-light-text font-medium">
            {formatBytes(stream.max_message_size_bytes || 1024)} max
          </p>
        </div>
        <div>
          <p className="text-gray-text text-sm">Retention</p>
          <p className="text-light-text font-medium">
            {stream.max_retention_messages || 1000} messages
          </p>
        </div>
      </div>

      {/* Metadata */}
      <div className="text-xs text-gray-text space-y-1 mb-4">
        <p>Created: {formatDate(stream.created_at)}</p>
        <p>Public: {stream.is_public ? 'Yes' : 'No'}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <button
          onClick={onManage}
          className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition"
        >
          Manage
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600/20 text-red-400 rounded-lg text-sm hover:bg-red-600/30 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StreamCard;