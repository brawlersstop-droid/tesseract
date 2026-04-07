import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user data
    const userData = JSON.parse(localStorage.getItem('user')) || {
      fullName: 'John Doe',
      email: 'john.doe@ds.study.iitm.ac.in',
      studentId: 'BS20231234',
      role: 'guest',
      joinedAt: '2024-01-15T10:30:00Z',
      avatar: '👤'
    };
    setUser(userData);
    
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const mockData = {
    overview: {
      stats: [
        { label: 'Events Joined', value: '12', icon: '📅', color: 'from-blue-500 to-cyan-500' },
        { label: 'Games Played', value: '45', icon: '🎮', color: 'from-purple-500 to-pink-500' },
        { label: 'Total Score', value: '2,450', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
        { label: 'Rank', value: '#23', icon: '🏆', color: 'from-green-500 to-emerald-500' }
      ],
      recentActivity: [
        { type: 'game', name: 'Speed Rush', score: 450, time: '2 hours ago', icon: '⚡' },
        { type: 'event', name: 'Puzzle Championship', status: 'Joined', time: '1 day ago', icon: '🧩' },
        { type: 'game', name: 'Strategy Quest', score: 320, time: '2 days ago', icon: '♟️' },
        { type: 'achievement', name: 'Speed Demon', status: 'Unlocked', time: '3 days ago', icon: '🏅' }
      ]
    },
    events: [
      {
        id: 1,
        name: 'Speed Rush Championship',
        date: '2024-04-15',
        time: '6:00 PM',
        participants: 45,
        maxParticipants: 64,
        status: 'registered',
        category: 'tournament'
      },
      {
        id: 2,
        name: 'Game Development Workshop',
        date: '2024-04-18',
        time: '4:00 PM',
        participants: 28,
        maxParticipants: 40,
        status: 'available',
        category: 'workshop'
      },
      {
        id: 3,
        name: 'Puzzle Masters Meetup',
        date: '2024-04-20',
        time: '7:00 PM',
        participants: 32,
        maxParticipants: 50,
        status: 'registered',
        category: 'social'
      }
    ],
    games: [
      {
        id: 1,
        name: 'Speed Rush',
        highScore: 450,
        plays: 12,
        category: 'action',
        icon: '⚡',
        rank: 15
      },
      {
        id: 2,
        name: 'Puzzle Master',
        highScore: 320,
        plays: 8,
        category: 'puzzle',
        icon: '🧩',
        rank: 23
      },
      {
        id: 3,
        name: 'Strategy Quest',
        highScore: 280,
        plays: 5,
        category: 'strategy',
        icon: '♟️',
        rank: 31
      }
    ],
    leaderboard: [
      { rank: 1, name: 'Alice Chen', score: 5420, avatar: '👩‍🎓' },
      { rank: 2, name: 'Bob Kumar', score: 4890, avatar: '👨‍💻' },
      { rank: 3, name: 'Charlie Singh', score: 4560, avatar: '🧑‍🔬' },
      { rank: 4, name: 'Diana Patel', score: 4230, avatar: '👩‍🔬' },
      { rank: 5, name: 'Eve Wilson', score: 3980, avatar: '👩‍💼' },
      { rank: 23, name: 'You', score: 2450, avatar: '👤', isCurrentUser: true }
    ]
  };

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

  const renderOverview = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.overview.stats.map((stat, index) => (
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
          {mockData.overview.recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/5 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{activity.icon}</div>
                <div>
                  <div className="text-white font-medium">{activity.name}</div>
                  <div className="text-white/60 text-sm">
                    {activity.score && `Score: ${activity.score} • `}
                    {activity.status}
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

  const renderEvents = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Your Events</h3>
      <div className="grid gap-6">
        {mockData.events.map((event) => (
          <motion.div key={event.id} variants={itemVariants} whileHover={{ x: 5 }}>
            <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{event.name}</h4>
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>⏰ {event.time}</span>
                    <span>👥 {event.participants}/{event.maxParticipants}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'registered' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {event.status === 'registered' ? 'Registered' : 'Available'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderGames = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Your Games</h3>
      <div className="grid gap-6">
        {mockData.games.map((game) => (
          <motion.div key={game.id} variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{game.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{game.name}</h4>
                    <div className="flex items-center space-x-4 text-white/60 text-sm">
                      <span>🏆 Rank #{game.rank}</span>
                      <span>⭐ High Score: {game.highScore}</span>
                      <span>🎮 Plays: {game.plays}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/game/${game.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all btn-hover"
                  >
                    Play Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderLeaderboard = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Global Leaderboard</h3>
      <div className="glass rounded-2xl p-6">
        <div className="space-y-4">
          {mockData.leaderboard.map((player) => (
            <motion.div
              key={player.rank}
              variants={itemVariants}
              className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                player.isCurrentUser 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black' : 'text-white/60'
                }`}>
                  {player.rank}
                </div>
                <div className="text-2xl">{player.avatar}</div>
                <div className="text-white font-medium">{player.name}</div>
              </div>
              <div className="text-xl font-bold text-white">{player.score.toLocaleString()}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'games', name: 'Games', icon: '🎮' },
    { id: 'leaderboard', name: 'Leaderboard', icon: '🏆' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* User Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl">
                  {user?.avatar}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{user?.fullName}</h1>
                  <div className="flex items-center space-x-4 text-white/60">
                    <span>📧 {user?.email}</span>
                    <span>🆔 {user?.studentId}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user?.role === 'member' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {user?.role === 'member' ? 'Member' : 'Guest'}
                    </span>
                  </div>
                </div>
              </div>
              {user?.role === 'guest' && (
                <Link to="/membership">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all btn-hover"
                  >
                    Become Member
                  </motion.button>
                </Link>
              )}
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
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'games' && renderGames()}
            {activeTab === 'leaderboard' && renderLeaderboard()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
