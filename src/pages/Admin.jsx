import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import apiService from '../services/api';
import Navbar from '../components/layout/Navbar';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const { user, isAdmin } = useAuth();
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
      const particleCount = 50;
      
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Mock data since no backend exists
    const mockStats = {
      totalUsers: 245,
      activeUsers: 180,
      totalEvents: 35,
      totalGames: 20
    };
    
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'MEMBER', joinedAt: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'CORE', joinedAt: '2024-02-20' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'ADMIN', joinedAt: '2024-03-10' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'GUEST', joinedAt: '2024-04-05' }
    ];
    
    const mockEvents = [
      { id: 1, name: 'Coding Challenge', date: '2025-01-20', participants: 45 },
      { id: 2, name: 'Hackathon 2025', date: '2025-02-15', participants: 120 },
      { id: 3, name: 'Game Jam', date: '2025-03-10', participants: 80 }
    ];
    
    const mockGames = [
      { id: 1, name: 'Puzzle Master', plays: 450 },
      { id: 2, name: 'Space Runner', plays: 320 },
      { id: 3, name: 'Memory Match', plays: 280 }
    ];
    
    setStats(mockStats);
    setUsers(mockUsers);
    setEvents(mockEvents);
    setGames(mockGames);
    setLoading(false);
  }, []);

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      const response = await apiService.updateUserRole(userId, newRole);
      if (response?.success) {
        addToast('Success', 'User role updated successfully', 'success');
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
      addToast('Error', 'Failed to update user role', 'error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      'ADMIN': { bg: 'bg-gradient-to-r from-red-500 to-pink-500', text: 'text-white', border: 'border-red-500/30' },
      'CORE': { bg: 'bg-gradient-to-r from-purple-500 to-indigo-500', text: 'text-white', border: 'border-purple-500/30' },
      'MEMBER': { bg: 'bg-gradient-to-r from-green-500 to-emerald-500', text: 'text-white', border: 'border-green-500/30' },
      'GUEST': { bg: 'bg-gradient-to-r from-gray-500 to-slate-500', text: 'text-white', border: 'border-gray-500/30' }
    };
    return badges[role] || badges.GUEST;
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'users', name: 'Users', icon: '👥', gradient: 'from-purple-500 to-pink-500' },
    { id: 'events', name: 'Events', icon: '📅', gradient: 'from-green-500 to-emerald-500' },
    { id: 'games', name: 'Games', icon: '🎮', gradient: 'from-orange-500 to-red-500' }
  ];

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: '👥', gradient: 'from-blue-600 to-cyan-600', glow: 'shadow-blue-500/50' },
    { label: 'Active Events', value: stats.activeEvents || 0, icon: '📅', gradient: 'from-green-600 to-emerald-600', glow: 'shadow-green-500/50' },
    { label: 'Total Games', value: stats.totalGames || 0, icon: '🎮', gradient: 'from-purple-600 to-pink-600', glow: 'shadow-purple-500/50' },
    { label: 'Total Plays', value: stats.totalPlays || 0, icon: '🎯', gradient: 'from-orange-600 to-red-600', glow: 'shadow-orange-500/50' }
  ];

  // Temporarily commented out for testing
  // if (!isAdmin) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
  //       <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  //       <div className="relative z-10 min-h-screen flex items-center justify-center">
  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.9 }}
  //           animate={{ opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.5, ease: "easeOut" }}
  //           className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-md w-full mx-4"
  //         >
  //           <div className="text-center">
  //             <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/50">
  //               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
  //               </svg>
  //             </div>
  //             <h1 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
  //               Access Denied
  //             </h1>
  //             <p className="text-gray-300 mb-8">You don't have permission to access the admin panel.</p>
  //             <Link to="/dashboard">
  //               <motion.button
  //                 whileHover={{ scale: 1.05 }}
  //                 whileTap={{ scale: 0.95 }}
  //                 className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
  //               >
  //                 Go to Dashboard
  //               </motion.button>
  //             </Link>
  //           </div>
  //         </motion.div>
  //       </div>
  //     </div>
  //   );
  // }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Navbar />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
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
                      Admin Panel
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Manage the digital universe with precision
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-4 gap-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-4 rounded-xl font-medium transition-all duration-300 overflow-hidden group ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl shadow-lg`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-center space-y-2">
                      <span className="text-2xl">{tab.icon}</span>
                      <span className="text-sm font-semibold">{tab.name}</span>
                    </div>
                    {activeTab === tab.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-white/20 rounded-xl"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

        {/* Dashboard Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Futuristic Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statCards.map((stat, index) => (
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
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 shadow-2xl ${stat.glow}`}></div>
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
                </div>

                {/* Advanced Activity Feed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
                >
                  <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2">System Activity</h3>
                    <p className="text-gray-400 text-sm">Real-time monitoring and insights</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {stats.recentActivity?.slice(0, 5).map((activity, index) => (
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
                </motion.div>
              </motion.div>
            )}

        {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">User Management</h3>
                        <p className="text-gray-400 text-sm">Manage user roles and permissions</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add User</span>
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-4 px-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">User</th>
                            <th className="text-left py-4 px-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Email</th>
                            <th className="text-left py-4 px-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Role</th>
                            <th className="text-left py-4 px-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Joined</th>
                            <th className="text-left py-4 px-4 font-semibold text-gray-300 uppercase tracking-wider text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.05 }}
                              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                              className="border-b border-white/5 transition-all duration-300"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <motion.div
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                                  >
                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                  </motion.div>
                                  <span className="font-medium text-white">{user.name || 'Anonymous'}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-300">{user.email}</td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 bg-gradient-to-r ${getRoleBadge(user.role).bg} ${getRoleBadge(user.role).text} rounded-full text-xs font-medium border ${getRoleBadge(user.role).border}`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-300">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4">
                                <select
                                  value={user.role}
                                  onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                  className="text-sm bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                                  disabled={user.id === user?.id}
                                >
                                  <option value="GUEST" className="bg-gray-800">Guest</option>
                                  <option value="MEMBER" className="bg-gray-800">Member</option>
                                  <option value="CORE" className="bg-gray-800">Core</option>
                                  <option value="ADMIN" className="bg-gray-800">Admin</option>
                                </select>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

        {/* Events Tab */}
            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Event Management</h3>
                        <p className="text-gray-400 text-sm">Manage events and registrations</p>
                      </div>
                      <Link to="/events/create">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center space-x-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Create Event</span>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {events.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -10, scale: 1.02 }}
                          className="group"
                        >
                          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                  {event.name}
                                </h4>
                                <p className="text-gray-400 text-sm">{event.description}</p>
                              </div>
                              <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                                {event.category}
                              </span>
                            </div>
                            <div className="space-y-3 text-sm mb-6">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Participants:</span>
                                <span className="text-white font-medium">{event.participants || 0}/{event.maxParticipants || 0}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Date:</span>
                                <span className="text-white font-medium">{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Status:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  event.status === 'completed' 
                                    ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' 
                                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                                }`}>
                                  {event.status || 'upcoming'}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Link to={`/events/${event.id}`} className="flex-1">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                                >
                                  View
                                </motion.button>
                              </Link>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                              >
                                Edit
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

        {/* Games Tab */}
            {activeTab === 'games' && (
              <motion.div
                key="games"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Game Management</h3>
                        <p className="text-gray-400 text-sm">Manage games and scores</p>
                      </div>
                      <Link to="/games/create">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 flex items-center space-x-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Create Game</span>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {games.map((game, index) => (
                        <motion.div
                          key={game.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -10, scale: 1.02 }}
                          className="group"
                        >
                          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                  {game.name}
                                </h4>
                                <p className="text-gray-400 text-sm">{game.description}</p>
                              </div>
                              <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-full text-xs font-medium border border-orange-500/30">
                                {game.category}
                              </span>
                            </div>
                            <div className="space-y-3 text-sm mb-6">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Total Plays:</span>
                                <span className="text-white font-medium">{game.plays || 0}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">High Score:</span>
                                <span className="text-white font-medium">{game.highScore || 0}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Difficulty:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  game.difficulty === 'hard' 
                                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                }`}>
                                  {game.difficulty || 'medium'}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Link to={`/games/${game.id}`} className="flex-1">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                                >
                                  View
                                </motion.button>
                              </Link>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                              >
                                Edit
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Admin;
