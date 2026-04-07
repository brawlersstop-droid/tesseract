import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events', icon: '📅' },
    { id: 'tournaments', name: 'Tournaments', icon: '🏆' },
    { id: 'workshops', name: 'Workshops', icon: '🛠️' },
    { id: 'social', name: 'Social', icon: '🎉' },
    { id: 'learning', name: 'Learning', icon: '📚' },
  ];

  const events = [
    {
      id: 1,
      title: 'Speed Rush Championship',
      description: 'Compete in the ultimate speed gaming tournament. Test your reflexes against the best players in IITM BS!',
      category: 'tournaments',
      date: '2024-04-15',
      time: '6:00 PM',
      duration: '3 hours',
      participants: 45,
      maxParticipants: 64,
      prize: '₹5,000',
      difficulty: 'Advanced',
      image: '⚡'
    },
    {
      id: 2,
      title: 'Game Development Workshop',
      description: 'Learn the fundamentals of game development with React and create your first mini-game in this hands-on workshop.',
      category: 'workshops',
      date: '2024-04-18',
      time: '4:00 PM',
      duration: '2 hours',
      participants: 28,
      maxParticipants: 40,
      prize: 'Certificate',
      difficulty: 'Beginner',
      image: '💻'
    },
    {
      id: 3,
      title: 'Puzzle Masters Meetup',
      description: 'Join fellow puzzle enthusiasts for an evening of brain teasers, logic puzzles, and friendly competition.',
      category: 'social',
      date: '2024-04-20',
      time: '7:00 PM',
      duration: '2 hours',
      participants: 32,
      maxParticipants: 50,
      prize: 'Fun & Prizes',
      difficulty: 'All Levels',
      image: '🧩'
    },
    {
      id: 4,
      title: 'Strategy Game Night',
      description: 'Strategic warfare games session. Learn advanced tactics and compete in strategic battles.',
      category: 'tournaments',
      date: '2024-04-22',
      time: '8:00 PM',
      duration: '4 hours',
      participants: 18,
      maxParticipants: 32,
      prize: '₹3,000',
      difficulty: 'Intermediate',
      image: '♟️'
    },
    {
      id: 5,
      title: 'UI/UX for Games',
      description: 'Design beautiful and intuitive game interfaces. Learn color theory, user psychology, and interaction design.',
      category: 'workshops',
      date: '2024-04-25',
      time: '5:00 PM',
      duration: '2.5 hours',
      participants: 22,
      maxParticipants: 35,
      prize: 'Portfolio Project',
      difficulty: 'Intermediate',
      image: '🎨'
    },
    {
      id: 6,
      title: 'Community Game Jam',
      description: '48-hour game development challenge. Form teams, create games, and compete for amazing prizes!',
      category: 'tournaments',
      date: '2024-04-28',
      time: '6:00 PM',
      duration: '48 hours',
      participants: 56,
      maxParticipants: 100,
      prize: '₹10,000',
      difficulty: 'All Levels',
      image: '🚀'
    }
  ];

  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.category === selectedCategory
  );

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

  const getCategoryColor = (category) => {
    const colors = {
      tournaments: 'from-red-500 to-orange-500',
      workshops: 'from-blue-500 to-cyan-500',
      social: 'from-green-500 to-emerald-500',
      learning: 'from-purple-500 to-pink-500',
      default: 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors.default;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isEventFull = (participants, maxParticipants) => {
    return participants >= maxParticipants;
  };

  const getParticipantColor = (participants, maxParticipants) => {
    const ratio = participants / maxParticipants;
    if (ratio >= 0.9) return 'text-red-400';
    if (ratio >= 0.7) return 'text-yellow-400';
    return 'text-green-400';
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
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Events & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Activities</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join exciting tournaments, workshops, and community events. 
              Learn, compete, and connect with fellow gamers!
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'glass text-white hover:bg-white/20'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Event Header */}
                <div className={`relative h-32 bg-gradient-to-br ${getCategoryColor(event.category)}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">{event.image}</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(event.category)} text-white text-xs font-semibold rounded-full`}>
                      {event.category}
                    </span>
                  </div>
                  {isEventFull(event.participants, event.maxParticipants) && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        Full
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-white/60 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formatDate(event.date)} at {event.time}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {event.duration}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className={getParticipantColor(event.participants, event.maxParticipants)}>
                        {event.participants}/{event.maxParticipants} participants
                      </span>
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                      {event.prize}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isEventFull(event.participants, event.maxParticipants)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isEventFull(event.participants, event.maxParticipants)
                        ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg btn-hover'
                    }`}
                  >
                    {isEventFull(event.participants, event.maxParticipants) ? 'Event Full' : 'Register Now'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '50+', label: 'Events Hosted' },
              { number: '1000+', label: 'Participants' },
              { number: '₹50k+', label: 'Prizes Given' },
              { number: '24/7', label: 'Community Support' },
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
              Want to Host an Event?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Have an idea for a tournament, workshop, or community event? 
              We'd love to help you bring it to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
                >
                  Join Event Team
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                Suggest Event
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;
