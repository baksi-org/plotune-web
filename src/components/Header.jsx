import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Use context
  const isLoggedIn = !!user; // Derive from user
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
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
        <nav className="flex items-center">
          <ul className={`md:flex gap-8 ${isMobileMenuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-dark-surface p-5' : 'hidden md:flex'}`}>
            <li>
              <Link
                to="/"
                className={`text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300 ${location.pathname === '/' ? 'text-primary after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0' : 'after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0 after:transition-all after:duration-300 hover:after:w-full'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/extensions"
                className={`text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300 ${location.pathname === '/extensions' ? 'text-primary after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0' : 'after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0 after:transition-all after:duration-300 hover:after:w-full'}`}
              >
                Extensions
              </Link>
            </li>
            <li>
              <Link
                to="/docs"
                className={`text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300 ${location.pathname === '/docs' ? 'text-primary after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0' : 'after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0 after:transition-all after:duration-300 hover:after:w-full'}`}
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                to="/download"
                className={`text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300 ${location.pathname === '/download' ? 'text-primary after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0' : 'after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0 after:transition-all after:duration-300 hover:after:w-full'}`}
              >
                Download
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300 ${location.pathname === '/about' ? 'text-primary after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0' : 'after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0 after:transition-all after:duration-300 hover:after:w-full'}`}
              >
                About
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/dashboard"
                  className={`text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300 ${location.pathname === '/dashboard' ? 'text-primary after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0' : 'after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0 after:transition-all after:duration-300 hover:after:w-full'}`}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className="relative ml-4">
            <button
              onClick={toggleDropdown}
              className="text-dark-text hover:text-primary transition-colors duration-300"
              aria-label="User menu"
            >
              <i className="fas fa-user-circle text-2xl"></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-card rounded-custom shadow-custom border border-white/5">
                {isLoggedIn ? (
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-text hover:bg-primary/10 hover:text-primary"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-text hover:bg-primary/10 hover:text-primary"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-text hover:bg-primary/10 hover:text-primary"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-text hover:bg-primary/10 hover:text-primary"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-gray-text hover:bg-primary/10 hover:text-primary"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          <button className="md:hidden text-dark-text text-2xl ml-4" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;