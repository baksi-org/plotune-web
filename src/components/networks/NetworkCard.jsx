// components/networks/NetworkCard.jsx
import React, { useState } from 'react';
import { 
  FaCog, 
  FaTrash, 
  FaUsers,
  FaLock,
  FaUser,
  FaShareAlt,
  FaEye,
  FaGlobe ,
  FaCloudUploadAlt,
  FaCalendar,
  FaNetworkWired,
} from 'react-icons/fa';

const NetworkCard = ({ network, onManage, onDelete, isAuthorized = false }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    if (!onDelete) return;
    
    setIsDeleting(true);
    await onDelete(network.name);
    setIsDeleting(false);
  };

  // Count connected peers (auths)
  const connectedPeers = network.auths ? network.auths.length : 0;

  return (
    <div className={`relative bg-gradient-to-br from-dark-card to-dark-surface rounded-2xl p-5 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden group ${
      isAuthorized ? 'border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-cyan-500/5' : 'border-white/10 hover:border-primary/30 hover:shadow-primary/5'
    }`}>
      {/* Top Accent Bar */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-opacity ${
        isAuthorized ? 'from-cyan-500 to-blue-500 opacity-100' : 'from-primary to-primary-dark opacity-0 group-hover:opacity-100'
      }`}></div>
      
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Network Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
            isAuthorized 
              ? 'bg-gradient-to-br from-cyan-500/25 to-blue-500/25 border-cyan-500/40' 
              : 'bg-gradient-to-br from-primary/20 to-primary-dark/20 border-primary/30'
          }`}>
            <FaNetworkWired className="w-6 h-6 text-primary" />
          </div>
          
          {/* Title and Metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-light-text truncate group-hover:text-primary transition-colors mr-2">
                {network.name}
              </h3>
              {/* Status Badge */}
              <span className={`text-xs px-2 py-1 rounded-full ${
                network.is_active 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-rose-500/20 text-rose-400'
              }`}>
                {network.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1 text-xs text-gray-text">
                <FaCalendar className="w-3 h-3" />
                <span>{formatDate(network.created_at)}</span>
              </div>
              {isAuthorized && (
                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  <FaUser className="w-3 h-3" />
                  <span className="truncate max-w-[100px]">{network.owner_email?.split('@')[0]}</span>
                </div>
              )}
              {isAuthorized && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30">
                  Joined
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {network.description && (
        <p className="text-gray-text text-sm mb-4 line-clamp-2 leading-relaxed group-hover:text-light-text transition-colors">
          {network.description}
        </p>
      )}

      {/* Network Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Connected Peers */}
        <div className="bg-dark-bg/10 backdrop-blur-xl rounded-lg p-3 border border-white/5 hover:border-primary/20 transition-all group-hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <FaUsers className="w-3 h-3 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-gray-text">Peers</p>
                <p className="text-sm font-bold text-light-text">{connectedPeers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-dark-bg/10 backdrop-blur-xl rounded-lg p-3 border border-white/5 hover:border-primary/20 transition-all group-hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                {network.is_public ? (
                  <FaGlobe className="w-3 h-3 text-primary" />
                ) : (
                  <FaLock className="w-3 h-3 text-purple-400" />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-text">Visibility</p>
                <p className="text-sm font-bold text-light-text">
                  {network.is_public ? 'Public' : 'Private'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions (for authorized networks) */}
      {isAuthorized && network.auths && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {network.auths.find(a => a.user_email === network.current_user_email)?.can_publish && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FaCloudUploadAlt className="w-3 h-3" />
                Can Publish
              </span>
            )}
            {network.auths.find(a => a.user_email === network.current_user_email)?.can_subscribe && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FaEye className="w-3 h-3" />
                Can Subscribe
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-3">
        {/* Configure/View Button */}
        <button
          onClick={() => onManage(network)}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md flex-1 ${
            isAuthorized
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-cyan-500/20'
              : 'bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary hover:from-primary/30 hover:to-primary-dark/30 hover:shadow-primary/20'
          }`}
        >
          <FaCog className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">{isAuthorized ? 'View Details' : 'Manage'}</span>
          <span className="sm:hidden">{isAuthorized ? 'Details' : 'Manage'}</span>
        </button>
        
        {/* Delete Button - only for owned networks */}
        {!isAuthorized && onDelete && (
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500/20 to-rose-600/20 text-rose-400 rounded-lg text-sm font-medium hover:from-rose-500/30 hover:to-rose-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-rose-400 rounded-full animate-spin flex-shrink-0"></div>
                <span className="hidden sm:inline">Deleting...</span>
                <span className="sm:hidden">Delete...</span>
              </>
            ) : (
              <>
                <FaTrash className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Delete</span>
                <span className="sm:hidden">Del</span>
              </>
            )}
          </button>
        )}
        
        {/* Share Icon for owned networks */}
        {!isAuthorized && (
          <button
            onClick={() => onManage(network)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary/20"
            title="Share Network"
          >
            <FaShareAlt className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NetworkCard;