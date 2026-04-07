import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice Chen', email: 'alice@ds.study.iitm.ac.in', role: 'member', joinedAt: '2024-01-15', status: 'active' },
        { id: 2, name: 'Bob Kumar', email: 'bob@es.study.iitm.ac.in', role: 'guest', joinedAt: '2024-02-20', status: 'active' },
        { id: 3, name: 'Charlie Singh', email: 'charlie@ds.study.iitm.ac.in', role: 'core', joinedAt: '2023-12-10', status: 'active' },
        { id: 4, name: 'Diana Patel', email: 'diana@ds.study.iitm.ac.in', role: 'member', joinedAt: '2024-01-25', status: 'inactive' },
      ]);
      setEvents([
        { id: 1, name: 'Speed Rush Championship', date: '2024-04-15', participants: 45, status: 'upcoming' },
        { id: 2, name: 'Puzzle Masters Meetup', date: '2024-04-20', participants: 32, status: 'upcoming' },
        { id: 3, name: 'Game Dev Workshop', date: '2024-03-10', participants: 28, status: 'completed' },
      ]);
      setGames([
        { id: 1, name: 'Speed Rush', plays: 1250, avgScore: 320, status: 'active' },
        { id: 2, name: 'Puzzle Master', plays: 890, avgScore: 280, status: 'active' },
        { id: 3, name: 'Strategy Quest', plays: 650, avgScore: 450, status: 'maintenance' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalGames: games.length,
    totalPlays: games.reduce((sum, game) => sum + game.plays, 0)
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.9]
      }
    }
  };

  const renderDashboard = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'from-blue-500 to-cyan-500' },
          { label: 'Active Users', value: stats.activeUsers, icon: '✅', color: 'from-green-500 to-emerald-500' },
          { label: 'Total Events', value: stats.totalEvents, icon: '📅', color: 'from-purple-500 to-pink-500' },
          { label: 'Upcoming Events', value: stats.upcomingEvents, icon: '🔔', color: 'from-yellow-500 to-orange-500' },
          { label: 'Total Games', value: stats.totalGames, icon: '🎮', color: 'from-red-500 to-pink-500' },
          { label: 'Total Plays', value: stats.totalPlays.toLocaleString(), icon: '🎯', color: 'from-indigo-500 to-purple-500' }
        ].map((stat, index) => (
          <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }}>
            <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New user registration', user: 'Alice Chen', time: '2 hours ago', icon: '👤' },
            { action: 'Event registration', user: 'Bob Kumar', event: 'Speed Rush', time: '3 hours ago', icon: '📅' },
            { action: 'Game played', user: 'Charlie Singh', game: 'Puzzle Master', score: 450, time: '5 hours ago', icon: '🎮' },
            { action: 'Membership upgrade', user: 'Diana Patel', time: '1 day ago', icon: '⭐' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/5 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{activity.icon}</div>
                <div>
                  <div className="text-white font-medium">{activity.action}</div>
                  <div className="text-white/60 text-sm">
                    {activity.user}
                    {activity.event && ` • ${activity.event}`}
                    {activity.game && ` • ${activity.game}`}
                    {activity.score && ` • Score: ${activity.score}`}
                  </div>
                </div>
              </div>
              <div className="text-white/60 text-sm">{activity.time}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderUsers = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">User Management</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all btn-hover"
        >
          Add User
        </motion.button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="glass-dark">
              <tr>
                <th className="px-6 py-4 text-left text-white font-medium">Name</th>
                <th className="px-6 py-4 text-left text-white font-medium">Email</th>
                <th className="px-6 py-4 text-left text-white font-medium">Role</th>
                <th className="px-6 py-4 text-left text-white font-medium">Status</th>
                <th className="px-6 py-4 text-left text-white font-medium">Joined</th>
                <th className="px-6 py-4 text-left text-white font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  variants={itemVariants}
                  className="hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4 text-white">{user.name}</td>
                  <td className="px-6 py-4 text-white/80">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                      user.role === 'core' ? 'bg-purple-500/20 text-purple-400' :
                      user.role === 'member' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/60">{new Date(user.joinedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 glass text-white text-sm rounded-lg hover:bg-white/20 transition-all"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-lg hover:bg-red-500/30 transition-all"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderEvents = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Event Management</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all btn-hover"
        >
          Create Event
        </motion.button>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="glass rounded-2xl p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{event.name}</h4>
                <div className="flex items-center space-x-4 text-white/60 text-sm">
                  <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                  <span>👥 {event.participants} participants</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 glass text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderGames = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Game Management</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all btn-hover"
        >
          Add Game
        </motion.button>
      </div>

      <div className="grid gap-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="glass rounded-2xl p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{game.name}</h4>
                <div className="flex items-center space-x-4 text-white/60 text-sm">
                  <span>🎮 {game.plays.toLocaleString()} plays</span>
                  <span>⭐ Avg Score: {game.avgScore}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    game.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {game.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 glass text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'games', name: 'Games', icon: '🎮' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-white/80">Manage Tesseract platform and users</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full font-semibold">
                  Admin
                </span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'glass text-white hover:bg-white/20'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'games' && renderGames()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
