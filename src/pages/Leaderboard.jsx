import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [selectedGame, setSelectedGame] = useState('all');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for games
    const mockGames = [
      { id: 'all', name: 'All Games', type: 'internal' },
      { id: 'speed-rush', name: 'Speed Rush', type: 'internal', icon: '⚡' },
      { id: 'puzzle-master', name: 'Puzzle Master', type: 'internal', icon: '🧩' },
      { id: 'strategy-quest', name: 'Strategy Quest', type: 'internal', icon: '♟️' },
      { id: 'scribl', name: 'Scribl.io', type: 'external', icon: '🎨', url: 'https://scribl.io' },
      { id: 'smashkart', name: 'SmashKart', type: 'external', icon: '🏎️', url: 'https://smashkarts.io' },
      { id: 'krunker', name: 'Krunker.io', type: 'external', icon: '🔫', url: 'https://krunker.io' }
    ];

    // Mock leaderboard data
    const mockLeaderboard = [
      { rank: 1, name: 'Alice Chen', score: 15420, avatar: '👩‍🎓', game: 'speed-rush', wins: 45, playtime: '120h' },
      { rank: 2, name: 'Bob Kumar', score: 14890, avatar: '👨‍💻', game: 'puzzle-master', wins: 38, playtime: '98h' },
      { rank: 3, name: 'Charlie Singh', score: 13560, avatar: '🧑‍🔬', game: 'scribl', wins: 32, playtime: '85h' },
      { rank: 4, name: 'Diana Patel', score: 12230, avatar: '👩‍🔬', game: 'smashkart', wins: 28, playtime: '76h' },
      { rank: 5, name: 'Eve Wilson', score: 11980, avatar: '👩‍💼', game: 'strategy-quest', wins: 25, playtime: '72h' },
      { rank: 6, name: 'Frank Zhang', score: 10500, avatar: '👨‍🔬', game: 'krunker', wins: 22, playtime: '68h' },
      { rank: 7, name: 'Grace Lee', score: 9800, avatar: '👩‍🎨', game: 'speed-rush', wins: 20, playtime: '65h' },
      { rank: 8, name: 'Henry Kim', score: 9200, avatar: '👨‍🎨', game: 'puzzle-master', wins: 18, playtime: '62h' },
      { rank: 9, name: 'Ivy Johnson', score: 8700, avatar: '👩‍🔧', game: 'scribl', wins: 16, playtime: '58h' },
      { rank: 10, name: 'Jack Brown', score: 8200, avatar: '👨‍🔧', game: 'smashkart', wins: 15, playtime: '55h' }
    ];

    setGames(mockGames);
    setLeaderboardData(mockLeaderboard);
    setLoading(false);
  }, []);

  const filteredLeaderboard = selectedGame === 'all' 
    ? leaderboardData 
    : leaderboardData.filter(player => player.game === selectedGame);

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

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'from-yellow-400 to-orange-400';
      case 2: return 'from-gray-300 to-gray-400';
      case 3: return 'from-amber-600 to-amber-700';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const getGameIcon = (gameId) => {
    const game = games.find(g => g.id === gameId);
    return game?.icon || '🎮';
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              Leaderboard
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Compete with the best players in Tesseract. Climb the ranks and become a champion!
            </p>
          </motion.div>

          {/* Game Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Select Game</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {games.map((game) => (
                <motion.button
                  key={game.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGame(game.id)}
                  className={`p-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedGame === game.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'glass text-white hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-1">{game.icon}</div>
                  <div className="text-xs">{game.name}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Top 3 Winners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {filteredLeaderboard.slice(0, 3).map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative glass rounded-3xl p-8 text-center hover:bg-white/10 transition-all ${
                  player.rank === 1 ? 'ring-2 ring-yellow-400/50' : ''
                }`}
              >
                {player.rank === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-bold rounded-full">
                      👑 CHAMPION
                    </span>
                  </div>
                )}
                
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${getRankColor(player.rank)} flex items-center justify-center text-3xl font-bold text-white`}>
                  {player.rank}
                </div>
                
                <div className="text-4xl mb-3">{player.avatar}</div>
                <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                <div className="text-3xl font-bold text-white mb-4">{player.score.toLocaleString()}</div>
                
                <div className="space-y-2 text-white/60 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <span>{getGameIcon(player.game)}</span>
                    <span>{games.find(g => g.id === player.game)?.name}</span>
                  </div>
                  <div>🏆 {player.wins} Wins</div>
                  <div>⏱️ {player.playtime}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Full Leaderboard */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Full Rankings</h3>
            <div className="space-y-3">
              {filteredLeaderboard.map((player) => (
                <motion.div
                  key={player.rank}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    player.rank <= 3 
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(player.rank)} flex items-center justify-center font-bold text-white`}>
                      {player.rank}
                    </div>
                    <div className="text-2xl">{player.avatar}</div>
                    <div>
                      <div className="text-white font-semibold">{player.name}</div>
                      <div className="text-white/60 text-sm flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <span>{getGameIcon(player.game)}</span>
                          <span>{games.find(g => g.id === player.game)?.name}</span>
                        </span>
                        <span>🏆 {player.wins} wins</span>
                        <span>⏱️ {player.playtime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{player.score.toLocaleString()}</div>
                    <div className="text-white/60 text-sm">points</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* External Games Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">External Games</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {games.filter(game => game.type === 'external').map((game) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + games.indexOf(game) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
                >
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{game.name}</h4>
                  <p className="text-white/60 text-sm mb-4">
                    Join our tournaments and compete for prizes!
                  </p>
                  <div className="space-y-2 text-white/80 text-sm">
                    <div>🏆 Weekly Tournaments</div>
                    <div>📊 Manual Score Tracking</div>
                    <div>🎁 Exciting Prizes</div>
                  </div>
                  <motion.a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block mt-4 px-6 py-2 glass text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                  >
                    Play Game
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
