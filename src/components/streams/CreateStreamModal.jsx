// components/streams/CreateStreamModal.jsx
import React, { useState } from 'react';

const CreateStreamModal = ({ onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_public: false
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Stream name is required';
    } else if (!formData.name.match(/^[a-zA-Z0-9_-]+$/)) {
      newErrors.name = 'Only letters, numbers, underscores and hyphens allowed';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Stream name must be less than 100 characters';
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

  // Limits based on user premium status
  const userLimits = user?.premium ? {
    max_messages_per_second: 100,
    max_message_size_bytes: 10240, // 10KB
    max_retention_messages: 10000
  } : {
    max_messages_per_second: 5,
    max_message_size_bytes: 1024, // 1KB
    max_retention_messages: 1000
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-light-text">Create New Stream</h3>
          <button
            onClick={onClose}
            className="text-gray-text hover:text-light-text transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-text mb-2 text-sm">Stream Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full p-3 bg-dark-surface rounded-lg border text-light-text focus:ring-2 focus:ring-primary/20 transition ${
                errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary'
              }`}
              placeholder="my-data-stream"
              maxLength={100}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-text mb-2 text-sm">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              rows="3"
              placeholder="Describe what this stream will be used for..."
              maxLength={500}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_public"
              checked={formData.is_public}
              onChange={(e) => handleChange('is_public', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="is_public" className="text-gray-text text-sm">
              Make this stream public
            </label>
          </div>

          {/* Plan Limits Display */}
          <div className="bg-dark-surface rounded-lg p-4 border border-white/5">
            <h4 className="text-light-text font-medium mb-2">
              {user?.premium ? 'Premium Plan Limits' : 'Free Plan Limits'}
            </h4>
            <div className="text-sm text-gray-text space-y-1">
              <p>• {userLimits.max_messages_per_second} messages/second</p>
              <p>• {userLimits.max_message_size_bytes} bytes max message size</p>
              <p>• {userLimits.max_retention_messages} messages retention</p>
              {!user?.premium && (
                <p className="text-primary text-xs mt-2">
                  Upgrade to premium for higher limits
                </p>
              )}
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
              Create Stream
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStreamModal;