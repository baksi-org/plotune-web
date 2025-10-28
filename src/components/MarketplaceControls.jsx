// ExtensionsGrid component'inde MarketplaceControls'a isCoreAppConnected prop'unu geçtiğinizden emin olun
// MarketplaceControls component'inde bağlantı durumunu gösteren kısım:

const MarketplaceControls = ({ 
  currentFilter, 
  setCurrentFilter, 
  currentSearch, 
  setCurrentSearch, 
  extensionCount, 
  totalCount,
  isCoreAppConnected 
}) => {
  const filters = [
    { key: 'all', label: 'All Extensions', icon: 'fa-grid' },
    { key: 'free', label: 'Community', icon: 'fa-gift' },
    { key: 'premium', label: 'Premium', icon: 'fa-crown' },
    { key: 'enterprise', label: 'Enterprise', icon: 'fa-building' },
    { key: 'installed', label: 'Installed', icon: 'fa-check-circle' },
    { key: 'verified', label: 'Verified', icon: 'fa-shield-check' },
    { key: 'recorder', label: 'Recorder', icon: 'fa-record-vinyl' },
    { key: 'visualization', label: 'Visualization', icon: 'fa-chart-line' },
    { key: 'integration', label: 'Integration', icon: 'fa-plug' },
    { key: 'utility', label: 'Utility', icon: 'fa-tools' },
  ];

  return (
    <div className="bg-dark-card border-b border-white/5">
      <div className="container mx-auto px-5 py-6">
        {/* Header with connection status */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-light-text">
              Extensions
              <span className="text-gray-text text-lg font-normal ml-2">
                ({extensionCount}/{totalCount})
              </span>
            </h2>
            {isCoreAppConnected && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-2">
                <i className="fas fa-plug text-xs"></i>
                Connected to Plotune
              </span>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-text"></i>
          </div>
          <input
            type="text"
            placeholder="Search extensions by name, description, category, or tags..."
            value={currentSearch}
            onChange={(e) => setCurrentSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-card border border-white/10 rounded-xl text-light-text placeholder-gray-text focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          {currentSearch && (
            <button
              onClick={() => setCurrentSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-text hover:text-light-text transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setCurrentFilter(filter.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentFilter === filter.key
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white/5 text-gray-text hover:bg-white/10 hover:text-light-text'
              }`}
            >
              <i className={`fas ${filter.icon}`}></i>
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceControls;