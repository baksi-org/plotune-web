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

  // Örnek extensionsData (api_extension.js'ten geliyorsa, buraya import et)
  const sampleExtensions = [
    {
      id: '1',
      name: 'UART Recorder',
      version: '1.0.0',
      author: 'Plotune Team',
      description: 'Record and analyze data from UART serial ports in real-time.',
      category: 'Recorder',
      mode: 'hybrid',
      file_formats: ['txt', 'csv', 'bin'],
      os: 'Windows/Linux/Mac',
      last_updated: '2023-05-15',
      git_path: 'https://github.com/plotune/uart-recorder',
      installed: false,
      enabled: false,
    },
    {
      id: '2',
      name: 'CAN Bus Visualizer',
      version: '2.1.3',
      author: 'AutoTech Inc.',
      description: 'Visualize and decode CAN bus messages with custom filters.',
      category: 'Visualization',
      mode: 'hybrid',
      file_formats: ['log', 'asc', 'trc'],
      os: 'Windows/Linux',
      last_updated: '2023-08-20',
      git_path: 'https://github.com/autotech/can-visualizer',
      installed: false,
      enabled: false,
    },
    // Daha fazla ekleyebilirsin...
  ];

  useEffect(() => {
    // Software watcher mantığı: Query'den conn al, decode et ve backendUrl set et
    let tempBackendUrl = null;
    const params = new URLSearchParams(window.location.search);
    const conn = params.get("conn");

    if (conn) {
      try {
        const decoded = atob(conn); // base64 decode
        const [ip, port] = decoded.split(":");
        // Basic validation
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

    // Optional: Fetch /api/info for debugging if connected
    if (tempBackendUrl) {
      console.log('Fetching OS info from backend...');
      fetch(`${tempBackendUrl}/api/info`)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log("OS Info fetched successfully:", data);
        })
        .catch(err => {
          console.error("Failed to fetch /api/info:", err.message, err.stack);
        });
    }
  }, []); // Sayfa yüklendiğinde bir kere çalış

  useEffect(() => {
    fetchAndMergeExtensions();
  }, [backendUrl]);

  const fetchAndMergeExtensions = async () => {
    let updatedExtensions = sampleExtensions.map(ext => ({ ...ext }));

    if (backendUrl) {
      try {
        const response = await fetch(`${backendUrl}/api/extensions`);
        if (!response.ok) throw new Error('Failed to fetch');
        const localExtensions = await response.json();
        updatedExtensions = sampleExtensions.map(ext => {
          const local = localExtensions.find(le => le.id === ext.id);
          return {
            ...ext,
            installed: local ? local.installed : false,
            enabled: local ? local.enabled : false,
            version: local ? local.version : ext.version,
          };
        });
      } catch (err) {
        toast.error('Error fetching extension status. Showing catalog.');
      }
    } else {
      updatedExtensions = sampleExtensions.map(ext => ({ ...ext, installed: false, enabled: false }));
    }

    setExtensions(updatedExtensions);
  };

  // matchesFilter fonksiyonu (aynı)
  const matchesFilter = (extension) => {
    if (currentSearch &&
      !extension.name.toLowerCase().includes(currentSearch) &&
      !extension.description.toLowerCase().includes(currentSearch) &&
      !extension.category.toLowerCase().includes(currentSearch)) {
      return false;
    }

    if (!backendUrl && currentFilter === 'installed') return false;

    switch (currentFilter) {
      case 'installed':
        return extension.installed;
      case 'free':
        return extension.category === 'Recorder';
      case 'premium':
        return extension.category === 'Visualization';
      case 'recorder':
        return extension.category === 'Recorder';
      case 'visualization':
        return extension.category === 'Visualization';
      default:
        return true;
    }
  };

  // toggleExtension (aynı)
  const toggleExtension = async (id) => {
    if (!backendUrl) return;

    const extension = extensions.find(ext => ext.id === id);
    if (!extension) return;

    const newEnabled = !extension.enabled;

    try {
      const endpoint = newEnabled ? `/api/start/${id}` : `/api/disable/${id}`;
      const response = await fetch(`${backendUrl}${endpoint}`);
      if (!response.ok) throw new Error('Failed to toggle');
      const data = await response.json();
      if (data.status) {
        setExtensions(prev => prev.map(ext => ext.id === id ? { ...ext, enabled: newEnabled } : ext));
        toast.success(`Extension ${newEnabled ? 'enabled' : 'disabled'}: ${extension.name}`);
      }
    } catch (err) {
      toast.error(`Error toggling ${extension.name}.`);
    }
  };

  // installExtension (aynı)
  const installExtension = async (id) => {
    const extension = extensions.find(ext => ext.id === id);
    if (!extension) return;

    if (!backendUrl) {
      toast.info(`Redirecting to download page for ${extension.name}`);
      window.location.href = '/download';
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/install/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error('Failed to install');
      setExtensions(prev => prev.map(ext => ext.id === id ? { ...ext, installed: true, enabled: true } : ext));
      toast.success(`Extension installed: ${extension.name}`);
    } catch (err) {
      toast.error(`Error installing ${extension.name}.`);
    }
  };

  // buyExtension (aynı)
  const buyExtension = (id) => {
    const extension = extensions.find(ext => ext.id === id);
    if (extension) {
      toast.info(`Redirecting to purchase: ${extension.name}`);
      // Gerçekte ödeme sayfasına yönlendir
    }
  };

  // visitWebsite (aynı)
  const visitWebsite = (url) => {
    if (url) {
      toast.info('Opening extension website in new tab');
      window.open(url, '_blank');
    } else {
      toast.error('No website available.');
    }
  };

  const filteredExtensions = extensions.filter(matchesFilter);

  return (
    <>
      <MarketplaceHero />
      <MarketplaceControls
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        currentSearch={currentSearch}
        setCurrentSearch={setCurrentSearch}
      />
      <ExtensionsGrid
        extensions={filteredExtensions}
        backendUrl={backendUrl}
        toggleExtension={toggleExtension}
        installExtension={installExtension}
        buyExtension={buyExtension}
        visitWebsite={visitWebsite}
      />
    </>
  );
};

export default Extensions;