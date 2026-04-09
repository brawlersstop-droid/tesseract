import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import apiService from '../services/api';
import Navbar from '../components/layout/Navbar';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedGame, setSelectedGame] = useState('all');
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const canvasRef = useRef(null);
  const { user } = useAuth();
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
    const mockGames = [
      { id: 'all', name: 'All Games' },
      { id: 1, name: 'Puzzle Master' },
      { id: 2, name: 'Space Runner' },
      { id: 3, name: 'Memory Match' },
      { id: 4, name: 'Word Quest' }
    ];
    
    const mockLeaderboard = [
      { id: 1, rank: 1, name: 'Alex Chen', score: 9850, game: 'Puzzle Master', avatar: '🏆' },
      { id: 2, rank: 2, name: 'Sarah Kim', score: 9720, game: 'Space Runner', avatar: '🥈' },
      { id: 3, rank: 3, name: 'Mike Johnson', score: 9580, game: 'Memory Match', avatar: '🥉' },
      { id: 4, rank: 4, name: 'Emma Wilson', score: 9450, game: 'Word Quest', avatar: '⭐' },
      { id: 5, rank: 5, name: 'David Lee', score: 9320, game: 'Puzzle Master', avatar: '🌟' }
    ];
    
    setGames(mockGames);
    setLeaderboardData(mockLeaderboard);
    setLoading(false);
  }, []);

  const fetchLeaderboardData = async (gameId) => {
    try {
      const response = await apiService.getLeaderboard(gameId);
      if (response?.success) {
        setLeaderboardData(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      addToast('Error', 'Failed to load leaderboard', 'error');
    }
  };

  const handleGameFilter = (gameId) => {
    setSelectedGame(gameId);
    fetchLeaderboardData(gameId);
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return { gradient: 'from-yellow-400 to-orange-500', shadow: 'shadow-yellow-500/50', icon: '👑' };
    if (rank === 2) return { gradient: 'from-gray-300 to-gray-400', shadow: 'shadow-gray-400/50', icon: '🥈' };
    if (rank === 3) return { gradient: 'from-orange-400 to-red-500', shadow: 'shadow-orange-500/50', icon: '🥉' };
    return { gradient: 'from-blue-500 to-purple-500', shadow: 'shadow-blue-500/50', icon: '🏅' };
  };

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
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      Leaderboard
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Top performers across all games and competitions
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link to="/games">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 font-medium flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                        <span>Games</span>
                      </motion.button>
                    </Link>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/50"
                    >
                      <span className="text-3xl">🏆</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Game Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2 shadow-2xl">
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGameFilter('all')}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                    selectedGame === 'all' ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {selectedGame === 'all' && (
                    <motion.div
                      layoutId="activeLeaderboardFilter"
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">🌟 All Games</span>
                </motion.button>
                {games.map((game) => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGameFilter(game.id)}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                      selectedGame === game.id.toString() ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {selectedGame === game.id.toString() && (
                      <motion.div
                        layoutId="activeLeaderboardFilter"
                        className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">🎮 {game.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top 3 Winners */}
          {leaderboardData.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {leaderboardData.slice(0, 3).map((player, index) => {
                  const rankStyle = getRankStyle(index + 1);
                  return (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${rankStyle.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 ${rankStyle.shadow}`}></div>
                      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
                        <div className="text-5xl mb-4">{rankStyle.icon}</div>
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${rankStyle.gradient} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                        >
                          {player.name?.charAt(0)?.toUpperCase() || 'U'}
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-1">{player.name || 'Anonymous'}</h3>
                        <p className="text-gray-400 text-sm mb-4">{player.email || 'user@example.com'}</p>
                        <div className="text-4xl font-bold text-white mb-2">{player.score || 0}</div>
                        <p className="text-gray-300 text-sm">Total Score</p>
                        {index === 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute -top-4 -right-4"
                          >
                            <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
                              Champion
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <h3 className="text-2xl font-bold text-white">
                  {selectedGame === 'all' ? 'Overall Leaderboard' : 
                   games.find(g => g.id.toString() === selectedGame)?.name + ' Leaderboard'}
                </h3>
              </div>
              <div className="p-6">
                {leaderboardData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-4 px-4 font-medium text-gray-300">Rank</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-300">Player</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-300">Games Played</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-300">Best Score</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-300">Total Score</th>
                          <th className="text-left py-4 px-4 font-medium text-gray-300">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.map((player, index) => {
                          const rankStyle = getRankStyle(index + 1);
                          return (
                            <motion.tr
                              key={player.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.05 }}
                              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                              className={`border-b border-white/10 transition-colors ${
                                player.id === user?.id ? 'bg-white/5' : ''
                              }`}
                            >
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 bg-gradient-to-r ${rankStyle.gradient} text-white rounded-full text-sm font-medium`}>
                                  {index + 1 === 1 ? '👑 1st' : index + 1 === 2 ? '🥈 2nd' : index + 1 === 3 ? '🥉 3rd' : `#${index + 1}`}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-10 h-10 bg-gradient-to-br ${rankStyle.gradient} rounded-xl flex items-center justify-center text-white font-bold`}>
                                    {player.name?.charAt(0)?.toUpperCase() || 'U'}
                                  </div>
                                  <div>
                                    <div className="font-medium text-white flex items-center space-x-2">
                                      <span>{player.name || 'Anonymous'}</span>
                                      {player.id === user?.id && (
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30">You</span>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-400">{player.email || 'user@example.com'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-300">{player.gamesPlayed || 0}</td>
                              <td className="py-4 px-4">
                                <span className="font-semibold text-blue-400">{player.bestScore || 0}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="font-bold text-white">{player.score || 0}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs border border-white/20">
                                  {player.role || 'MEMBER'}
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">No scores yet</h3>
                    <p className="text-gray-400 mb-6">Start playing games to see your name on the leaderboard!</p>
                    <Link to="/games">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
                      >
                        Play Games
                      </motion.button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: leaderboardData.length, label: 'Active Players', icon: '👥', gradient: 'from-blue-500 to-cyan-500' },
                { number: leaderboardData.reduce((sum, player) => sum + (player.gamesPlayed || 0), 0), label: 'Games Played', icon: '🎮', gradient: 'from-green-500 to-emerald-500' },
                { number: leaderboardData.reduce((sum, player) => sum + (player.score || 0), 0), label: 'Total Points', icon: '⭐', gradient: 'from-yellow-500 to-orange-500' },
                { number: games.length, label: 'Available Games', icon: '🎯', gradient: 'from-purple-500 to-pink-500' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.number.toLocaleString()}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
