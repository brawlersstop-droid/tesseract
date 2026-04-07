import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    studentId: '',
    agreeToTerms: false
  });
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const validDomains = ['@ds.study.iitm.ac.in', '@es.study.iitm.ac.in'];
    return validDomains.some(domain => email.endsWith(domain));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Only IITM BS email addresses are allowed');
      return;
    }

    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!formData.studentId.trim()) {
      setError('Student ID is required');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
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
      // Mock successful signup
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        fullName: formData.fullName,
        studentId: formData.studentId,
        role: 'guest',
        joinedAt: new Date().toISOString()
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
              Join Tesseract
            </h1>
            <p className="text-white/80">
              Create your account to get started
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    IITM BS Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    placeholder="your.email@ds.study.iitm.ac.in"
                  />
                  <p className="text-white/60 text-sm mt-2">
                    Only @ds.study.iitm.ac.in and @es.study.iitm.ac.in domains are allowed
                  </p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    placeholder="e.g., BS2023XXXX"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-purple-500 bg-white/10 border-white/30 rounded focus:ring-purple-400 focus:ring-2"
                  />
                  <label className="text-white/80 text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
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
                    'Create Account'
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
                    OTP sent to {formData.email}
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
                      Creating Account...
                    </span>
                  ) : (
                    'Verify & Create Account'
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
                  Back to Details
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 space-y-3"
          >
            {[
              { icon: '✨', text: 'Access exclusive events and competitions' },
              { icon: '🎮', text: 'Play games and climb leaderboards' },
              { icon: '🏆', text: 'Earn certificates and rewards' },
              { icon: '🤝', text: 'Connect with IITM BS community' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 glass rounded-xl"
              >
                <span className="text-xl">{benefit.icon}</span>
                <span className="text-white/80 text-sm">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
