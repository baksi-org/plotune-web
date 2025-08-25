import React from 'react';

const ExtensionsGrid = ({ extensions, backendUrl, toggleExtension, installExtension, buyExtension, visitWebsite }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-5 py-10">
      {extensions.length === 0 ? (
        <div className="text-center py-5 text-lg text-gray-600">Loading extensions...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {extensions.map((extension) => (
            <div
              key={extension.id}
              className="bg-dark-card rounded-custom overflow-hidden border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300"
            >
              <div className="p-5 border-b border-white/5">
                <div className="flex gap-2 mb-4">
                  {extension.mode === 'hybrid' && <span className="px-2 py-1 rounded bg-amber-500/15 text-amber-400 text-xs font-semibold">Hybrid</span>}
                  {extension.category === 'Recorder' && <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs font-semibold">Lite</span>}
                  {extension.category === 'Visualization' && <span className="px-2 py-1 rounded bg-secondary/15 text-secondary text-xs font-semibold">Pro</span>}
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-light-text">{extension.name}</h3>
                  <span className="text-gray-text">v{extension.version}</span>
                </div>
                <div className="text-sm text-gray-text mb-4">by {extension.author}</div>
                <div className="text-gray-text mb-5 min-h-[60px]">{extension.description}</div>
                <div className="flex justify-between text-sm text-gray-text">
                  <span>{extension.category}</span>
                  <span>Updated: {formatDate(extension.last_updated)}</span>
                </div>
              </div>
              <div className="p-5">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2 py-2 border-b border-white/5 last:border-b-0">
                    <i className="fas fa-check-circle text-primary"></i>
                    {extension.file_formats.length} file formats supported
                  </li>
                  <li className="flex items-center gap-2 py-2 border-b border-white/5 last:border-b-0">
                    <i className="fas fa-plug text-primary"></i>
                    {extension.mode} mode
                  </li>
                  <li className="flex items-center gap-2 py-2 border-b border-white/5 last:border-b-0">
                    <i className="fas fa-server text-primary"></i>
                    Runs on {extension.os}
                  </li>
                </ul>
                <div className="flex gap-2 flex-wrap">
                  {backendUrl && extension.installed ? (
                    <button
                      onClick={() => toggleExtension(extension.id)}
                      className="flex-1 min-w-[120px] py-2.5 px-4 bg-primary/15 text-primary rounded hover:bg-primary/25 transition-all duration-300"
                    >
                      <i className="fas fa-power-off mr-2"></i>
                      {extension.enabled ? 'Disable' : 'Enable'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => installExtension(extension.id)}
                        className="flex-1 min-w-[120px] py-2.5 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-all duration-300"
                      >
                        <i className="fas fa-download mr-2"></i> Install
                      </button>
                      {extension.category === 'Visualization' && (
                        <button
                          onClick={() => buyExtension(extension.id)}
                          className="flex-1 min-w-[120px] py-2.5 px-4 bg-secondary text-white rounded hover:bg-indigo-700 transition-all duration-300"
                        >
                          <i className="fas fa-shopping-cart mr-2"></i> Buy ($5)
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => visitWebsite(extension.git_path)}
                    className="flex-1 min-w-[120px] py-2.5 px-4 border border-gray-text text-gray-text rounded hover:border-light-text hover:text-light-text transition-all duration-300"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i> Website
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExtensionsGrid;