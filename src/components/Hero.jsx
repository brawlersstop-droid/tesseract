import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Hero = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9]
      }
    }
  };

  const floatingShapes = [
    { id: 1, size: 80, color: 'from-purple-400 to-pink-400', delay: 0 },
    { id: 2, size: 60, color: 'from-blue-400 to-cyan-400', delay: 1 },
    { id: 3, size: 100, color: 'from-green-400 to-emerald-400', delay: 2 },
    { id: 4, size: 40, color: 'from-yellow-400 to-orange-400', delay: 3 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute rounded-full bg-gradient-to-r ${shape.color} opacity-20 blur-xl`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 10 + shape.delay * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Title */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight"
          >
            <span className="block mb-2 text-white/90 font-light">Welcome to</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
              Tesseract
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          The Ultimate Gaming & Engagement Hub
          <br />
          <span className="text-lg sm:text-xl text-white/70">
            Where Innovation Meets Entertainment
          </span>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-white/80 mb-12 max-w-2xl mx-auto"
        >
          Experience interactive games, engaging activities, and connect with a vibrant community 
          of creators and players. Your journey into the world of digital entertainment starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/games">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 btn-gradient text-white font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 btn-hover text-lg"
            >
              Start Playing
            </motion.button>
          </Link>

          <Link to="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 border border-white/20 text-lg"
            >
              Join Our Team
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '10+', label: 'Games' },
            { number: '500+', label: 'Players' },
            { number: '24/7', label: 'Events' },
            { number: '∞', label: 'Fun' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-white/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-center"
        >
          <div className="text-sm mb-2">Scroll to explore</div>
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
