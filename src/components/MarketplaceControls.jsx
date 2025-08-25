import React from 'react';

const MarketplaceControls = ({ currentFilter, setCurrentFilter, currentSearch, setCurrentSearch }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'installed', label: 'Installed' },
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium' },
    { value: 'recorder', label: 'Recorder' },
    { value: 'visualization', label: 'Visualization' },
  ];

  return (
    <div className="flex justify-between items-center flex-wrap gap-5 py-8 bg-dark-surface border-b border-white/10">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="relative flex-1 max-w-md w-full">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
          <input
            type="text"
            placeholder="Search extensions..."
            className="w-full py-3 pl-12 pr-5 rounded-full bg-dark-card border border-white/10 text-light-text text-base focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(38,166,154,0.2)] transition-all duration-300"
            value={currentSearch}
            onChange={(e) => setCurrentSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`py-2 px-4 bg-dark-card border border-white/10 rounded-full text-gray-text hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 ${currentFilter === filter.value ? 'bg-primary text-white border-primary' : ''}`}
              onClick={() => setCurrentFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceControls;