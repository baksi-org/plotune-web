// components/streams/CreateStreamModal.jsx
import React, { useState } from 'react';

const CreateStreamModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    partitions: 1,
    retentionHours: 24,
    replicationFactor: 1
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Stream name is required';
    } else if (!formData.name.match(/^[a-zA-Z0-9_-]+$/)) {
      newErrors.name = 'Only letters, numbers, underscores and hyphens allowed';
    }
    if (formData.partitions < 1 || formData.partitions > 10) {
      newErrors.partitions = 'Partitions must be between 1 and 10';
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
            <label className="block text-gray-text mb-2 text-sm">Stream Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full p-3 bg-dark-surface rounded-lg border text-light-text focus:ring-2 focus:ring-primary/20 transition ${
                errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary'
              }`}
              placeholder="my-data-stream"
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
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-text mb-2 text-sm">Partitions</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.partitions}
                onChange={(e) => handleChange('partitions', parseInt(e.target.value))}
                className={`w-full p-3 bg-dark-surface rounded-lg border text-light-text focus:ring-2 focus:ring-primary/20 transition ${
                  errors.partitions ? 'border-red-500' : 'border-white/10 focus:border-primary'
                }`}
              />
              {errors.partitions && <p className="text-red-400 text-xs mt-1">{errors.partitions}</p>}
            </div>

            <div>
              <label className="block text-gray-text mb-2 text-sm">Retention (hours)</label>
              <select
                value={formData.retentionHours}
                onChange={(e) => handleChange('retentionHours', parseInt(e.target.value))}
                className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              >
                <option value={1}>1 hour</option>
                <option value={6}>6 hours</option>
                <option value={24}>24 hours</option>
                <option value={168}>7 days</option>
                <option value={720}>30 days</option>
              </select>
            </div>
          </div>

          <div className="bg-dark-surface rounded-lg p-4 border border-white/5">
            <h4 className="text-light-text font-medium mb-2">Standard Plan Limits</h4>
            <div className="text-sm text-gray-text space-y-1">
              <p>• Max 10 partitions per stream</p>
              <p>• 1GB storage included</p>
              <p>• Basic monitoring</p>
              <p>• Up to 5 shared users</p>
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