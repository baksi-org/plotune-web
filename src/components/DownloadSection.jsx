import React, { useState } from 'react';

const DownloadSection = () => {
  const [activeTab, setActiveTab] = useState('windows');
  const [activeVersion, setActiveVersion] = useState('stable');

  return (
    <section className="py-16 bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text mb-3">Available Downloads</h2>
          <p className="text-gray-text">Select your platform and version to get started with Plotune</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`py-2 px-4 rounded-full border ${activeTab === 'windows' ? 'bg-primary text-white border-primary' : 'bg-dark-card text-gray-text border-white/10'} hover:bg-primary hover:text-white transition-all duration-300`}
            onClick={() => setActiveTab('windows')}
          >
            Windows
          </button>
          <button
            className={`py-2 px-4 rounded-full border ${activeTab === 'linux' ? 'bg-primary text-white border-primary' : 'bg-dark-card text-gray-text border-white/10'} hover:bg-primary hover:text-white transition-all duration-300`}
            onClick={() => setActiveTab('linux')}
          >
            Linux
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button
            className={`py-2 px-4 rounded-full border ${activeVersion === 'stable' ? 'bg-primary text-white border-primary' : 'bg-dark-card text-gray-text border-white/10'} hover:bg-primary hover:text-white transition-all duration-300`}
            onClick={() => setActiveVersion('stable')}
          >
            Stable (v1.0.0)
          </button>
          <button
            className={`py-2 px-4 rounded-full border ${activeVersion === 'alpha' ? 'bg-primary text-white border-primary' : 'bg-dark-card text-gray-text border-white/10'} hover:bg-primary hover:text-white transition-all duration-300`}
            onClick={() => setActiveVersion('alpha')}
          >
            Alpha (v0.9.0-alpha)
          </button>
        </div>

        {activeTab === 'windows' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
              <div className="text-3xl text-primary mb-4"><i className="fab fa-windows"></i></div>
              <h3 className="text-xl font-semibold text-light-text mb-2">
                Windows Installer <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs">Stable</span>
              </h3>
              <p className="text-gray-text mb-4">Recommended for most users. Includes all stable features with automatic updates.</p>
              <div className="flex justify-between text-sm text-gray-text mb-4">
                <span>Version: 1.0.0</span>
                <span>Size: 85 MB</span>
              </div>
              <a href="#" className="block text-center py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-all duration-300">
                <i className="fas fa-download mr-2"></i> Download (64-bit)
              </a>
            </div>
            <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
              <div className="text-3xl text-primary mb-4"><i className="fab fa-windows"></i></div>
              <h3 className="text-xl font-semibold text-light-text mb-2">
                Windows Portable <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs">Stable</span>
              </h3>
              <p className="text-gray-text mb-4">Portable version that doesn't require installation. Run directly from any folder.</p>
              <div className="flex justify-between text-sm text-gray-text mb-4">
                <span>Version: 1.0.0</span>
                <span>Size: 92 MB</span>
              </div>
              <a href="#" className="block text-center py-2 px-4 bg-dark-card border border-gray-text text-gray-text rounded hover:border-light-text hover:text-light-text transition-all duration-300">
                <i className="fas fa-download mr-2"></i> Download Portable
              </a>
            </div>
            {activeVersion === 'alpha' && (
              <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
                <div className="text-3xl text-primary mb-4"><i className="fab fa-windows"></i></div>
                <h3 className="text-xl font-semibold text-light-text mb-2">
                  Windows Alpha <span className="px-2 py-1 rounded bg-amber-500/15 text-amber-400 text-xs">Alpha</span>
                </h3>
                <p className="text-gray-text mb-4">Early access to upcoming features. Not recommended for production use.</p>
                <div className="flex justify-between text-sm text-gray-text mb-4">
                  <span>Version: 0.9.0-alpha</span>
                  <span>Size: 88 MB</span>
                </div>
                <a href="#" className="block text-center py-2 px-4 bg-dark-card border border-gray-text text-gray-text rounded hover:border-light-text hover:text-light-text transition-all duration-300">
                  <i className="fas fa-download mr-2"></i> Download Alpha
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'linux' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
              <div className="text-3xl text-primary mb-4"><i className="fab fa-linux"></i></div>
              <h3 className="text-xl font-semibold text-light-text mb-2">
                Linux DEB Package <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs">Stable</span>
              </h3>
              <p className="text-gray-text mb-4">For Debian/Ubuntu based distributions. Install with your package manager.</p>
              <div className="flex justify-between text-sm text-gray-text mb-4">
                <span>Version: 1.0.0</span>
                <span>Size: 78 MB</span>
              </div>
              <a href="#" className="block text-center py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-all duration-300">
                <i className="fas fa-download mr-2"></i> Download DEB
              </a>
            </div>
            <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
              <div className="text-3xl text-primary mb-4"><i className="fab fa-linux"></i></div>
              <h3 className="text-xl font-semibold text-light-text mb-2">
                Linux RPM Package <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs">Stable</span>
              </h3>
              <p className="text-gray-text mb-4">For Red Hat/Fedora based distributions. Install with your package manager.</p>
              <div className="flex justify-between text-sm text-gray-text mb-4">
                <span>Version: 1.0.0</span>
                <span>Size: 80 MB</span>
              </div>
              <a href="#" className="block text-center py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-all duration-300">
                <i className="fas fa-download mr-2"></i> Download RPM
              </a>
            </div>
            {activeVersion === 'alpha' && (
              <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
                <div className="text-3xl text-primary mb-4"><i className="fab fa-linux"></i></div>
                <h3 className="text-xl font-semibold text-light-text mb-2">
                  Linux Alpha Build <span className="px-2 py-1 rounded bg-amber-500/15 text-amber-400 text-xs">Alpha</span>
                </h3>
                <p className="text-gray-text mb-4">Early access build for Linux. Includes experimental features.</p>
                <div className="flex justify-between text-sm text-gray-text mb-4">
                  <span>Version: 0.9.0-alpha</span>
                  <span>Size: 82 MB</span>
                </div>
                <a href="#" className="block text-center py-2 px-4 bg-dark-card border border-gray-text text-gray-text rounded hover:border-light-text hover:text-light-text transition-all duration-300">
                  <i className="fas fa-download mr-2"></i> Download Alpha
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DownloadSection;