// components/networks/PlotuneNetworks.jsx
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api, { streamApi } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import CreateNetworkModal from './CreateNetworkModal';
import NetworkManagementModal from './NetworkManagementModal';
import NetworkCard from './NetworkCard';
import NetworkIcon from '../../assets/icons/network.svg';
import { 
  FaPlus,
  FaUsers,
  FaUser,
  FaNetworkWired,
  FaShareAlt,
  FaUserFriends
} from 'react-icons/fa';

const PlotuneNetworks = () => {
  const { user, token } = useContext(AuthContext);
  const [myNetworks, setMyNetworks] = useState([]);
  const [authorizedNetworks, setAuthorizedNetworks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAuthorized, setLoadingAuthorized] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [streamToken, setStreamToken] = useState(null);
  const [activeTab, setActiveTab] = useState('my'); // 'my' or 'authorized'

  useEffect(() => {
    fetchStreamToken();
  }, []);

  // Get stream token from backend first
  const fetchStreamToken = async () => {
    try {
      const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 20));
      const response = await api.get(`/auth/stream?q=${cacheBuster}&user=${user?.username}`, {
        headers: { Authorization: token },
      });
      
      if (response.data && response.data.token) {
        setStreamToken(response.data.token);
        fetchMyNetworks(response.data.token);
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Error fetching stream token:', err);
      toast.error('Failed to get stream access');
      setLoading(false);
    }
  };

  const fetchMyNetworks = async (tokenToUse = streamToken) => {
    if (!tokenToUse) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await streamApi.get('/networks', {
        headers: { Authorization: tokenToUse },
      });
      
      setMyNetworks(response.data || []);
      
    } catch (err) {
      console.error('Error fetching networks:', err);
      toast.error('Failed to load your networks');
      setMyNetworks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthorizedNetworks = async (tokenToUse = streamToken) => {
    if (!tokenToUse) {
      return;
    }

    try {
      setLoadingAuthorized(true);
      const response = await streamApi.get('/networks/authorized', {
        headers: { Authorization: tokenToUse },
      });
      
      // Map authorized networks to match NetworkCard structure
      const mappedNetworks = (response.data || []).map(network => ({
        ...network,
        is_authorized: true
      }));
      
      setAuthorizedNetworks(mappedNetworks);
      
    } catch (err) {
      console.error('Error fetching authorized networks:', err);
      toast.error('Failed to load authorized networks');
      setAuthorizedNetworks([]);
    } finally {
      setLoadingAuthorized(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'authorized' && authorizedNetworks.length === 0 && streamToken) {
      fetchAuthorizedNetworks();
    }
  };

  const handleCreateNetwork = async (networkData) => {
    if (!streamToken) {
      toast.error('Network access not available');
      return;
    }

    try {
      const createData = {
        name: networkData.name,
        owner_email: user?.email,
        description: networkData.description || '',
        is_public: networkData.is_public || false
      };
      console.log(createData);

      const response = await streamApi.post('/network/create', createData, {
        headers: { Authorization: streamToken },
      });
      
      setShowCreateModal(false);
      toast.success('Network created successfully!');
      fetchMyNetworks();
    } catch (err) {
      console.error('Create error:', err);
      if (err.response?.status === 422) {
        toast.error('Invalid network data. Please check the network name.');
      } else {
        toast.error('Failed to create network');
      }
    }
  };

  const handleDeleteNetwork = async (networkName) => {
    if (!streamToken) {
      toast.error('Network access not available');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this network? This action cannot be undone.')) {
      return;
    }

    try {
      await streamApi.post('/network/delete', {
        name: networkName,
        owner_email: user?.email,
        description: '',
        is_public: false
      }, {
        headers: { Authorization: streamToken },
      });

      toast.success('Network deleted successfully');
      fetchMyNetworks();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete network');
    }
  };

  const handleShareNetwork = async (networkName, shareEmail, permissions) => {
    if (!streamToken) {
      toast.error('Network access not available');
      return;
    }

    try {
      await streamApi.post('/network/share', 
        {
          name: networkName,
          user_email: shareEmail,
          can_publish: permissions.can_publish,
          can_subscribe: permissions.can_subscribe
        },
        { headers: { Authorization: streamToken } }
      );
      toast.success(`Network shared with ${shareEmail}`);
      fetchMyNetworks();
    } catch (err) {
      toast.error('Failed to share network');
    }
  };

  const handleUnshareNetwork = async (networkName, userEmail) => {
    if (!streamToken) {
      toast.error('Network access not available');
      return;
    }

    try {
      await streamApi.post('/network/unshare', 
        {
          name: networkName,
          user_email: userEmail
        },
        { headers: { Authorization: streamToken } }
      );
      toast.success('User removed from network');
      fetchMyNetworks();
    } catch (err) {
      toast.error('Failed to remove user');
    }
  };

  if (loading && activeTab === 'my') {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!streamToken && !loading) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-500/20 text-red-400 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-2">Access Required</h3>
          <p className="text-sm mb-4">
            Unable to access network services.
          </p>
          <button
            onClick={fetchStreamToken}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentNetworks = activeTab === 'my' ? myNetworks : authorizedNetworks;
  const isLoading = activeTab === 'my' ? loading : loadingAuthorized;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-light-text">Peer Networks</h3>
          <p className="text-gray-text text-sm">Create and manage peer-to-peer data networks for stream sharing</p>
        </div>
        <button
            onClick={() => setShowCreateModal(true)}          // senin handler
            className="group relative flex items-center justify-center
                        w-8 h-8 rounded-full
                        bg-blue-600 hover:bg-blue-700
                        text-white
                        transition-colors"
            >
            <FaPlus className="w-3.5 h-3.5" />

            {/* Tooltip */}
            <span
                className="pointer-events-none absolute left-1/2 top-full mt-2
                        -translate-x-1/2
                        whitespace-nowrap
                        rounded bg-gray-900 px-2 py-1 text-xs text-white
                        opacity-0 group-hover:opacity-100
                        transition-opacity"
            >
                New Network
            </span>
        </button>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'my' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-text hover:text-light-text'
          }`}
          onClick={() => handleTabChange('my')}
        >
          <FaNetworkWired className="w-4 h-4" />
          My Networks
          {myNetworks.length > 0 && (
            <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
              {myNetworks.length}
            </span>
          )}
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'authorized' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-text hover:text-light-text'
          }`}
          onClick={() => handleTabChange('authorized')}
        >
          <FaUserFriends className="w-4 h-4" />
          Joined Networks
          {authorizedNetworks.length > 0 && (
            <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
              {authorizedNetworks.length}
            </span>
          )}
        </button>
      </div>

      {/* Networks Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNetworks.map((network) => (
            <NetworkCard
              key={network.id}
              network={network}
              onManage={() => setActiveNetwork(network)}
              onDelete={network.is_authorized ? null : () => handleDeleteNetwork(network.name)}
              isAuthorized={network.is_authorized}
            />
          ))}
          
          {currentNetworks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto mb-4 w-16 h-16 opacity-50 flex items-center justify-center">
                <FaNetworkWired className="w-16 h-16 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-light-text mb-2">
                {activeTab === 'my' ? 'No networks yet' : 'No network invitations'}
              </h3>
              <p className="text-gray-text mb-4">
                {activeTab === 'my' 
                  ? 'Create your first network to start connecting peers' 
                  : 'No one has shared any networks with you yet'}
              </p>
              {activeTab === 'my' && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Create Your First Network
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Network Information */}
      <div className="rounded-xl p-6 border border-white/10">
        <h4 className="text-light-text font-medium mb-4">Network Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h5 className="text-gray-text mb-2">What are Networks?</h5>
            <p className="text-gray-text">
              Networks allow you to create peer-to-peer connections for sharing streams. 
              Share specific streams with network peers and manage access permissions.
            </p>
          </div>
          <div>
            <h5 className="text-gray-text mb-2">How it Works</h5>
            <ul className="text-gray-text space-y-1">
              <li>• Create a network and invite peers</li>
              <li>• Share streams with network members</li>
              <li>• Control publish/subscribe permissions</li>
              <li>• All connections are peer-to-peer</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateNetworkModal 
          onClose={() => setShowCreateModal(false)} 
          onSubmit={handleCreateNetwork}
          user={user}
        />
      )}
      {activeNetwork && (
        <NetworkManagementModal
          network={activeNetwork}
          onClose={() => setActiveNetwork(null)}
          onUpdate={() => activeTab === 'my' ? fetchMyNetworks() : fetchAuthorizedNetworks()}
          onShare={activeNetwork.is_authorized ? null : handleShareNetwork}
          onUnshare={activeNetwork.is_authorized ? null : handleUnshareNetwork}
          user={user}
          isAuthorized={activeNetwork.is_authorized}
        />
      )}
    </div>
  );
};

export default PlotuneNetworks;