import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Invalid email format';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('/api/login', { email, password, rememberMe });
      // Handle success, e.g., store token, redirect to dashboard
      toast.success('Login successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="bg-dark-card rounded-custom p-8 border border-white/5 shadow-custom w-full max-w-md">
        <h1 className="text-2xl font-bold text-light-text mb-6 text-center">Login to Plotune</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-text mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validate}
              className="w-full p-3 bg-dark-surface rounded border border-white/10 text-light-text focus:border-primary focus:shadow-[0_0_0_3px_rgba(38,166,154,0.2)]"
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-text mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validate}
              className="w-full p-3 bg-dark-surface rounded border border-white/10 text-light-text focus:border-primary focus:shadow-[0_0_0_3px_rgba(38,166,154,0.2)]"
            />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-text">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="mr-2" />
              Remember me
            </label>
            <Link to="/reset-password" className="text-primary hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded hover:bg-primary-dark transition-all duration-300">
            Login
          </button>
        </form>
        <div className="my-6 text-center text-gray-text">Or login with</div>
        <div className="space-y-3">
          <button className="w-full py-3 bg-dark-surface border border-white/10 rounded text-light-text hover:bg-white/5">
            <i className="fab fa-google mr-2"></i> Google
          </button>
          <button className="w-full py-3 bg-dark-surface border border-white/10 rounded text-light-text hover:bg-white/5">
            <i className="fab fa-microsoft mr-2"></i> Microsoft
          </button>
          <button className="w-full py-3 bg-dark-surface border border-white/10 rounded text-light-text hover:bg-white/5">
            <i className="fab fa-github mr-2"></i> GitHub
          </button>
        </div>
        <p className="mt-6 text-center text-gray-text">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;