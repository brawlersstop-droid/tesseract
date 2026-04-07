import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GameCard from '../components/GameCard';
import Footer from '../components/Footer';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { id: 1, x: 10, y: 20, size: 80, color: 'from-purple-500/20 to-blue-500/20' },
    { id: 2, x: 80, y: 60, size: 60, color: 'from-blue-500/20 to-cyan-500/20' },
    { id: 3, x: 30, y: 80, size: 100, color: 'from-cyan-500/20 to-purple-500/20' },
    { id: 4, x: 70, y: 30, size: 40, color: 'from-purple-500/20 to-pink-500/20' },
    { id: 5, x: 50, y: 50, size: 120, color: 'from-blue-500/20 to-purple-500/20' }
  ];

  // Mock game data
  const featuredGames = [
    {
      id: 1,
      name: 'Puzzle Master',
      description: 'Challenge your mind with intricate puzzles and brain teasers that will test your logical thinking.',
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
      description: 'Test your reflexes in this fast-paced action game where every millisecond counts.',
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
      description: 'Build your empire and outsmart your opponents in this strategic warfare game.',
      category: 'strategy',
      difficulty: 5,
      icon: '♟️',
      plays: '856',
      likes: '623',
      duration: '15-20 min'
    }
  ];

  const features = [
    {
      icon: '🎮',
      title: 'Diverse Games',
      description: 'From puzzles to action, find your perfect game'
    },
    {
      icon: '🏆',
      title: 'Compete & Win',
      description: 'Leaderboards, tournaments, and amazing prizes'
    },
    {
      icon: '👥',
      title: 'Join Community',
      description: 'Connect with gamers and make new friends'
    },
    {
      icon: '🚀',
      title: 'Regular Updates',
      description: 'New games and features added every month'
    }
  ];

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
      
      {/* Hero Section */}
      <Hero />

      {/* Featured Games Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Featured Games
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover our most popular games handpicked by the community
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/games">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 glass text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                View All Games
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose Tesseract?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Experience gaming like never before with our unique features
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="text-center p-6 glass rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Join the Fun?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Become part of our growing community and start your gaming journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
                >
                  Join Tesseract
                </motion.button>
              </Link>
              <Link to="/games">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  Explore Games
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
