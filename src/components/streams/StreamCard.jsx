// components/streams/StreamCard.jsx
import React, { useState } from 'react';
import { 
  FaCog, 
  FaTrash, 
  FaClock, 
  FaMemory, 
  FaEnvelope, 
  FaGlobe, 
  FaTag
} from 'react-icons/fa';
import StreamIcon from '../../assets/icons/stream.svg';

const StreamCard = ({ stream, onManage, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getMessageRateColor = (rate) => {
    if (rate >= 100) return "text-rose-400";
    if (rate >= 50) return "text-amber-400";
    return "text-emerald-400";
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onDelete(stream);
    setIsDeleting(false);
  };

  return (
    <div className="relative bg-gradient-to-br from-dark-card to-dark-surface rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden group">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Header Section */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center space-x-4">
          {/* Icon Container */}
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform duration-300">
              <img 
                src={StreamIcon} 
                alt="Stream" 
                className="w-7 h-7 text-primary filter drop-shadow"
              />
            </div>
          </div>
          
          {/* Title & Date */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-light-text tracking-tight truncate group-hover:text-primary transition-colors">
              {stream.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1 text-xs text-gray-text">
                <FaClock />
                <span>{formatDate(stream.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {stream.description && (
        <p className="text-gray-text text-sm mb-5 line-clamp-2 leading-relaxed group-hover:text-light-text transition-colors">
          {stream.description}
        </p>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {/* Message Rate */}
        <div className="bg-dark-bg/50 rounded-xl p-3 border border-white/5 hover:border-primary/20 transition-all group-hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-text flex items-center gap-2">
              <FaEnvelope className="w-3 h-3" />
              Rate
            </span>
            <span className={`text-xs font-bold ${getMessageRateColor(stream.max_messages_per_second || 5)}`}>
              {stream.max_messages_per_second || 5}/s
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className="h-1.5 bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-300"
              style={{ width: `${Math.min((stream.max_messages_per_second || 5) / 100 * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Message Size */}
        <div className="bg-dark-bg/50 rounded-xl p-3 border border-white/5 hover:border-primary/20 transition-all group-hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-text flex items-center gap-2">
              <FaMemory className="w-3 h-3" />
              Size
            </span>
            <span className="text-xs font-bold text-light-text">
              {formatBytes(stream.max_message_size_bytes || 1024)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Max limit</p>
        </div>

        {/* Retention */}
        <div className="bg-dark-bg/50 rounded-xl p-3 border border-white/5 hover:border-primary/20 transition-all group-hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-text flex items-center gap-2">
              <FaMemory className="w-3 h-3" />
              Retention
            </span>
            <span className="text-xs font-bold text-light-text">
              {stream.max_retention_messages || 1000}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Messages</p>
        </div>
      </div>

      {/* Metadata Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {/* Public Status */}
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${stream.is_public ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
          <FaGlobe className="w-3 h-3" />
          {stream.is_public ? 'Public' : 'Private'}
        </span>
        
        {/* Message Count Estimate */}
        {stream.message_count !== undefined && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FaEnvelope className="w-3 h-3" />
            {stream.message_count.toLocaleString()} msgs
          </span>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <button
          onClick={() => onManage(stream)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary rounded-lg text-sm font-medium hover:from-primary/30 hover:to-primary-dark/30 transition-all duration-200 hover:shadow-md hover:shadow-primary/20"
        >
          <FaCog className="w-4 h-4" />
          Configure
        </button>
        
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500/20 to-rose-600/20 text-rose-400 rounded-lg text-sm font-medium hover:from-rose-500/30 hover:to-rose-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-rose-400 rounded-full animate-spin"></div>
              Deleting...
            </>
          ) : (
            <>
              <FaTrash className="w-4 h-4" />
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StreamCard;