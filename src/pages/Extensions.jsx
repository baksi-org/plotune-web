import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MarketplaceHero from '../components/MarketplaceHero';
import MarketplaceControls from '../components/MarketplaceControls';
import ExtensionsGrid from '../components/ExtensionsGrid';

const Extensions = () => {
  const [extensions, setExtensions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSearch, setCurrentSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const sampleExtensions = [
    {
      id: '0b2f25a9-3a7e-4e72-b8e4-1a7b7a4dbb01',
      app_id: 'random_data_stream',
      name: 'Random Data Stream',
      version: '1.0.0',
      core_version: '>=1.0.0',
      author: 'Plotune Team',
      description: 'Generates synthetic data for testing and simulation of live signal environments.',
      category: 'Generator',
      tags: ['random', 'data', 'simulation', 'testing'],
      os: ["Linux", "Windows"],
      last_updated: '2024-01-15',
      repo: 'https://github.com/plotune/random-data-stream',
      logo: 'https://i.imgur.com/C4l2RaF.jpeg',
      deployment: 'https://ext.plotune.net/public/random_data_stream.zip',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/random-data-stream',
      documentation: 'https://docs.plotune.net/random-data-stream',
      premium_level: 0,
      is_verified: true,
      installed: false,
      enabled: false,
      price: 0
    },
    {
      id: '4ca800c2-75cc-4134-8dbd-950361c0e675',
      app_id: 'simple_reader',
      name: 'Simple Reader',
      version: '1.0.0',
      core_version: '>=1.0.0',
      author: 'Plotune Team',
      description: 'Reads PLTX and various file formats for quick data visualization and analysis.',
      category: 'Reader',
      tags: ['reader', 'file', 'pltx', 'import'],
      os: ["Linux", "Windows"],
      last_updated: '2024-01-15',
      repo: 'https://github.com/plotune/simple-reader',
      logo: 'https://i.imgur.com/C4l2RaF.jpeg',
      deployment: 'https://ext.plotune.net/public/simple_reader.zip',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/simple-reader',
      documentation: 'https://docs.plotune.net/simple-reader',
      premium_level: 0,
      is_verified: true,
      installed: false,
      enabled: false,
      price: 0
    },
    {
      id: '5e9f22a1-1b34-4d31-a922-b0f7b5de3a81',
      app_id: 'table_reader',
      name: 'Table Reader',
      version: '1.0.0',
      core_version: '>=1.0.0',
      author: 'Plotune Team',
      description: 'Handles tabular data sources such as CSV, XLSX, and TSV for structured analysis.',
      category: 'Reader',
      tags: ['table', 'csv', 'excel', 'data'],
      os: ["Linux", "Windows"],
      last_updated: '2024-01-15',
      repo: 'https://github.com/plotune/table-reader',
      logo: 'https://i.imgur.com/C4l2RaF.jpeg',
      deployment: 'https://ext.plotune.net/public/table_reader.zip',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/table-reader',
      documentation: 'https://docs.plotune.net/table-reader',
      premium_level: 0,
      is_verified: true,
      installed: false,
      enabled: false,
      price: 0
    },
    {
      id: '7d6b1d3e-46b4-40c0-8c03-9d60b12a6b14',
      app_id: 'ffmpeg_extension',
      name: 'FFmpeg Extension',
      version: '1.0.0',
      core_version: '>=1.0.0',
      author: 'Plotune Team',
      description: 'Adds advanced video and audio processing capabilities using FFmpeg integration.',
      category: 'Processor',
      tags: ['ffmpeg', 'video', 'audio', 'media'],
      os: ["Linux", "Windows"],
      last_updated: '2024-01-15',
      repo: 'https://github.com/plotune/ffmpeg-extension',
      logo: 'https://i.imgur.com/C4l2RaF.jpeg',
      deployment: 'https://ext.plotune.net/public/ffmpeg_extension.zip',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/ffmpeg-extension',
      documentation: 'https://docs.plotune.net/ffmpeg-extension',
      premium_level: 0,
      is_verified: true,
      installed: false,
      enabled: false,
      price: 0
    },
    {
      id: '9f3a5c94-2eab-4821-b68c-1a927ae8cda2',
      app_id: 'embedded_basic',
      name: 'Embedded Basic',
      version: '1.0.0',
      core_version: '>=1.0.0',
      author: 'Plotune Team',
      description: 'Provides UART and embedded system communication capabilities for hardware interfacing.',
      category: 'Communication',
      tags: ['uart', 'embedded', 'communication', 'hardware'],
      os: ["Linux", "Windows"],
      last_updated: '2024-01-15',
      repo: 'https://github.com/plotune/embedded-basic',
      logo: 'https://i.imgur.com/C4l2RaF.jpeg',
      deployment: 'https://ext.plotune.net/public/embedded_basic.zip',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/embedded-basic',
      documentation: 'https://docs.plotune.net/embedded-basic',
      premium_level: 0,
      is_verified: true,
      installed: false,
      enabled: false,
      price: 0
    }
  ];

  useEffect(() => {
    console.log("Initializing Extensions component...");
    loadExtensions();
  }, []);

  const loadExtensions = async () => {
    console.log("Loading extensions...");
    setLoading(true);
    
    try {
      const baseExtensions = await loadBaseExtensions();
      setExtensions(baseExtensions);
    } catch (error) {
      console.error("Error loading extensions:", error);
      // toast.error("Failed to load extensions");
    } finally {
      setLoading(false);
    }
  };

  const loadBaseExtensions = async () => {
    try {
      console.log("Fetching from market API...");
      const response = await fetch('https://api.plotune.net/api/extensions');
      
      if (!response.ok) {
        throw new Error(`Market API returned ${response.status}`);
      }
      
      const marketExtensions = await response.json();
      console.log("Market API response:", marketExtensions);
      
      return marketExtensions
        .filter(ext => ext.premium_level !== 3)
        .map(ext => ({
          ...ext,
          installed: false,
          enabled: false
        }));
    } catch (error) {
      console.log("Market API failed, using sample extensions:", error.message);
      return sampleExtensions
        .filter(ext => ext.premium_level !== 3)
        .map(ext => ({
          ...ext,
          installed: false,
          enabled: false
        }));
    }
  };

  const matchesFilter = (extension) => {
    if (currentSearch) {
      const searchLower = currentSearch.toLowerCase();
      const matchesSearch = 
        extension.name.toLowerCase().includes(searchLower) ||
        extension.description.toLowerCase().includes(searchLower) ||
        extension.category.toLowerCase().includes(searchLower) ||
        (extension.tags && extension.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
        extension.author.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    switch (currentFilter) {
      case 'free':
        return extension.premium_level === 0;
      case 'premium':
        return extension.premium_level === 1;
      case 'enterprise':
        return extension.premium_level === 2;
      case 'recorder':
        return extension.category === 'Recorder';
      case 'visualization':
        return extension.category === 'Visualization';
      case 'integration':
        return extension.category === 'Integration';
      case 'utility':
        return extension.category === 'Utility';
      case 'analysis':
        return extension.category === 'Analysis';
      case 'verified':
        return extension.is_verified;
      default:
        return true;
    }
  };

  const installExtension = async (id) => {
    const extension = extensions.find(ext => ext.id === id);
    if (!extension) return;

    const customUrl = `plotune://install?repo=${encodeURIComponent(extension.deployment)}&method=github&source=market`;
    
    console.log("Attempting to install via custom URL:", customUrl);
    
    // Önce custom URL'yi deneyelim
    window.location.href = customUrl;
    
    // Fallback: Eğer custom URL çalışmazsa (bir süre sonra hala bu sayfadaysak) download sayfasına yönlendir
    setTimeout(() => {
      // Hala bu sayfadaysak ve sayfa gizli değilse, custom URL başarısız olmuş demektir
      if (!document.hidden) {
        console.log("Custom URL failed, redirecting to download page");
        // toast.info("Plotune not detected. Redirecting to download page...");
        window.open('/#/download', '_blank');
      }
    }, 1500);
  };

  const buyExtension = (id) => {
    const extension = extensions.find(ext => ext.id === id);
    if (extension) {
      toast.info(`Redirecting to purchase: ${extension.name} - $${extension.price}`);
      window.open(`https://plotune.net/purchase/${extension.app_id}`, '_blank');
    }
  };

  const visitWebsite = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('No website available for this extension.');
    }
  };

  const visitRepo = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('No repository available for this extension.');
    }
  };

  const filteredExtensions = extensions.filter(matchesFilter);

  console.log("Current state:", { 
    extensionsCount: extensions.length, 
    filteredCount: filteredExtensions.length,
    loading
  });

  return (
    <>
      <MarketplaceHero />
      <MarketplaceControls
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        currentSearch={currentSearch}
        setCurrentSearch={setCurrentSearch}
        extensionCount={filteredExtensions.length}
        totalCount={extensions.length}
      />
      <ExtensionsGrid
        extensions={filteredExtensions}
        loading={loading}
        installExtension={installExtension}
        buyExtension={buyExtension}
        visitWebsite={visitWebsite}
        visitRepo={visitRepo}
      />
    </>
  );
};

export default Extensions;