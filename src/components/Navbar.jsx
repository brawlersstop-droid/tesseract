import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const publicNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Games', path: '/games' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Join', path: '/join' }
  ];

  const authNavItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Games', path: '/games' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Events', path: '/events' },
    { name: 'Leaderboard', path: '/leaderboard' }
  ];

  const adminNavItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Games', path: '/games' },
    { name: 'Events', path: '/events' },
    { name: 'Admin', path: '/admin' }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : user ? authNavItems : publicNavItems;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-dark shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.img 
              src={logo} 
              alt="Tesseract Logo"
              className="w-12 h-12 rounded-xl shadow-lg object-cover"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <span className="text-white font-black text-2xl">Tesseract</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-white hover:text-purple-300 transition-colors duration-200 ${
                  location.pathname === item.path ? 'text-purple-300' : ''
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm">
                    {user.avatar || '👤'}
                  </div>
                  <span className="text-sm font-medium">{user.fullName}</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 glass text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 btn-gradient text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-2 text-white hover:text-purple-300 hover:bg-white/10 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path ? 'text-purple-300 bg-white/10' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile User Actions */}
                <div className="border-t border-white/10 pt-4 mt-4">
                  {user ? (
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-white hover:text-purple-300 hover:bg-white/10 rounded-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm">
                          {user.avatar || '👤'}
                        </div>
                        <span className="text-sm font-medium">{user.fullName}</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:text-purple-300 hover:bg-white/10 rounded-lg transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-white hover:text-purple-300 hover:bg-white/10 rounded-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-center btn-gradient text-white font-medium rounded-lg hover:shadow-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
