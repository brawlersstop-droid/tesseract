import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import apiService from '../services/api';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);
  const { user, isGuest, isMember, isCore, isAdmin } = useAuth();
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
      { id: 1, name: 'Puzzle Master', category: 'puzzle', difficulty: 3, image: '🧩' },
      { id: 2, name: 'Space Runner', category: 'action', difficulty: 4, image: '🚀' },
      { id: 3, name: 'Memory Match', category: 'memory', difficulty: 2, image: '🎴' },
      { id: 4, name: 'Word Quest', category: 'word', difficulty: 3, image: '📝' },
      { id: 5, name: 'Math Challenge', category: 'math', difficulty: 4, image: '🔢' },
      { id: 6, name: 'Reaction Time', category: 'skill', difficulty: 2, image: '⚡' }
    ];
    setGames(mockGames);
    setLoading(false);
  }, []);

  const handlePlayGame = async (gameId) => {
    if (isGuest) {
      addToast('Error', 'Please become a member to play games', 'error');
      return;
    }
    window.location.href = `/games/${gameId}/play`;
  };

  const filteredGames = games.filter(game => {
    if (filter === 'all') return true;
    return game.category === filter;
  });

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'easy': return { text: 'Easy', gradient: 'from-green-500 to-emerald-500' };
      case 'medium': return { text: 'Medium', gradient: 'from-yellow-500 to-orange-500' };
      case 'hard': return { text: 'Hard', gradient: 'from-red-500 to-pink-500' };
      default: return { text: 'All Levels', gradient: 'from-gray-500 to-slate-500' };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'action': return '⚡';
      case 'puzzle': return '🧩';
      case 'strategy': return '♟️';
      case 'arcade': return '🕹️';
      case 'sports': return '⚽';
      default: return '🎮';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                      Games
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Challenge yourself with exciting games and compete for high scores
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/50"
                  >
                    <span className="text-3xl">🎮</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Guest CTA */}
          {isGuest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Join Tesseract to Play Games</h3>
                      <p className="text-gray-300">Become a member to play games and compete on the leaderboard</p>
                    </div>
                    <Link to="/membership">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                      >
                        Join Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-12 flex flex-wrap justify-between items-center gap-4"
          >
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2 shadow-2xl">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Games', icon: '🌟' },
                  { id: 'action', label: 'Action', icon: '⚡' },
                  { id: 'puzzle', label: 'Puzzle', icon: '🧩' },
                  { id: 'strategy', label: 'Strategy', icon: '♟️' },
                  { id: 'arcade', label: 'Arcade', icon: '🕹️' },
                  { id: 'sports', label: 'Sports', icon: '⚽' }
                ].map((filterOption) => (
                  <motion.button
                    key={filterOption.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(filterOption.id)}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                      filter === filterOption.id ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {filter === filterOption.id && (
                      <motion.div
                        layoutId="activeGameFilter"
                        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center space-x-2">
                      <span>{filterOption.icon}</span>
                      <span>{filterOption.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/leaderboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 font-medium flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Leaderboard</span>
                </motion.button>
              </Link>
              {(isCore || isAdmin) && (
                <Link to="/games/create">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 font-medium flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create Game</span>
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredGames.length > 0 ? (
                filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onHoverStart={() => setHoveredCard(game.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="group"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 h-full shadow-2xl">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-3xl shadow-lg"
                            >
                              {getCategoryIcon(game.category)}
                            </motion.div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                                {game.name}
                              </h3>
                              <p className="text-gray-400 text-sm">{game.description}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 bg-gradient-to-r ${getDifficultyBadge(game.difficulty).gradient} text-white rounded-full text-xs font-medium`}>
                            {getDifficultyBadge(game.difficulty).text}
                          </span>
                        </div>

                        {/* Game Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                            <div className="flex items-center text-gray-300 text-sm mb-1">
                              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              </svg>
                              Plays
                            </div>
                            <p className="text-2xl font-bold text-white">{game.plays || 0}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                            <div className="flex items-center text-gray-300 text-sm mb-1">
                              <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                              High Score
                            </div>
                            <p className="text-2xl font-bold text-white">{game.highScore || 0}</p>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="mb-6">
                          <span className="px-3 py-1 bg-white/10 rounded-lg text-sm text-gray-300 border border-white/20">
                            {game.category}
                          </span>
                        </div>

                        {/* Personal Best */}
                        {game.userBestScore && (
                          <div className="mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-300">Your Best</span>
                              <span className="text-xl font-bold text-white">{game.userBestScore} pts</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePlayGame(game.id)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 font-medium"
                            disabled={isGuest}
                          >
                            {isGuest ? 'Join to Play' : 'Play Now'}
                          </motion.button>
                          <Link to={`/games/${game.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 font-medium"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">No games found</h3>
                  <p className="text-gray-400">
                    {filter === 'all' ? 'No games available at the moment' : 'No games match your current filter'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Game Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: games.length, label: 'Total Games', icon: '🎮', gradient: 'from-blue-500 to-cyan-500' },
                { number: games.reduce((sum, game) => sum + (game.plays || 0), 0), label: 'Total Plays', icon: '▶️', gradient: 'from-green-500 to-emerald-500' },
                { number: games.filter(game => game.category === 'action').length, label: 'Action Games', icon: '⚡', gradient: 'from-red-500 to-pink-500' },
                { number: games.filter(game => game.category === 'puzzle').length, label: 'Puzzle Games', icon: '🧩', gradient: 'from-purple-500 to-indigo-500' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
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

export default Games;
