import React, { useState } from 'react';

const DownloadSection = () => {
  const [activeTab, setActiveTab] = useState('windows');

  const downloadOptions = {
    windows: {
      icon: 'fab fa-windows',
      title: 'Windows',
      downloads: [
        {
          name: 'Windows Installer',
          description: 'Recommended for most users. Easy installation with automatic updates.',
          version: 'v1.0.0',
          size: '85 MB',
          downloadUrl: '#',
          type: 'exe'
        },
        {
          name: 'Windows Portable',
          description: 'No installation required. Run directly from any folder.',
          version: 'v1.0.0',
          size: '92 MB',
          downloadUrl: '#',
          type: 'zip'
        }
      ]
    },
    linux: {
      icon: 'fab fa-linux',
      title: 'Linux',
      downloads: [
        {
          name: 'DEB Package',
          description: 'For Debian/Ubuntu based distributions.',
          version: 'v1.0.0',
          size: '78 MB',
          downloadUrl: '#',
          type: 'deb'
        },
        {
          name: 'RPM Package',
          description: 'For Red Hat/Fedora based distributions.',
          version: 'v1.0.0',
          size: '80 MB',
          downloadUrl: '#',
          type: 'rpm'
        }
      ]
    }/*,
    macos: {
      icon: 'fab fa-apple',
      title: 'macOS',
      downloads: [
        {
          name: 'macOS App',
          description: 'Native macOS application. Drag to Applications folder.',
          version: 'v1.0.0',
          size: '95 MB',
          downloadUrl: '#',
          type: 'dmg'
        }
      ]
    }*/
  };

  const currentPlatform = downloadOptions[activeTab];

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container mx-auto px-5 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-light-text mb-4">Download Plotune</h2>
          <p className="text-xl text-gray-text max-w-2xl mx-auto">
            Get started with the latest version of Plotune. Simple, fast, and ready to use.
          </p>
        </div>

        {/* Platform Selector */}
        <div className="flex justify-center gap-6 mb-12">
          {Object.entries(downloadOptions).map(([key, platform]) => (
            <button
              key={key}
              className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                activeTab === key
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-white/10 bg-dark-card hover:border-white/30 hover:scale-102'
              }`}
              onClick={() => setActiveTab(key)}
            >
              <i className={`${platform.icon} text-4xl mb-3 ${
                activeTab === key ? 'text-primary' : 'text-gray-text'
              }`}></i>
              <span className={`font-semibold text-lg ${
                activeTab === key ? 'text-light-text' : 'text-gray-text'
              }`}>
                {platform.title}
              </span>
            </button>
          ))}
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {currentPlatform.downloads.map((download, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-2xl p-8 border border-white/5 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-light-text mb-2 group-hover:text-primary transition-colors">
                    {download.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-text">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-tag"></i>
                      {download.version}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-weight-hanging"></i>
                      {download.size}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium">
                      {download.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <i className={`${currentPlatform.icon} text-3xl text-primary/50 group-hover:text-primary transition-colors`}></i>
              </div>

              <p className="text-gray-text mb-6 leading-relaxed">
                {download.description}
              </p>

              <div className="flex gap-3">
                <a
                  href={download.downloadUrl}
                  className="flex-1 py-4 px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 font-semibold text-center group/download-btn"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Now
                </a>
                <button className="p-4 bg-dark-surface border border-white/10 rounded-xl hover:border-primary/30 hover:text-primary transition-all duration-300">
                  <i className="fas fa-info"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <div className="inline-flex flex-wrap justify-center gap-8 text-gray-text">
            <div className="flex items-center gap-2">
              <i className="fas fa-shield-alt text-primary"></i>
              <span>Secure & Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-bolt text-primary"></i>
              <span>Fast Installation</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-sync-alt text-primary"></i>
              <span>Auto Updates</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-text mb-4">
              Looking for older versions or source code?
            </p>
            <a
              href="https://github.com/baksi-org/plotune/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 bg-dark-surface border border-white/10 rounded-xl hover:border-primary hover:text-primary transition-all duration-300"
            >
              <i className="fab fa-github"></i>
              View All Releases on GitHub
            </a>
          </div>

          <div className="mt-8 text-sm text-gray-text max-w-2xl mx-auto">
            <p>
              Need help with installation? Check out our{' '}
              <a href="#/docs" className="text-primary hover:underline">documentation</a>{' '}
              or join our{' '}
              <a href="#" className="text-primary hover:underline">community Discord</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;