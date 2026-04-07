import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Games', icon: '🎮' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'action', name: 'Action', icon: '⚡' },
    { id: 'strategy', name: 'Strategy', icon: '♟️' },
    { id: 'casual', name: 'Casual', icon: '🎯' },
  ];

  const allGames = [
    {
      id: 1,
      name: 'Puzzle Master',
      description: 'Challenge your mind with intricate puzzles and brain teasers that will test your logical thinking and problem-solving skills.',
      category: 'puzzle',
      difficulty: 3,
      icon: '🧩',
      plays: '1.2k',
      likes: '892',
      duration: '5-10 min'
    },
    {
      id: 2,
      name: 'Speed Rush',
      description: 'Test your reflexes in this fast-paced action game where every millisecond counts and quick decisions lead to victory.',
      category: 'action',
      difficulty: 4,
      icon: '⚡',
      plays: '2.5k',
      likes: '1.1k',
      duration: '3-5 min'
    },
    {
      id: 3,
      name: 'Strategy Quest',
      description: 'Build your empire and outsmart your opponents in this strategic warfare game that requires careful planning.',
      category: 'strategy',
      difficulty: 5,
      icon: '♟️',
      plays: '856',
      likes: '623',
      duration: '15-20 min'
    },
    {
      id: 4,
      name: 'Memory Match',
      description: 'Test your memory skills by matching pairs of cards in this classic brain training game with a modern twist.',
      category: 'puzzle',
      difficulty: 2,
      icon: '🃏',
      plays: '3.1k',
      likes: '1.8k',
      duration: '5-8 min'
    },
    {
      id: 5,
      name: 'Neon Racer',
      description: 'Race through neon-lit streets at breakneck speeds in this adrenaline-pumping racing game.',
      category: 'action',
      difficulty: 4,
      icon: '🏎️',
      plays: '1.9k',
      likes: '967',
      duration: '8-12 min'
    },
    {
      id: 6,
      name: 'Word Wizard',
      description: 'Expand your vocabulary and spelling skills in this magical word game that challenges your linguistic abilities.',
      category: 'casual',
      difficulty: 2,
      icon: '📝',
      plays: '2.2k',
      likes: '1.3k',
      duration: '6-10 min'
    },
    {
      id: 7,
      name: 'Tower Defense',
      description: 'Defend your kingdom from waves of enemies by strategically placing towers and upgrading your defenses.',
      category: 'strategy',
      difficulty: 4,
      icon: '🏰',
      plays: '1.5k',
      likes: '789',
      duration: '12-18 min'
    },
    {
      id: 8,
      name: 'Color Splash',
      description: 'Relax and unwind with this calming color-matching game that soothes your mind while challenging your perception.',
      category: 'casual',
      difficulty: 1,
      icon: '🎨',
      plays: '2.8k',
      likes: '1.6k',
      duration: '4-7 min'
    },
    {
      id: 9,
      name: 'Quick Math',
      description: 'Sharpen your mental math skills in this fast-paced arithmetic game that tests your calculation speed.',
      category: 'puzzle',
      difficulty: 3,
      icon: '🔢',
      plays: '1.7k',
      likes: '934',
      duration: '5-8 min'
    }
  ];

  const filteredGames = allGames.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Game Hub
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover amazing games, challenge your friends, and climb the leaderboards!
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 pl-12 glass text-white placeholder-white/50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'glass text-white hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Games Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  No games found
                </h3>
                <p className="text-white/70">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '9+', label: 'Total Games' },
              { number: '15k+', label: 'Total Plays' },
              { number: '8.5k+', label: 'Happy Players' },
              { number: '24/7', label: 'Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Game Not Found?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              We're always adding new games! Join our community to suggest games and get updates on new releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
                >
                  Join Community
                </motion.button>
              </Link>
              <Link to="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  View Events
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Games;
