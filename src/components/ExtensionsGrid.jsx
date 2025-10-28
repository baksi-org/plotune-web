import React from 'react';

const ExtensionsGrid = ({ 
  extensions, 
  loading, 
  isCoreAppConnected, 
  toggleExtension, 
  installExtension, 
  buyExtension, 
  visitWebsite, 
  visitRepo 
}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPremiumBadge = (premiumLevel) => {
    switch (premiumLevel) {
      case 0:
        return { label: 'Community', class: 'bg-green-500/15 text-green-400' };
      case 1:
        return { label: 'Premium', class: 'bg-blue-500/15 text-blue-400' };
      case 2:
        return { label: 'Custom', class: 'bg-purple-500/15 text-purple-400' };
      default:
        return { label: 'Community', class: 'bg-gray-500/15 text-gray-400' };
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Recorder': 'bg-primary/15 text-primary',
      'Visualization': 'bg-secondary/15 text-secondary',
      'Analysis': 'bg-orange-500/15 text-orange-400',
      'Integration': 'bg-teal-500/15 text-teal-400',
      'Utility': 'bg-indigo-500/15 text-indigo-400',
      'Generator': 'bg-pink-500/15 text-pink-400',
      'Reader': 'bg-cyan-500/15 text-cyan-400',
      'Processor': 'bg-amber-500/15 text-amber-400',
      'Communication': 'bg-lime-500/15 text-lime-400',
      'Other': 'bg-gray-500/15 text-gray-400'
    };
    return colors[category] || colors['Other'];
  };

  if (loading) {
    return (
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-dark-card rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-8">
      {extensions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-light-text mb-2">No extensions found</h3>
          <p className="text-gray-text">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {extensions.map((extension) => {
            const premiumBadge = getPremiumBadge(extension.premium_level);
            const categoryColor = getCategoryColor(extension.category);
            
            return (
              <div
                key={extension.id}
                className="bg-dark-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/25 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="p-5 border-b border-white/5">
                  {/* Header with badges */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${categoryColor}`}>
                        {extension.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${premiumBadge.class}`}>
                        {premiumBadge.label}
                      </span>
                      {extension.is_verified && (
                        <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                          Verified
                        </span>
                      )}
                    </div>
                    {extension.installed && (
                      <span className="px-2 py-1 rounded bg-green-500/15 text-green-400 text-xs font-semibold">
                        Installed
                      </span>
                    )}
                  </div>

                  {/* Extension info */}
                  <div className="flex items-start gap-3 mb-3">
                    <img 
                      src={extension.logo} 
                      alt={extension.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48x48/2D3748/1A202C?text=PL';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-light-text truncate">
                        {extension.name}
                      </h3>
                      <p className="text-sm text-gray-text">by {extension.author}</p>
                    </div>
                  </div>

                  <p className="text-gray-text text-sm mb-4 line-clamp-2">
                    {extension.description}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-between text-xs text-gray-text mb-3">
                    <span>v{extension.version}</span>
                    {extension.installed && (
                      <span className={extension.enabled ? 'text-green-400' : 'text-orange-400'}>
                        {extension.enabled ? '● Enabled' : '● Disabled'}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {extension.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-text"
                      >
                        {tag}
                      </span>
                    ))}
                    {extension.tags.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-text">
                        +{extension.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  {/* OS Support */}
                  <div className="flex items-center gap-2 text-xs text-gray-text mb-4">
                    <i className="fas fa-desktop"></i>
                    <span>Supports: {extension.os.join(', ')}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {isCoreAppConnected && extension.installed ? (
                      <button
                        onClick={() => toggleExtension(extension.id)}
                        className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          extension.enabled 
                            ? 'bg-orange-500/15 text-orange-400 hover:bg-orange-500/25' 
                            : 'bg-primary/15 text-primary hover:bg-primary/25'
                        }`}
                      >
                        <i className={`fas ${extension.enabled ? 'fa-pause' : 'fa-play'}`}></i>
                        {extension.enabled ? 'Disable' : 'Enable'}
                      </button>
                    ) : (
                      <>
                        {extension.premium_level === 2 ? (
                          <button
                            onClick={() => buyExtension(extension.id)}
                            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <i className="fas fa-shopping-cart"></i>
                            Buy - ${extension.price}
                          </button>
                        ) : extension.premium_level === 1 ? (
                          <button
                            onClick={() => buyExtension(extension.id)}
                            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            Upgrade
                          </button>
                        ) : (
                          <button
                            onClick={() => installExtension(extension.id)}
                            className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:from-primary-dark hover:to-primary transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            {isCoreAppConnected ? 'Install' : 'Download Plotune'}
                          </button>
                        )}
                      </>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => visitRepo(extension.repo)}
                        className="flex-1 py-2 px-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-all duration-200 text-sm flex items-center justify-center gap-1"
                      >
                        <i className="fab fa-github"></i>
                        Repo
                      </button>
                      <button
                        onClick={() => visitWebsite(extension.web)}
                        className="flex-1 py-2 px-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-all duration-200 text-sm flex items-center justify-center gap-1"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Last updated */}
                  <div className="text-xs text-gray-text text-center mt-3">
                    Updated: {formatDate(extension.last_updated)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExtensionsGrid;