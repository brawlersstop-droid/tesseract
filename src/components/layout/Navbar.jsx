import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../ui/Toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout, isGuest, isMember, isCore, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Logged out', 'You have been successfully logged out', 'success');
      navigate('/login');
    } catch (error) {
      addToast('Error', 'Failed to logout', 'error');
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/events', label: 'Events' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/membership', label: 'Membership' },
    { path: '/admin', label: 'Admin' },
  ];

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'ADMIN': return 'destructive';
      case 'CORE': return 'secondary';
      case 'MEMBER': return 'success';
      case 'GUEST': return 'outline';
      default: return 'default';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/30 backdrop-blur-xl shadow-lg border-b border-white/10' : 'bg-slate-900/10 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-white">Tesseract</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-purple-300 ${
                  location.pathname === item.path ? 'text-purple-300' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
                <span className="text-sm font-medium text-white">
                  {user.name || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-white/20 text-white hover:bg-white/10">
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors hover:bg-white/10 ${
                    location.pathname === item.path ? 'text-purple-300 bg-white/10' : 'text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated && user ? (
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                      <span className="text-sm font-medium text-white">
                        {user.name || user.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-3 border-white/20 text-white hover:bg-white/10"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-3 mt-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="ml-3 bg-purple-500 hover:bg-purple-600">Login</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
