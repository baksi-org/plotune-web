// src/pages/Login.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // 1. URL'den token'ı al (OAuth sonrası)
  const extractTokenFromLocation = () => {
    // 1) Normal query string: ?token=...
    const queryParams = new URLSearchParams(window.location.search);
    let token = queryParams.get('token');
    if (token) {
      // remove token from URL (so it doesn't stay in history)
      const clean = window.location.origin + window.location.pathname + window.location.hash.split('?')[0];
      window.history.replaceState({}, document.title, clean);
      return token;
    }

    // 2) HashRouter case: "#/auth/success?token=..." veya "#/auth/success&token=..."
    const hash = window.location.hash || '';
    const qIdx = hash.indexOf('?');
    if (qIdx !== -1) {
      const qs = hash.slice(qIdx + 1); // token=...
      const params = new URLSearchParams(qs);
      token = params.get('token');
      if (token) {
        // clean hash (remove query part)
        const cleanHash = hash.slice(0, qIdx); // e.g. "#/auth/success"
        const clean = window.location.origin + window.location.pathname + cleanHash;
        window.history.replaceState({}, document.title, clean);
        return token;
      }
    }

    return null;
  };

  useEffect(() => {
    const token = extractTokenFromLocation();
    if (token) handleOAuthLogin(token);
  }, [location.key]); // watch location.key to run on navigation changes

  // 2. OAuth sonrası token ile giriş
  const handleOAuthLogin = async (rawToken) => {
    setIsSubmitting(true);
    try {
      // Normalize: backend döndürdüğü token JWT string ise burada "Bearer <token>" formatına çevir
      const bearer = rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;

      // validate endpoint çoğu implementasyonda Authorization: Bearer <token> bekler
      const userResponse = await api.post('/auth/validate', {}, {
        headers: { Authorization: bearer }
      });
      const user = userResponse.data;

      // Token'ı sakla (AuthContext/login beklediği formata göre)
      if (rememberMe) {
        localStorage.setItem('token', bearer);
      } else {
        sessionStorage.setItem('token', bearer);
      }

      // login fonksiyonunu token + user ile çağır (AuthContext bunu kullanacak)
      login(bearer, user, rememberMe);

      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('OAuth login failed:', err);
      toast.error(err.response?.data?.detail || 'Authentication failed');

      // temizle (göstergeyi geri al)
      setIsSubmitting(false);
    }
  };

  // 3. Normal login
  const validate = () => {
    const newErrors = {};
    if (!usernameOrEmail) {
      newErrors.usernameOrEmail = 'Username or email is required';
    } else if (usernameOrEmail.includes('@') && !usernameOrEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.usernameOrEmail = 'Invalid email format';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post('/login', {
        username_or_email: usernameOrEmail,
        password,
      });
      const { access_token, token_type } = response.data;
      const newToken = `${token_type} ${access_token}`;

      const userResponse = await api.post('/auth/validate', {}, {
        headers: { Authorization: newToken },
      });
      const newUser = userResponse.data;

      if (rememberMe) {
        localStorage.setItem('token', newToken);
      } else {
        sessionStorage.setItem('token', newToken);
      }

      login(newToken, newUser);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error response:', err.response?.data);
      toast.error(err.response?.data?.detail || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. GitHub Login Başlat
  const startGitHubLogin = async () => {
    try {
      const res = await api.get('/login/github');
      window.location.href = res.data.auth_url;
    } catch (err) {
      toast.error('GitHub login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-gray-900 flex items-center justify-center py-8 px-4">
      <div className="bg-dark-card rounded-2xl p-8 border border-white/10 shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-light-text mb-2 text-center">Login to Plotune</h1>
        <p className="text-gray-text text-center mb-8">Access your account to continue</p>

        {/* Loading State (OAuth) */}
        {isSubmitting && (
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Normal Form */}
        {!isSubmitting && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-text mb-2 text-sm font-medium">Username or Email</label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => {
                  setUsernameOrEmail(e.target.value);
                  if (errors.usernameOrEmail) {
                    setErrors({ ...errors, usernameOrEmail: '' });
                  }
                }}
                onBlur={validate}
                className={`w-full p-3 bg-dark-surface rounded-lg border text-light-text focus:ring-2 focus:ring-primary/20 transition ${
                  errors.usernameOrEmail ? 'border-red-500' : 'border-white/10 focus:border-primary'
                }`}
                placeholder="Enter your username or email"
              />
              {errors.usernameOrEmail && (
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.usernameOrEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-text mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                  onBlur={validate}
                  className={`w-full p-3 bg-dark-surface rounded-lg border text-light-text focus:ring-2 focus:ring-primary/20 transition pr-10 ${
                    errors.password ? 'border-red-500' : 'border-white/10 focus:border-primary'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-text hover:text-light-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-gray-text text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link to="/reset-password" className="text-primary hover:underline text-sm">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        )}

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 text-gray-text text-sm">Or continue with</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            disabled
            className="py-2.5 px-4 bg-dark-surface border border-white/10 rounded-lg text-light-text opacity-50 cursor-not-allowed flex items-center justify-center"
            title="Google login not implemented yet"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">Google SVG</svg>
            Google
          </button>

          {/* GITHUB BUTONU AKTİF */}
          <button
            onClick={startGitHubLogin}
            disabled={isSubmitting}
            className="py-2.5 px-4 bg-dark-surface border border-white/10 rounded-lg text-light-text hover:bg-white/5 transition flex items-center justify-center disabled:opacity-70"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-gray-text text-sm">
          Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;