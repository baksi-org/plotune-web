// components/networks/CreateNetworkModal.jsx
import React, { useState } from 'react';
import {
    FaGlobe, 
    FaLock,
    FaShareAlt , 
    FaUsers, 
    
    FaNetworkWired
  } from 'react-icons/fa';

const CreateNetworkModal = ({ onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_public: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Network name is required';
    } else if (!formData.name.match(/^[a-zA-Z0-9_-]+$/)) {
      newErrors.name = 'Only letters, numbers, underscores and hyphens allowed';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Network name must be less than 100 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleVisibility = () => {
    setFormData(prev => ({ ...prev, is_public: !prev.is_public }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-light-text">Create New Network</h3>
          <button
            onClick={onClose}
            className="text-gray-text hover:text-light-text transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-text mb-2 text-sm">Network Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full p-3 bg-dark-surface backdrop-blur-xl rounded-lg border text-light-text focus:ring-2 focus:ring-primary/20 transition ${
                errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary'
              }`}
              placeholder="my-peer-network"
              maxLength={100}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-text mb-2 text-sm">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-3 bg-dark-surface backdrop-blur-xl rounded-lg border border-white/10 text-light-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              rows="3"
              placeholder="Describe what this network will be used for..."
              maxLength={500}
            />
          </div>

          {/* Visibility Toggle */}
          <div 
            className="bg-dark-surface backdrop-blur-xl rounded-lg p-4 border border-white/5 cursor-pointer hover:border-primary/30 transition"
            onClick={toggleVisibility}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  formData.is_public 
                    ? 'bg-gradient-to-br from-primary/20 to-cyan-500/20' 
                    : 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20'
                }`}>
                  {formData.is_public ? (
                    <FaGlobe className="w-5 h-5 text-primary" />
                  ) : (
                    <FaLock className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-light-text font-medium">
                    {formData.is_public ? 'Public Network' : 'Private Network'}
                  </h4>
                  <p className="text-gray-text text-sm">
                    {formData.is_public 
                      ? 'Anyone can discover and request to join' 
                      : 'Only invited peers can join'}
                  </p>
                </div>
              </div>
              <div className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                formData.is_public ? 'bg-primary' : 'bg-gray-600'
              }`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  formData.is_public ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </div>
          </div>

          {/* Network Benefits */}
          <div className="bg-dark-surface backdrop-blur-xl rounded-lg p-4 border border-white/5">
            <h4 className="text-light-text font-medium mb-2">Network Benefits</h4>
            <div className="text-sm text-gray-text space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaUsers className="w-3 h-3 text-primary" />
                </div>
                <p>Connect with peers for real-time data sharing</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaShareAlt className="w-3 h-3 text-cyan-400" />
                </div>
                <p>Share streams with granular permission controls</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaNetworkWired className="w-3 h-3 text-emerald-400" />
                </div>
                <p>Peer-to-peer connections for low latency</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Create Network
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNetworkModal;