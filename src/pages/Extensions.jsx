import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MarketplaceHero from '../components/MarketplaceHero';
import MarketplaceControls from '../components/MarketplaceControls';
import ExtensionsGrid from '../components/ExtensionsGrid';

const Extensions = () => {
  const [extensions, setExtensions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSearch, setCurrentSearch] = useState('');
  const [isCoreAppConnected, setIsCoreAppConnected] = useState(false);
  const [coreAppUrl, setCoreAppUrl] = useState(null);
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
    initializeExtensions();
  }, []);

  const initializeExtensions = async () => {
    const connectionResult = await checkCoreAppConnection();
    
    if (connectionResult.connected) {
      console.log("Proceeding with core app connection");
      await loadExtensionsWithCoreApp(connectionResult.url);
    } else {
      console.log("Proceeding without core app connection");
      await loadExtensionsWithoutCoreApp();
    }
  };

  const checkCoreAppConnection = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const conn = urlParams.get("conn") || hashParams.get("conn");

    console.log("Conn parameter:", conn);

    if (!conn) {
      console.log("No conn parameter found");
      return { connected: false, url: null };
    }

    try {
      const decoded = atob(conn);
      const [ip, port] = decoded.split(":");
      
      if (!ip || !port || isNaN(port) || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
        throw new Error("Invalid IP or port format");
      }

      const url = `http://${ip}:${port}`;
      console.log("Testing connection to:", url);

      try {
        const response = await fetch(`${url}/api/extensions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log("✅ Core app connection successful");
          setIsCoreAppConnected(true);
          setCoreAppUrl(url);
          return { connected: true, url };
        } else {
          console.log("❌ Core app responded with error:", response.status);
        }
      } catch (error) {
        console.log("❌ Core app connection failed:", error.message);
      }
    } catch (error) {
      console.error("Invalid conn parameter:", error.message);
    }

    setIsCoreAppConnected(false);
    setCoreAppUrl(null);
    return { connected: false, url: null };
  };

  const loadExtensionsWithCoreApp = async (url) => {
    console.log("Loading extensions WITH core app integration");
    setLoading(true);
    
    try {
      // First load the base extensions
      const baseExtensions = await loadBaseExtensions();
      console.log("Base extensions loaded:", baseExtensions.length);
      
      // Then update their status from core app
      const updatedExtensions = await updateExtensionsStatus(baseExtensions, url);
      console.log("Extensions after core app update:", updatedExtensions);
      
      setExtensions(updatedExtensions);
    } catch (error) {
      console.error("Error loading extensions with core app:", error);
      toast.error("Failed to load extensions");
    } finally {
      setLoading(false);
    }
  };

  const loadExtensionsWithoutCoreApp = async () => {
    console.log("Loading extensions WITHOUT core app integration");
    setLoading(true);
    
    try {
      const baseExtensions = await loadBaseExtensions();
      setExtensions(baseExtensions);
    } catch (error) {
      console.error("Error loading extensions:", error);
      toast.error("Failed to load extensions");
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

  const updateExtensionsStatus = async (extensionsList, url) => {
    try {
      console.log("Fetching installed extensions from core app...");
      const response = await fetch(`${url}/api/extensions`);
      
      if (!response.ok) {
        throw new Error(`Core app returned ${response.status}`);
      }
      
      const coreExtensions = await response.json();
      console.log("Core app extensions:", coreExtensions);
      
      // Create a map for quick lookup by app_id
      const coreExtensionsMap = {};
      coreExtensions.forEach(ext => {
        coreExtensionsMap[ext.id] = ext;
      });
      
      console.log("Core extensions map:", coreExtensionsMap);
      
      const updatedExtensions = extensionsList.map(ext => {
        const coreExt = coreExtensionsMap[ext.app_id];
        
        if (coreExt) {
          console.log(`✅ Found core app match for: ${ext.name} (app_id: ${ext.app_id})`, {
            coreData: coreExt,
            willUpdate: {
              installed: coreExt.installed !== undefined ? coreExt.installed : true,
              enabled: coreExt.enabled !== undefined ? coreExt.enabled : false
            }
          });
          
          return {
            ...ext,
            installed: coreExt.installed !== undefined ? coreExt.installed : true,
            enabled: coreExt.enabled !== undefined ? coreExt.enabled : false,
            version: coreExt.version || ext.version
          };
        } else {
          console.log(`❌ No core app match for: ${ext.name} (app_id: ${ext.app_id})`);
        }
        
        return ext;
      });
      
      console.log("Final extensions state:", updatedExtensions);
      return updatedExtensions;
      
    } catch (error) {
      console.error("Error updating extensions status from core app:", error);
      toast.error("Failed to sync with Plotune software");
      return extensionsList;
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

    if (!isCoreAppConnected && currentFilter === 'installed') return false;

    switch (currentFilter) {
      case 'installed':
        return extension.installed;
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

  const executeCustomUrl = (url) => {
    console.log("Executing custom URL:", url);
    window.location.href = url;
    
    setTimeout(() => {
      if (!document.hidden) {
        console.log("Custom URL might have failed");
        toast.info("If the action didn't work, please ensure Plotune software is running.");
      }
    }, 1000);
  };

  const toggleExtension = async (id) => {
    if (!isCoreAppConnected) {
      toast.info('Please connect to Plotune software to manage extensions.');
      return;
    }

    const extension = extensions.find(ext => ext.id === id);
    if (!extension) return;

    const newEnabled = !extension.enabled;
    const action = newEnabled ? 'enable' : 'disable';
    const customUrl = `plotune://${action}?id=${extension.app_id}&source=market`;

    executeCustomUrl(customUrl);
    
    // Optimistic update
    setExtensions(prev => prev.map(ext => 
      ext.id === id ? { ...ext, enabled: newEnabled } : ext
    ));
    
    toast.success(`Extension ${action}d: ${extension.name}`);
  };

  const installExtension = async (id) => {
    const extension = extensions.find(ext => ext.id === id);
    if (!extension) return;

    if (!isCoreAppConnected) {
      toast.info(`Redirecting to download page for ${extension.name}`);
      window.open('/#/download', '_blank');
      return;
    }

    const customUrl = `plotune://install?repo=${encodeURIComponent(extension.deployment)}&method=github&source=market`;
    executeCustomUrl(customUrl);
    
    // Optimistic update
    setExtensions(prev => prev.map(ext => 
      ext.id === id ? { ...ext, installed: true, enabled: true } : ext
    ));
    
    toast.success(`Extension installation started: ${extension.name}`);
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
    isCoreAppConnected, 
    coreAppUrl,
    loading,
    extensions: extensions.map(ext => ({
      name: ext.name,
      app_id: ext.app_id,
      installed: ext.installed,
      enabled: ext.enabled
    }))
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
        isCoreAppConnected={isCoreAppConnected}
      />
      <ExtensionsGrid
        extensions={filteredExtensions}
        loading={loading}
        isCoreAppConnected={isCoreAppConnected}
        toggleExtension={toggleExtension}
        installExtension={installExtension}
        buyExtension={buyExtension}
        visitWebsite={visitWebsite}
        visitRepo={visitRepo}
      />
    </>
  );
};

export default Extensions;