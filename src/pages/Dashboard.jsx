import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import apiService from '../services/api';
import Navbar from '../components/layout/Navbar';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);
  const { user, isGuest, isMember, isCore, isAdmin, hasMembership } = useAuth();
  const { addToast } = useToast();

  // Particle effect for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = [];
      const particleCount = 60;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } catch (error) {
      console.error('Canvas effect error:', error);
    }
  }, []);

  useEffect(() => {
    // Mock data since no backend exists
    const mockDashboardData = {
      totalPoints: 12500,
      eventsParticipated: 12,
      gamesPlayed: 45,
      rank: 15,
      upcomingEvents: [
        { id: 1, name: 'Coding Challenge', date: '2025-01-20' },
        { id: 2, name: 'Hackathon 2025', date: '2025-02-15' }
      ],
      recentActivity: [
        { id: 1, type: 'game', name: 'Puzzle Master', score: 950 },
        { id: 2, type: 'event', name: 'Coding Challenge', status: 'completed' }
      ]
    };
    setDashboardData(mockDashboardData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <Navbar />
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  const quickActions = [
    { 
      title: 'Browse Events', 
      description: 'Discover upcoming events and competitions',
      icon: '📅',
      gradient: 'from-blue-500 to-cyan-500',
      link: '/events',
      available: !isGuest
    },
    { 
      title: 'Play Games', 
      description: 'Challenge yourself with our games',
      icon: '🎮',
      gradient: 'from-purple-500 to-pink-500',
      link: '/games',
      available: !isGuest
    },
    { 
      title: 'View Leaderboard', 
      description: 'See top performers and rankings',
      icon: '🏆',
      gradient: 'from-green-500 to-emerald-500',
      link: '/leaderboard',
      available: !isGuest
    },
    { 
      title: 'Admin Panel', 
      description: 'Manage system and users',
      icon: '⚙️',
      gradient: 'from-orange-500 to-red-500',
      link: '/admin',
      available: isAdmin
    }
  ];

  const stats = [
    { label: 'Events Joined', value: dashboardData?.eventsJoined || 0, icon: '📅', gradient: 'from-blue-600 to-cyan-600' },
    { label: 'Games Played', value: dashboardData?.gamesPlayed || 0, icon: '🎮', gradient: 'from-purple-600 to-pink-600' },
    { label: 'Points Earned', value: dashboardData?.pointsEarned || 0, icon: '⭐', gradient: 'from-green-600 to-emerald-600' },
    { label: 'Achievements', value: dashboardData?.achievements || 0, icon: '🏆', gradient: 'from-orange-600 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Navbar />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          {/* Futuristic Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Welcome back, {user?.name || 'User'}!
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Your digital adventure continues
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50"
                  >
                    <span className="text-3xl">👋</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 shadow-2xl`}></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={{ rotate: hoveredCard === index ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center text-3xl shadow-lg`}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div
                      animate={{ scale: hoveredCard === index ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                    />
                  </div>
                  <p className="text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">{stat.label}</p>
                  <motion.p
                    animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl font-bold text-white tabular-nums"
                  >
                    {stat.value.toLocaleString()}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">Quick Actions</h3>
                <p className="text-gray-400 text-sm">Jump into the action</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickActions.filter(action => action.available).map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group"
                    >
                      <Link to={action.link}>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full cursor-pointer">
                          <div className="flex flex-col items-center text-center">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4`}
                            >
                              {action.icon}
                            </motion.div>
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                              {action.title}
                            </h4>
                            <p className="text-gray-400 text-sm">{action.description}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">Recent Activity</h3>
                <p className="text-gray-400 text-sm">Your latest achievements and activities</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData?.recentActivity?.slice(0, 5).map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="group flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg shadow-green-400/50"
                        />
                        <div>
                          <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                            {activity.description}
                          </p>
                          <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                        </div>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                      >
                        {activity.type}
                      </motion.span>
                    </motion.div>
                  )) || (
                    <div className="text-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                      <p className="text-gray-400">No recent activity</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
