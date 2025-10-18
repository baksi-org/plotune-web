import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Home from './pages/Home';
import Extensions from './pages/Extensions';
import RedirectPage from './pages/RedirectPage';
import Download from './pages/Download';
import About from './pages/About';
import Careers from './pages/Careers';
import Header from './components/Header';
import DevBanner from './components/DevBanner';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Legal from './pages/Legal';
import Docs from './pages/Docs';
import Dashboard from './pages/Dashboard'; // New Dashboard page
import Privacy from './pages/Privacy';
import ContactPage from './pages/Contact';

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <Router>
        <div className="app">
          <DevBanner />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/extensions" element={<Extensions />} />
            <Route path="/blog" element={<RedirectPage url="https://github.com/baksi-org/plotune-web/discussions" />} />
            <Route path="/community" element={<RedirectPage url="https://github.com/baksi-org/plotune-web/discussions" />} />
            <Route path="/tutorials" element={<RedirectPage url="https://github.com/baksi-org/plotune-web/discussions" />} />
            <Route path="/download" element={<Download />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* New route */}
          </Routes>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;