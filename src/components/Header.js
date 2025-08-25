import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-dark-surface fixed w-full top-0 z-50 shadow-custom py-4">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Plotune Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-light-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Plotune
          </h1>
        </div>
        <nav>
          <ul className={`md:flex gap-8 ${isMobileMenuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-dark-surface p-5' : 'hidden md:flex'}`}>
            <li><Link to="/" className="text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300">Home</Link></li>
            <li><Link to="/extensions" className="text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300">Extensions</Link></li>
            <li><Link to="/docs" className="text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300">Docs</Link></li>
            <li><Link to="/download" className="text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300">Download</Link></li>
          </ul>
          <button className="md:hidden text-dark-text text-2xl" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;