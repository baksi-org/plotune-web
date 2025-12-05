import React, { useState, useEffect } from 'react';

const DownloadSection = () => {
  const [activeTab, setActiveTab] = useState('windows');

  useEffect(() => {
    let os = 'windows';
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('win')) {
      os = 'windows';
    } else if (ua.includes('linux')) {
      os = 'linux';
    }
    // Only set if the detected OS is available in downloadOptions
    if (downloadOptions[os]) {
      setActiveTab(os);
    }
  }, []);

  const downloadOptions = {
    windows: {
      icon: 'fab fa-windows',
      title: 'Windows',
      downloads: [
        {
          name: 'Windows Installer',
          description: 'Recommended for most users. Easy installation with automatic updates.',
          version: 'v1.0.0',
          size: '57.7 MB',
          downloadUrl: 'https://github.com/baksi-org/plotune-dl/releases/download/v1.0.0-win/Setup.Plotune.zip',
          type: 'exe',
          instructions: [
            'Download the installer above',
            'Run the .exe file',
            'Follow the setup wizard',
            'Launch Plotune and enjoy!'
          ]
        }
      ]
    },
    linux: {
      icon: 'fab fa-linux',
      title: 'Linux',
      downloads: [
        {
          name: 'Snap Store',
          description: 'Recommended for Linux users. Easy installation and automatic updates from the Snap Store.',
          version: 'v1.0.0',
          size: '~78 MB',
          downloadUrl: 'https://snapcraft.io/plotune',
          type: 'snap',
          command: 'sudo snap install plotune',
          instructions: [
            'Open your terminal',
            'Run: sudo snap install plotune',
            'Or click the button below to open Snap Store',
            'Launch from your applications menu'
          ]
        }
      ]
    }
  };

  const currentPlatform = downloadOptions[activeTab];

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container mx-auto px-5 max-w-6xl">
        {/* Platform Selector */}
        <div className="flex justify-center gap-8 mb-16">
          {Object.entries(downloadOptions).map(([key, platform]) => (
            <button
              key={key}
              className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 border-2 ${
                activeTab === key
                  ? 'border-primary scale-105 bg-primary/10'
                  : 'border-white/10 hover:border-white/30 hover:scale-102'
              }`}
              onClick={() => setActiveTab(key)}
            >
              <i className={`${platform.icon} text-4xl mb-3 ${
                activeTab === key ? 'text-primary' : 'text-gray-text'
              }`}></i>
              <span className={`font-semibold ${
                activeTab === key ? 'text-primary' : 'text-gray-text'
              }`}>
                {platform.title}
              </span>
            </button>
          ))}
        </div>

        {/* Download Cards */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          {currentPlatform.downloads.map((download, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-2xl p-8 border-2 border-white/5 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-light-text group-hover:text-primary transition-colors">
                      {download.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      {download.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-text mb-4">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-tag"></i>
                      {download.version}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-weight-hanging"></i>
                      {download.size}
                    </span>
                    {download.command && (
                      <span className="flex items-center gap-1 font-mono text-xs bg-black/30 px-2 py-1 rounded">
                        <i className="fas fa-terminal"></i>
                        {download.command}
                      </span>
                    )}
                  </div>
                </div>
                <i className={`${currentPlatform.icon} text-3xl text-primary/50 group-hover:text-primary transition-colors ml-4`}></i>
              </div>

              <p className="text-gray-text mb-6 leading-relaxed">
                {download.description}
              </p>

              {/* Installation Instructions */}
              <div className="bg-black/20 rounded-xl p-6 mb-6">
                <h4 className="text-light-text font-semibold mb-4 flex items-center gap-2">
                  <i className="fas fa-list-ol text-primary"></i>
                  Installation Steps:
                </h4>
                <ol className="text-gray-text space-y-2">
                  {download.instructions.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full text-sm flex items-center justify-center mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={download.downloadUrl}
                  className="flex-1 py-4 px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 font-semibold text-center group/download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download
                </a>
                
                {download.type === 'snap' && (
                  <a
                    href="https://snapcraft.io/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 border border-white/20 text-gray-text rounded-xl hover:border-primary hover:text-primary transition-all duration-300 font-medium text-center"
                  >
                    <i className="fas fa-book mr-2"></i>
                    Snap Guide
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="text-center pt-8 border-t border-white/10">
          <div className="inline-flex flex-wrap justify-center gap-8 text-gray-text mb-12">
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

          <div className="max-w-md mx-auto">
            <a
              href="https://github.com/baksi-org/plotune-dl/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-dark-surface border border-white/10 rounded-xl hover:border-primary hover:text-primary transition-all duration-300 group"
            >
              <i className="fab fa-github text-lg"></i>
              <span className="font-medium">View All Releases on GitHub</span>
            </a>
          </div>

          <div className="mt-12 text-sm text-gray-text max-w-lg mx-auto">
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