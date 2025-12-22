import React from 'react';

const MarketplaceControls = ({
  currentFilter,
  setCurrentFilter,
  currentSearch,
  setCurrentSearch,
  extensionCount,
  totalCount
}) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'verified', label: 'Verified' },
    { key: 'core', label: 'Core' },
    { key: 'package', label: 'Package' },
    { key: 'stream', label: 'Stream' },
    { key: 'cloud', label: 'Cloud' },
  ];

  return (
    <div className="bg-dark-card border-b border-white/5">
      <div className="container mx-auto px-5 py-5">
        {/* Search Bar - Minimal */}
        <div className="relative max-w-xl mx-auto mb-5">
          <input
            type="text"
            placeholder="Search extensions..."
            value={currentSearch}
            onChange={(e) => setCurrentSearch(e.target.value)}
            className="w-full px-4 py-2.5 bg-dark-card border border-white/10 rounded-lg text-light-text placeholder-gray-text focus:outline-none focus:border-primary/30 transition-all duration-200 text-sm"
          />
          {currentSearch && (
            <button
              onClick={() => setCurrentSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-text hover:text-light-text transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Tabs - Minimal */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setCurrentFilter(filter.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                currentFilter === filter.key
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-white/5 text-gray-text hover:bg-white/10 hover:text-light-text'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results Count - Subtle */}
        <div className="text-center mt-3 text-xs text-gray-text/60">
          {extensionCount} of {totalCount}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceControls;