import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const validDomains = ['@ds.study.iitm.ac.in', '@es.study.iitm.ac.in'];
    return validDomains.some(domain => email.endsWith(domain));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Only IITM BS email addresses are allowed');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowOtp(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      localStorage.setItem('user', JSON.stringify({
        email,
        role: 'guest',
        name: email.split('@')[0]
      }));
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome Back
            </h1>
            <p className="text-white/80">
              Sign in to access Tesseract
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass rounded-3xl p-8"
          >
            {!showOtp ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    IITM BS Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    placeholder="your.email@ds.study.iitm.ac.in"
                  />
                  <p className="text-white/60 text-sm mt-2">
                    Only @ds.study.iitm.ac.in and @es.study.iitm.ac.in domains are allowed
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl"
                  >
                    <p className="text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 btn-hover disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending OTP...
                    </span>
                  ) : (
                    'Send OTP'
                  )}
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                  <p className="text-white/60 text-sm mt-2">
                    OTP sent to {email}
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl"
                  >
                    <p className="text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full py-4 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 btn-hover disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    'Verify & Sign In'
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp('');
                  }}
                  className="w-full py-3 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Back to Email
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                New to Tesseract?{' '}
                <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 glass rounded-2xl"
          >
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-white font-semibold text-sm">Secure Platform</h4>
                <p className="text-white/60 text-xs mt-1">
                  Your data is protected with enterprise-grade security. Only IITM BS members have access.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Login;
