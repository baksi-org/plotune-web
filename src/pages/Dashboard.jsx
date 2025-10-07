import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [apiToken, setApiToken] = useState('');
  const [premiumStatus, setPremiumStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data (use /profile or /auth/validate)
        const profileResponse = await api.get('/profile', { // Assume new /profile endpoint
          headers: { Authorization: token },
        });
        setUserData(profileResponse.data);
        // Check premium
        const premiumResponse = await api.get('/premium', {
          headers: { Authorization: token },
        });
        setPremiumStatus(premiumResponse.data.is_premium || false); // Assume response has is_premium
      } catch (err) {
        toast.error('Failed to load dashboard data');
        if (err.response?.status === 401) logout(); // Logout on unauthorized
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token, logout]);

  const handleUpdate = async () => {
    try {
      await api.put('/profile', userData, { // Assume PUT /profile for updates
        headers: { Authorization: token },
      });
      toast.success('Profile updated');
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
      toast.success('API token generated');
    } catch (err) {
      toast.error('Token generation failed');
    }
  };

  const handleUpgradePremium = () => {
    // Placeholder for payment flow (e.g., redirect to Stripe)
    toast.info('Redirecting to premium payment...');
    // window.location.href = '/premium-payment';
  };

  if (loading) return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-light-text">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-gray-900 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl bg-dark-card rounded-2xl p-8 border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold text-light-text mb-6">Dashboard</h1>
        <div className="space-y-8">
          {/* User Info Section */}
          <section>
            <h2 className="text-2xl font-semibold text-light-text mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-text mb-2">Username</label>
                <input
                  type="text"
                  value={userData.username || ''}
                  disabled
                  className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text"
                />
              </div>
              <div>
                <label className="block text-gray-text mb-2">Email</label>
                <input
                  type="email"
                  value={userData.email || ''}
                  disabled
                  className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text"
                />
              </div>
              <div>
                <label className="block text-gray-text mb-2">Full Name</label>
                <input
                  type="text"
                  value={userData.full_name || ''}
                  onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text"
                />
              </div>
              <div>
                <label className="block text-gray-text mb-2">Company</label>
                <input
                  type="text"
                  value={userData.company || ''}
                  onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 bg-dark-surface rounded-lg border border-white/10 text-light-text"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              {isEditing ? (
                <>
                  <button onClick={handleUpdate} className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)} className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  Edit Profile
                </button>
              )}
            </div>
          </section>

          {/* API Token Section */}
          <section>
            <h2 className="text-2xl font-semibold text-light-text mb-4">API Token</h2>
            <p className="text-gray-text mb-4">Generate an API token for integrations.</p>
            <button onClick={handleGenerateToken} className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark">
              Generate Token
            </button>
            {apiToken && (
              <div className="mt-4 p-3 bg-dark-surface rounded-lg border border-white/10">
                <p className="text-light-text break-all">{apiToken}</p>
                <p className="text-red-400 text-sm mt-2">Copy this token and store it securely. It won't be shown again.</p>
              </div>
            )}
          </section>

          {/* Premium Section */}
          <section>
            <h2 className="text-2xl font-semibold text-light-text mb-4">Premium Subscription</h2>
            {premiumStatus ? (
              <p className="text-green-400">You are a premium user. Enjoy exclusive features!</p>
            ) : (
              <>
                <p className="text-gray-text mb-4">Upgrade to premium for advanced features.</p>
                <button onClick={handleUpgradePremium} className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  Upgrade to Premium
                </button>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;