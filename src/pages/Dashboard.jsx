import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

import ExtensionIcon from '../assets/icons/extensions.svg';
import DownloadIcon from '../assets/icons/download.svg';
import StreamIcon from '../assets/icons/stream.svg';

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [premiumStatus, setPremiumStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    extensions: 0,
    projects: 0,
    apiCalls: 0,
    storage: '0MB'
  });

  // Quick links configuration - hardcoded enable/disable
  const quickLinks = [
    {
      id: 'support',
      label: 'Support Center',
      icon: 'support_agent',
      link: 'https://support.plotune.net',
      external: true,
      enabled: true 
    },
    {
      id: 'dns',
      label: 'DNS Management',
      icon: 'dns',
      link: '/dns',
      external: false,
      enabled: true 
    },
    {
      id: 'partnership',
      label: 'Partnership',
      icon: 'handshake', // Changed from partner_exchange to handshake
      link: '/partners',
      external: false,
      enabled: true 
    },
    {
      id: 'partner-portal',
      label: 'Partner Portal',
      icon: 'business_center',
      link: '/partner-portal',
      external: false,
      enabled: true 
    },
    {
      id: 'flow-designer',
      label: 'Flow Designer',
      icon: 'account_tree',
      link: 'https://flow.plotune.net',
      external: true,
      enabled: true 
    }
  ];

  // Filter only enabled links
  const enabledQuickLinks = quickLinks.filter(link => link.enabled);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false); // Temporarily disable loading for faster UX
      try {
        const premiumResponse = await api.get('/user/premium', {
          headers: { Authorization: token },
        });
        setPremiumStatus(premiumResponse.data.is_premium || false);
        
        const statsResponse = await api.get('/user/stats', {
          headers: { Authorization: token },
        });
        setStats(statsResponse.data);
      } catch (err) {
        toast.error('Failed to load dashboard data');
        if (err.response?.status === 401) logout();
      } finally {
        // setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token, logout]);

  const handleUpgradePremium = () => {
    toast.info('Upgrade not available currently');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-light-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-gray-900 pt-20 pb-12">
      <div className="container mx-auto px-4">

        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
            //  { label: 'Installed Extensions', value: stats.extensions, icon: '🧩', color: 'blue' },
            //  { label: 'Active Projects', value: stats.projects, icon: '📁', color: 'green' },
            //  { label: 'API Calls (30d)', value: stats.apiCalls, icon: '📊', color: 'purple' },
            //  { label: 'Storage Used', value: stats.storage, icon: '💾', color: 'orange' },
            ].map((stat, index) => (
              <div key={index} className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-text text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-light-text mt-2">{stat.value}</p>
                  </div>
                  <div className={`text-2xl bg-${stat.color}-500/20 p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links - Only show if there are enabled links */}
          {enabledQuickLinks.length > 0 && (
            <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
              <h2 className="text-xl font-semibold text-light-text mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {enabledQuickLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.id}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group text-center"
                    >
                      <div className="text-2xl mb-2">
                        <span className="material-icons text-3xl text-gray-400 group-hover:text-primary transition">
                          {link.icon}
                        </span>
                      </div>
                      <h3 className="text-light-text font-medium text-sm">{link.label}</h3>
                    </a>
                  ) : (
                    <Link
                      key={link.id}
                      to={link.link}
                      className="block p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group text-center"
                    >
                      <div className="text-2xl mb-2">
                        <span className="material-icons text-3xl text-gray-400 group-hover:text-primary transition">
                          {link.icon}
                        </span>
                      </div>
                      <h3 className="text-light-text font-medium text-sm">{link.label}</h3>
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-xl font-semibold text-light-text mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/extensions"
                className="p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group"
              >
                <div className="text-2xl mb-2">
                  <img 
                    src={ExtensionIcon} 
                    alt="Extensions" 
                    className="mx-auto mb-2 w-8 h-8 opacity-70 group-hover:opacity-100 transition"
                  />
                </div>
                <h3 className="text-light-text font-medium">Browse Marketplace</h3>
                <p className="text-gray-text text-sm mt-1">Discover new extensions</p>
              </Link>
              <Link
                to="/download"
                className="p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group"
              >
                <div className="text-2xl mb-2">
                  <img 
                    src={DownloadIcon} 
                    alt="Download" 
                    className="mx-auto mb-2 w-8 h-8 opacity-70 group-hover:opacity-100 transition"
                  />
                </div>
                <h3 className="text-light-text font-medium">Download App</h3>
                <p className="text-gray-text text-sm mt-1">Get the latest version</p>
              </Link>
              <Link
                to="/streams"
                className="p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group text-left"
              >
                <div className="text-2xl mb-2">
                  <img 
                    src={StreamIcon} 
                    alt="Streams" 
                    className="mx-auto mb-2 w-8 h-8 opacity-70 group-hover:opacity-100 transition"
                  />
                </div>
                <h3 className="text-light-text font-medium">Plotune Streams</h3>
                <p className="text-gray-text text-sm mt-1">Manage your streams</p>
              </Link>
            </div>
          </div>

          {/* Premium Banner */}
          {!premiumStatus && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Unlock Premium Features</h3>
                  <p className="text-purple-100">
                    Get access to advanced extensions, priority support, and enhanced capabilities.
                  </p>
                </div>
                <button
                  onClick={handleUpgradePremium}
                  className="mt-4 md:mt-0 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;