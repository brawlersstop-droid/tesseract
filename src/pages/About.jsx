import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Team Lead',
      role: 'Project Management & Vision',
      description: 'Leading the Tesseract vision and coordinating all aspects of the project',
      icon: '👑'
    },
    {
      name: 'Frontend Team',
      role: 'UI/UX & Development',
      description: 'Creating beautiful, responsive interfaces and smooth user experiences',
      icon: '🎨'
    },
    {
      name: 'Backend Team',
      role: 'Server & Database',
      description: 'Building robust APIs and managing data infrastructure',
      icon: '⚙️'
    },
    {
      name: 'Game Developers',
      role: 'Game Logic & Design',
      description: 'Developing engaging games and interactive experiences',
      icon: '🎮'
    },
    {
      name: 'Design Team',
      role: 'Graphics & Animation',
      description: 'Creating stunning visuals and smooth animations',
      icon: '✨'
    },
    {
      name: 'Community Team',
      role: 'Events & Engagement',
      description: 'Organizing events and building our amazing community',
      icon: '🤝'
    }
  ];

  const milestones = [
    { year: '2024', title: 'Project Inception', description: 'Tesseract was born with a vision to create the ultimate gaming hub' },
    { year: 'Q1 2024', title: 'Team Formation', description: 'Assembled a talented team of developers, designers, and organizers' },
    { year: 'Q2 2024', title: 'Platform Development', description: 'Built the foundation of our web platform with modern technologies' },
    { year: 'Q3 2024', title: 'First Games Launch', description: 'Released our first batch of engaging mini-games' },
    { year: 'Q4 2024', title: 'Community Growth', description: 'Expanded to 500+ active members and hosted weekly events' },
    { year: '2025', title: 'Future Vision', description: 'Aiming to become the premier gaming platform in IITM BS' }
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
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tesseract</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The House of Excellence and Innovation - Where Gaming Meets Community
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-12 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white/80 mb-4">
                  Tesseract is dedicated to creating an engaging and inclusive platform where 
                  creativity, innovation, and entertainment come together. We believe in the power 
                  of games to connect people, spark creativity, and foster learning.
                </p>
                <p className="text-white/80">
                  Our mission is to build the ultimate gaming and engagement hub for IITM BS students, 
                  providing a space where everyone can play, learn, and grow together.
                </p>
              </div>
              <div className="text-center">
                <div className="text-8xl animate-float">🎯</div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🚀', title: 'Innovation', description: 'Pushing boundaries and exploring new possibilities' },
                { icon: '🤝', title: 'Community', description: 'Building connections and fostering collaboration' },
                { icon: '🎮', title: 'Fun', description: 'Creating enjoyable experiences for everyone' },
                { icon: '📚', title: 'Learning', description: 'Continuous growth and skill development' },
                { icon: '⭐', title: 'Excellence', description: 'Striving for quality in everything we do' },
                { icon: '🌈', title: 'Inclusivity', description: 'Welcoming diverse perspectives and talents' }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
                >
                  <div className="text-4xl mb-3">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-white/70 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4">{member.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-purple-300 font-medium mb-3">{member.role}</p>
                    <p className="text-white/70 text-sm">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="glass rounded-2xl p-6 inline-block text-left">
                      <div className="text-purple-300 font-semibold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                      <p className="text-white/70 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <div className="glass rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to Be Part of Our Story?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join us in building the most exciting gaming community in IITM BS. 
                Whether you want to play, create, or organize - there's a place for you here!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/join">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
                  >
                    Join Our Team
                  </motion.button>
                </Link>
                <Link to="/games">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    Play Our Games
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
