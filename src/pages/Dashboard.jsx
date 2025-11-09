import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PlotuneStreams from '../components/streams/PlotuneStreams';
import MD5 from 'crypto-js/md5';

import OverviewIcon from '../assets/icons/overview.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import ApiIcon from '../assets/icons/api.svg';
import BillingIcon from '../assets/icons/billing.svg';
import SecurityIcon from '../assets/icons/security.svg';
import StreamIcon from '../assets/icons/stream.svg';
import DownloadIcon from '../assets/icons/download.svg';
import ExtensionIcon from '../assets/icons/extensions.svg';
const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [apiToken, setApiToken] = useState('');
  const [premiumStatus, setPremiumStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    extensions: 0,
    projects: 0,
    apiCalls: 0,
    storage: '0MB'
  });

const getGravatarUrl = (email, size = 80) => {
  if (!email) {
    const seed = userData.username || 'unknown';
    return `https://robohash.org/${seed}?set=set2&size=${size}x${size}`;
  }
  
  const hash = MD5(email.trim().toLowerCase()).toString();
  return `https://www.gravatar.com/avatar/${hash}?d=retro&s=${size}`;
};

  // Simple MD5 generator (for demo purposes - consider using a proper library)
  const generateMD5 = (str) => {
    // This is a very basic implementation - consider using a proper MD5 library
    // like 'crypto-js/md5' or the built-in crypto module
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  };

  // Alternative approach using Web Crypto API for better MD5 hashing
  const generateSecureMD5 = async (str) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('MD5', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      // Fallback to simple hash if Web Crypto is not available
      console.warn('Web Crypto not available, using fallback hash');
      return generateMD5(str);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await api.get('/profile', {
          headers: { Authorization: token },
        });
        setUserData(profileResponse.data);
        
        const premiumResponse = await api.get('/premium', {
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
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token, logout]);

  const handleUpdate = async () => {
    try {
      await api.put('/profile', userData, {
        headers: { Authorization: token },
      });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleGenerateToken = async () => {
    try {
      const response = await api.post('/generate-api-token', {}, {
        headers: { Authorization: token },
      });
      setApiToken(response.data.api_token);
      toast.success('API token generated successfully');
    } catch (err) {
      toast.error('Token generation failed');
    }
  };

  const handleUpgradePremium = () => {
    toast.info('Redirecting to premium payment...');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center mb-6">
                {/* Gravatar with monster fallback */}
                <img
                  src={getGravatarUrl(userData.email)}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const seed = userData.username || 'unknown';
                    e.target.src = `https://robohash.org/${seed}?set=set2&size=80x80`;
                  }}
                />
                <div className="ml-4">
                  <h3 className="text-light-text font-semibold">{userData.full_name || userData.username}</h3>
                  <p className="text-gray-text text-sm">{userData.email}</p>
                  <div className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    premiumStatus 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {premiumStatus ? 'PREMIUM' : 'FREE'}
                  </div>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: OverviewIcon },
                  { id: 'profile', label: 'Profile', icon: ProfileIcon },
                  { id: 'api', label: 'API Access', icon: ApiIcon },
                  { id: 'billing', label: 'Billing & Plans', icon: BillingIcon },
                  { id: 'security', label: 'Security', icon: SecurityIcon },
                  { id: 'streams', label: 'Plotune Streams', icon: StreamIcon },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center ${
                      activeTab === item.id
                        ? 'bg-primary/20 text-primary border-l-4 border-primary'
                        : 'text-gray-text hover:text-light-text hover:bg-white/5'
                    }`}
                  >
                    <img 
                      src={item.icon} 
                      alt={`${item.label} icon`} 
                      className="mr-3 w-5 h-5 flex-shrink-0"
                    />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition flex items-center"
                >
                  <span className="mr-3"></span>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Installed Extensions', value: stats.extensions, icon: '🧩', color: 'blue' },
                    { label: 'Active Projects', value: stats.projects, icon: '📁', color: 'green' },
                    { label: 'API Calls (30d)', value: stats.apiCalls, icon: '📊', color: 'purple' },
                    { label: 'Storage Used', value: stats.storage, icon: '💾', color: 'orange' },
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

                {/* Quick Actions */}
                <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                  <h2 className="text-xl font-semibold text-light-text mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      to="/extensions"
                      className="p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group"
                    >
                      <div className="text-2xl mb-2"><img 
                        src={ExtensionIcon} 
                        alt="Extensions" 
                        className="mx-auto mb-2 w-8 h-8 opacity-70 group-hover:opacity-100 transition"
                      /></div>
                      <h3 className="text-light-text font-medium">Browse Marketplace</h3>
                      <p className="text-gray-text text-sm mt-1">Discover new extensions</p>
                    </Link>
                    <Link
                      to="/download"
                      className="p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group"
                    >
                      <div className="text-2xl mb-2"><img 
                        src={DownloadIcon} 
                        alt="Download" 
                        className="mx-auto mb-2 w-8 h-8 opacity-70 group-hover:opacity-100 transition"
                      /></div>
                      <h3 className="text-light-text font-medium">Download App</h3>
                      <p className="text-gray-text text-sm mt-1">Get the latest version</p>
                    </Link>
                    <button
                      onClick={() => setActiveTab('streams')}
                      className="p-4 bg-dark-surface rounded-lg border border-white/5 hover:border-primary/50 transition group text-left"
                    >
                      <div className="text-2xl mb-2"><img 
                        src={StreamIcon} 
                        alt="Streams" 
                        className="mx-auto mb-2 w-8 h-8 opacity-70 group-hover:opacity-100 transition"
                      /></div>
                      <h3 className="text-light-text font-medium">Plotune Streams</h3>
                      <p className="text-gray-text text-sm mt-1">Manage your streams</p>
                    </button>
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
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-light-text">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center mb-6">
                  <img
                    src={getGravatarUrl(userData.email, 120)}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 mr-6"
                    onError={(e) => {
                      const seed = userData.username || 'unknown';
                      e.target.src = `https://robohash.org/${seed}?set=set2&size=120x120`;
                    }}
                  />
                  <div>
                    <h3 className="text-light-text font-semibold text-lg">Profile Picture</h3>
                    <p className="text-gray-text text-sm">
                      Your profile picture is managed through Gravatar. 
                      <a 
                        href="https://gravatar.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-1"
                      >
                        Change on Gravatar
                      </a>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-text mb-2">Username</label>
                    <input
                      type="text"
                      value={userData.username || ''}
                      disabled
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text opacity-70"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-text mb-2">Email Address</label>
                    <input
                      type="email"
                      value={userData.email || ''}
                      disabled
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text opacity-70"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-text mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userData.full_name || ''}
                      onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text disabled:opacity-70"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-text mb-2">Company</label>
                    <input
                      type="text"
                      value={userData.company || ''}
                      onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                      disabled={!isEditing}
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text disabled:opacity-70"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-text mb-2">Sector</label>
                    <input
                      type="text"
                      value={userData.sector || ''}
                      disabled
                      className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text opacity-70"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs remain the same */}
            {/* API Access Tab */}
            {activeTab === 'api' && (
              <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold text-light-text mb-6">API Access</h2>
                
                <div className="bg-dark-surface rounded-lg p-6 border border-white/5 mb-6">
                  <h3 className="text-lg font-medium text-light-text mb-4">API Token</h3>
                  <p className="text-gray-text mb-4">
                    Generate an API token to integrate Plotune with your applications and scripts.
                    Keep this token secure and never share it publicly.
                  </p>
                  
                  <button
                    onClick={handleGenerateToken}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium"
                  >
                    Generate New Token
                  </button>

                  {apiToken && (
                    <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-yellow-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-yellow-400 font-medium">Your API Token</p>
                        <button
                          onClick={() => copyToClipboard(apiToken)}
                          className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center"
                        >
                          📋 Copy
                        </button>
                      </div>
                      <p className="text-light-text break-all font-mono text-sm bg-black/30 p-3 rounded">
                        {apiToken}
                      </p>
                      <p className="text-red-400 text-sm mt-3 flex items-center">
                        ⚠️ Copy this token now! It won't be shown again.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-dark-surface rounded-lg p-6 border border-white/5">
                  <h3 className="text-lg font-medium text-light-text mb-4">API Documentation</h3>
                  <p className="text-gray-text mb-4">
                    Learn how to use the Plotune API with our comprehensive documentation.
                  </p>
                  <button className="px-6 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition font-medium">
                    View API Docs
                  </button>
                </div>
              </div>
            )}

            {/* Billing & Plans Tab */}
            {activeTab === 'billing' && (
              <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold text-light-text mb-6">Billing & Plans</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current Plan */}
                  <div className="bg-dark-surface rounded-lg p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-light-text mb-4">Current Plan</h3>
                    <div className={`p-4 rounded-lg mb-4 ${
                      premiumStatus 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                        : 'bg-gray-500/20 border border-gray-500/30'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-light-text font-semibold text-lg">
                            {premiumStatus ? 'Premium Plan' : 'Free Plan'}
                          </h4>
                          <p className="text-gray-text">
                            {premiumStatus ? 'All features unlocked' : 'Basic features'}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          premiumStatus ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-300'
                        }`}>
                          {premiumStatus ? 'Active' : 'Current'}
                        </div>
                      </div>
                    </div>

                    {!premiumStatus && (
                      <button
                        onClick={handleUpgradePremium}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
                      >
                        Upgrade to Premium
                      </button>
                    )}
                  </div>

                  {/* Plan Features */}
                  <div className="bg-dark-surface rounded-lg p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-light-text mb-4">Plan Features</h3>
                    <div className="space-y-3">
                      {[
                        { feature: 'All Basic Extensions', free: true, premium: true },
                        { feature: 'Premium Extensions', free: false, premium: true },
                        { feature: 'API Access', free: true, premium: true },
                        { feature: 'Priority Support', free: false, premium: true },
                        { feature: 'Advanced Analytics', free: false, premium: true },
                        { feature: 'Custom Integrations', free: false, premium: true },
                        { feature: 'Plotune Streams', free: true, premium: true },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <span className="text-light-text">{item.feature}</span>
                          <div className="flex space-x-4">
                            <span className={`w-6 h-6 rounded flex items-center justify-center ${
                              item.free ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {item.free ? '✓' : '✗'}
                            </span>
                            <span className={`w-6 h-6 rounded flex items-center justify-center ${
                              item.premium ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {item.premium ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex text-sm text-gray-text mt-4">
                      <span className="w-1/2 text-center">Free</span>
                      <span className="w-1/2 text-center">Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold text-light-text mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="bg-dark-surface rounded-lg p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-light-text mb-4">Password</h3>
                    <p className="text-gray-text mb-4">Change your password to keep your account secure.</p>
                    <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium">
                      Change Password
                    </button>
                  </div>

                  <div className="bg-dark-surface rounded-lg p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-light-text mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-text mb-4">Add an extra layer of security to your account.</p>
                    <button className="px-6 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition font-medium">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="bg-dark-surface rounded-lg p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-light-text mb-4">Login History</h3>
                    <p className="text-gray-text mb-4">Review your recent account activity.</p>
                    <div className="text-sm text-gray-text space-y-2">
                      <p>Last login: {new Date().toLocaleDateString()} from your current device</p>
                      <p>Account created: {new Date(userData.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Plotune Streams Tab */}
            {activeTab === 'streams' && (
              <div className="space-y-6">
                <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                  </div>
                  
                  <div className="mt-6">
                    <PlotuneStreams />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;