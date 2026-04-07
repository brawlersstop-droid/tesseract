import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GameCard = ({ game, index }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.9]
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      puzzle: 'from-purple-500 to-indigo-500',
      action: 'from-red-500 to-orange-500',
      strategy: 'from-blue-500 to-cyan-500',
      casual: 'from-green-500 to-emerald-500',
      default: 'from-gray-500 to-gray-600'
    };
    return colors[category.toLowerCase()] || colors.default;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative"
    >
      <div className="glass rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 card-hover border border-white/10">
        {/* Game Image/Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(game.category)} opacity-80`} />
          
          {/* Game Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            >
              <span className="text-4xl">{game.icon}</span>
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(game.category)} text-white text-xs font-semibold rounded-full`}>
              {game.category}
            </span>
          </div>

          {/* Difficulty Stars */}
          <div className="absolute top-4 left-4 flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < game.difficulty ? 'text-yellow-400' : 'text-white/30'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Game Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {game.name}
          </h3>
          
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {game.description}
          </p>

          {/* Game Stats */}
          <div className="flex items-center justify-between text-sm text-white/60 mb-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{game.plays}</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{game.likes}</span>
              </span>
            </div>
            <span className="text-xs">
              {game.duration}
            </span>
          </div>

          {/* Play Button */}
          <Link to={`/game/${game.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 btn-hover border-0"
            >
              Play Now
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default GameCard;
