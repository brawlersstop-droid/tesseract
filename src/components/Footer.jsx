import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="glass-dark mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4">
              <motion.img 
                src={logo}
                alt="Tesseract Logo"
                className="w-10 h-10 rounded-xl shadow-lg object-cover"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <span className="font-black text-xl text-white">Tesseract</span>
            </Link>
            <p className="text-white/70 max-w-md">
              The ultimate gaming and engagement hub for IITM BS students. 
              Connect, compete, and grow with our vibrant community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games" className="text-white/70 hover:text-white transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white/70 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-white/70 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-white/70 hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-white/70 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 Tesseract. All rights reserved. Made with ❤️ for IITM BS students.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
