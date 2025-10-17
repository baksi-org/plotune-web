import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PlotuneStreams from '../components/streams/PlotuneStreams'; // ✅ Bunu ekledik

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

  if (loading && false) {
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
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-light-text">Dashboard</h1>
            <p className="text-gray-text mt-2">Welcome back, {userData.full_name || userData.username}!</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link
              to="/extensions"
              className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition"
            >
              Browse Extensions
            </Link>
            <Link
              to="/download"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Download App
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-lg font-bold text-primary">
                  {userData.username?.charAt(0).toUpperCase() || 'U'}
                </div>
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

              {/* ✅ Plotune Streams sekmesini ekledik */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'profile', label: 'Profile', icon: '👤' },
                  { id: 'api', label: 'API Access', icon: '🔑' },
                  { id: 'billing', label: 'Billing & Plans', icon: '💳' },
                  { id: 'security', label: 'Security', icon: '🔒' },
                  { id: 'streams', label: 'Plotune Streams', icon: '🌊' },
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
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition flex items-center"
                >
                  <span className="mr-3">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* ... mevcut tablar (overview, profile, api, billing, security) ... */}

            {/* ✅ Plotune Streams Tab İçeriği */}
            {activeTab === 'streams' && (
              <div className="space-y-6">
                <div className="bg-dark-card rounded-2xl p-6 border border-white/10 shadow-xl">
                  <h2 className="text-xl font-semibold text-light-text mb-6">Plotune Streams</h2>
                  <p className="text-gray-text mb-6">
                    Manage your Kafka topic streams. Create, share, and monitor your data streams with other users.
                  </p>
                  <PlotuneStreams />
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
