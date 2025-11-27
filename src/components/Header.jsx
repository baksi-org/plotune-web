import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;
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

  // Navigation items for non-logged-in users
  const guestNavItems = [
    { to: '/', label: 'Home' },
    { to: '/extensions', label: 'Extensions' },
    { to: '/download', label: 'Download' },
    { to: '/about', label: 'About' },
    { to: '/docs', label: 'Docs' },
  ];

  // Navigation items for logged-in users with Material Icons
  const userNavItems = [
    { to: '/profile', label: 'Profile', icon: 'person' },
    { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: '/streams', label: 'Streams', icon: 'stream' },
    { to: 'https://flow.plotune.net', label: 'Flows', icon: 'account_tree', isExternal: true },
    { to: '/dns', label: 'DNS', icon: 'dns' },
    { to: '/extensions', label: 'Extensions', icon: 'store' },
  ];

  const navItems = isLoggedIn ? userNavItems : guestNavItems;

  const renderNavLink = (item) => {
    const isActive = location.pathname === item.to;
    const linkClass = `text-dark-text font-medium text-base hover:text-primary relative transition-colors duration-300 ${
      isActive 
        ? 'text-primary after:w-full after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0' 
        : 'after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-[-5px] after:left-0 after:transition-all after:duration-300 hover:after:w-full'
    }`;

    if (item.isExternal) {
      return (
        <a
          href={item.to}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 ${linkClass}`}
        >
          {item.icon && <span className="material-icons text-lg">{item.icon}</span>}
          {item.label}
        </a>
      );
    }

    return (
      <Link
        to={item.to}
        className={`flex items-center gap-2 ${linkClass}`}
      >
        {item.icon && <span className="material-icons text-lg">{item.icon}</span>}
        {item.label}
      </Link>
    );
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
            {navItems.map((item) => (
              <li key={item.to}>
                {renderNavLink(item)}
              </li>
            ))}
          </ul>
          <div className="relative ml-4">
            <button
              onClick={toggleDropdown}
              className="text-dark-text hover:text-primary transition-colors duration-300"
              aria-label="User menu"
            >
              {isLoggedIn ? (
                <span className="material-icons text-2xl">account_circle</span>
              ) : (
                <i className="fas fa-user-circle text-2xl"></i>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-card rounded-custom shadow-custom border border-white/5">
                {isLoggedIn ? (
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-text hover:bg-primary/10 hover:text-primary"
                      >
                        <span className="material-icons text-lg">logout</span>
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
          <button 
            className="md:hidden text-dark-text text-2xl ml-4" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle mobile menu"
          >
            {isLoggedIn ? (
              <span className="material-icons">menu</span>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;