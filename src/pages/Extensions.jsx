import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MarketplaceHero from '../components/MarketplaceHero';
import MarketplaceControls from '../components/MarketplaceControls';
import ExtensionsGrid from '../components/ExtensionsGrid';

const Extensions = () => {
  const [extensions, setExtensions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSearch, setCurrentSearch] = useState('');
  const [backendUrl, setBackendUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Güncellenmiş örnek extensions
  const sampleExtensions = [
    {
      id: '4ca800c2-75cc-4134-8dbd-950361c0e674',
      app_id: 'uart_recorder',
      name: 'UART Recorder',
      version: '1.2.0',
      core_version: '>=1.0.0',
      author: 'Plotune Team',
      description: 'Advanced UART serial communication recording and analysis tool with real-time data visualization and export capabilities.',
      category: 'Recorder',
      tags: ['serial', 'recording', 'analysis', 'real-time'],
      os: ["Linux", "Windows"],
      last_updated: '2024-01-15',
      repo: 'https://github.com/plotune/uart-recorder',
      logo: 'https://i.imgur.com/Zr5Oo4S.png',
      deployment: 'https://github.com/plotune/uart-recorder/releases/download/v1.2.0/uart_recorder.exe',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/uart-recorder',
      documentation: 'https://docs.plotune.net/uart-recorder',
      premium_level: 0, // 0: free, 1: premium, 2: enterprise, 3: hidden
      is_verified: true,
      rating: 4.8,
      download_count: 12450,
      installed: false,
      enabled: false,
      price: 0
    },
    {
      id: '9b1d6f4e-2c3a-4f5b-8f7e-123456789abc',
      app_id: 'data_visualizer_pro',
      name: 'Data Visualizer Pro',
      version: '2.1.0',
      core_version: '>=1.2.0',
      author: 'Plotune Analytics',
      description: 'Professional data visualization toolkit with advanced charting, real-time dashboards, and custom widget support.',
      category: 'Visualization',
      tags: ['charts', 'dashboard', 'analytics', 'real-time'],
      os: ["Windows", "Linux"],
      last_updated: '2024-01-10',
      repo: 'https://github.com/plotune/data-visualizer',
      logo: 'https://i.imgur.com/C4l2RaF.jpeg',
      deployment: 'https://github.com/plotune/data-visualizer/releases/download/v2.1.0/data_visualizer_pro.exe',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/data-visualizer',
      premium_level: 1, // Premium package
      is_verified: true,
      rating: 4.9,
      download_count: 8920,
      installed: false,
      enabled: false,
      price: 0
    },
    {
      id: '2b3c4d5e-6f7a-8b9c-0d1e-234567890fgh',
      app_id: 'automation_toolkit',
      name: 'Automation Toolkit',
      version: '1.5.0',
      core_version: '>=1.0.0',
      author: 'Automation Labs',
      description: 'Powerful automation framework for repetitive tasks with scripting support and workflow automation.',
      category: 'Utility',
      tags: ['automation', 'scripting', 'workflow', 'productivity'],
      os: ["Windows", "Linux"],
      last_updated: '2024-01-08',
      repo: 'https://github.com/plotune/automation-toolkit',
      logo: 'https://i.imgur.com/D4e5fG3.png',
      deployment: 'https://github.com/plotune/automation-toolkit/releases/download/v1.5.0/automation_toolkit.exe',
      signature: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz...',
      web: 'https://plotune.net/automation',
      premium_level: 0, // Free
      is_verified: false,
      rating: 4.3,
      download_count: 5670,
      installed: false,
      enabled: false,
      price: 0
    }
  ];

  useEffect(() => {
    console.log("Initializing Extensions component...");
    initializeBackendConnection();
    loadMarketExtensions();
  }, []);

  const initializeBackendConnection = () => {
    let tempBackendUrl = null;
    const params = new URLSearchParams(window.location.search);
    const conn = params.get("conn");

    console.log("Conn parameter:", conn);

    if (conn) {
      try {
        const decoded = atob(conn);
        const [ip, port] = decoded.split(":");
        if (!ip || !port || isNaN(port) || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
          throw new Error("Invalid IP or port");
        }
        tempBackendUrl = `http://${ip}:${port}`;
        console.log("Backend URL set:", tempBackendUrl);
      } catch (err) {
        console.error("Invalid conn param:", err.message);
        tempBackendUrl = null;
        console.warn("No valid backend connection; running in visitor mode.");
      }
    } else {
      console.log("No conn param; running in visitor mode.");
    }

    setBackendUrl(tempBackendUrl);
  };

  const loadMarketExtensions = async () => {
    console.log("Attempting to load extensions from market API...");
    setLoading(true);
    try {
      const response = await fetch('https://api.plotune.net/api/extensions');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const marketExtensions = await response.json();
      console.log("Market extensions loaded:", marketExtensions.length);
      
      const filteredExtensions = marketExtensions
        .filter(ext => ext.premium_level !== 3)
        .map(ext => ({ 
          ...ext, 
          installed: false, 
          enabled: false 
        }));
      
      setExtensions(filteredExtensions);
      
      // If backend connection exists, update statuses
      if (backendUrl) {
        await checkBackendExtensions(backendUrl, filteredExtensions);
      }
    } catch (err) {
      console.error('Error fetching from market API:', err);
      // toast.warn('Unable to fetch from market API. Loading sample extensions.');
      loadSampleExtensions();
    } finally {
      setLoading(false);
    }
  };

  const loadSampleExtensions = () => {
    console.log("Loading sample extensions...");
    const updatedExtensions = sampleExtensions
      .filter(ext => ext.premium_level !== 3)
      .map(ext => ({ 
        ...ext, 
        installed: false, 
        enabled: false 
      }));
    
    setExtensions(updatedExtensions);
    console.log("Sample extensions loaded:", updatedExtensions.length);
  };

  const checkBackendExtensions = async (url, currentExtensions = extensions) => {
    try {
      console.log("Checking backend for extension status...");
      const response = await fetch(`${url}/api/extensions`);
      if (!response.ok) throw new Error('Failed to fetch extension status');
      const localExtensions = await response.json();
      
      console.log("Backend extensions found:", localExtensions.length);
      
      setExtensions(currentExtensions.map(ext => {
        const local = localExtensions.find(le => le.id === ext.id);
        return {
          ...ext,
          installed: local ? local.installed : false,
          enabled: local ? local.enabled : false,
          version: local ? local.version : ext.version,
        };
      }));
    } catch (err) {
      console.error('Error fetching extension status from backend:', err);
      toast.error('Error fetching extension status. Showing catalog.');
    }
  };

  const matchesFilter = (extension) => {
    // Search filter
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

    // Category filters
    if (!backendUrl && currentFilter === 'installed') return false;

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

  const toggleExtension = async (id) => {
    if (!backendUrl) {
      toast.info('Please connect to Plotune software to manage extensions.');
      return;
    }

    const extension = extensions.find(ext => ext.id === id);
    if (!extension) return;

    const newEnabled = !extension.enabled;

    try {
      const endpoint = newEnabled ? `/api/start/${id}` : `/api/disable/${id}`;
      const response = await fetch(`${backendUrl}${endpoint}`);
      if (!response.ok) throw new Error('Failed to toggle extension');
      const data = await response.json();
      if (data.status) {
        setExtensions(prev => prev.map(ext => 
          ext.id === id ? { ...ext, enabled: newEnabled } : ext
        ));
        toast.success(`Extension ${newEnabled ? 'enabled' : 'disabled'}: ${extension.name}`);
      }
    } catch (err) {
      toast.error(`Error toggling ${extension.name}.`);
    }
  };

  const installExtension = async (id) => {
    const extension = extensions.find(ext => ext.id === id);
    if (!extension) return;

    if (!backendUrl) {
      toast.info(`Redirecting to download page for ${extension.name}`);
      window.open('/#/download', '_blank');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/install/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) throw new Error('Failed to install extension');
      
      setExtensions(prev => prev.map(ext => 
        ext.id === id ? { ...ext, installed: true, enabled: true } : ext
      ));
      toast.success(`Extension installed: ${extension.name}`);
    } catch (err) {
      toast.error(`Error installing ${extension.name}. Please try again.`);
    }
  };

  const buyExtension = (id) => {
    const extension = extensions.find(ext => ext.id === id);
    if (extension) {
      toast.info(`Redirecting to purchase: ${extension.name} - $${extension.price}`);
      // Gerçek uygulamada ödeme sayfasına yönlendir
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
    backendUrl, 
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
        backendUrl={backendUrl}
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