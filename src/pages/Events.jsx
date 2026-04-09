import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import apiService from '../services/api';
import Navbar from '../components/layout/Navbar';

const Events = () => {
  const [events, setEvents] = useState([]);
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
    const mockEvents = [
      { id: 1, name: 'Coding Challenge', date: '2025-01-20', time: '14:00', difficulty: 'medium', participants: 45, image: '💻' },
      { id: 2, name: 'Hackathon 2025', date: '2025-02-15', time: '09:00', difficulty: 'hard', participants: 120, image: '🎯' },
      { id: 3, name: 'Game Jam', date: '2025-03-10', time: '10:00', difficulty: 'medium', participants: 80, image: '🎮' },
      { id: 4, name: 'AI Workshop', date: '2025-04-05', time: '15:00', difficulty: 'easy', participants: 60, image: '🤖' }
    ];
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const handleJoinEvent = async (eventId) => {
    if (isGuest) {
      addToast('Error', 'Please become a member to join events', 'error');
      return;
    }

    try {
      const response = await apiService.joinEvent(eventId);
      if (response?.success) {
        addToast('Success', 'Successfully joined the event!', 'success');
        setEvents(events.map(event => 
          event.id === eventId 
            ? { ...event, isJoined: true, participants: event.participants + 1 }
            : event
        ));
      }
    } catch (error) {
      console.error('Failed to join event:', error);
      addToast('Error', error.message || 'Failed to join event', 'error');
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'joined') return event.isJoined;
    if (filter === 'available') return !event.isJoined && event.status === 'upcoming';
    return event.category === filter;
  });

  const getStatusBadge = (event) => {
    if (event.isJoined) {
      return { text: 'Joined', gradient: 'from-green-500 to-emerald-500', border: 'border-green-500/30' };
    }
    if (event.status === 'completed') {
      return { text: 'Completed', gradient: 'from-gray-500 to-slate-500', border: 'border-gray-500/30' };
    }
    if (event.status === 'ongoing') {
      return { text: 'Ongoing', gradient: 'from-blue-500 to-cyan-500', border: 'border-blue-500/30' };
    }
    if (event.participants >= event.maxParticipants) {
      return { text: 'Full', gradient: 'from-red-500 to-pink-500', border: 'border-red-500/30' };
    }
    return { text: 'Available', gradient: 'from-purple-500 to-indigo-500', border: 'border-purple-500/30' };
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
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Events
                    </h1>
                    <p className="text-gray-300 text-lg">
                      Discover and join exciting events in the Tesseract universe
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50"
                  >
                    <span className="text-3xl">📅</span>
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
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Join Tesseract to Participate</h3>
                      <p className="text-gray-300">
                        Become a member to join events and participate in competitions
                      </p>
                    </div>
                    <Link to="/membership">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                      >
                        Join Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Advanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2 shadow-2xl">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Events', icon: '🌟' },
                  { id: 'joined', label: 'Joined', icon: '✅' },
                  { id: 'available', label: 'Available', icon: '🎯' },
                  { id: 'tournament', label: 'Tournament', icon: '🏆' },
                  { id: 'workshop', label: 'Workshop', icon: '🛠️' },
                  { id: 'social', label: 'Social', icon: '🎉' }
                ].map((filterOption, index) => (
                  <motion.button
                    key={filterOption.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(filterOption.id)}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden group ${
                      filter === filterOption.id
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {filter === filterOption.id && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg"
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
          </motion.div>

          {/* Create Event Button */}
          {(isCore || isAdmin) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-12 flex justify-end"
            >
              <Link to="/events/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Event</span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onHoverStart={() => setHoveredCard(event.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="group"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 h-full shadow-2xl">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                              {event.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{event.description}</p>
                          </div>
                          <span className={`px-3 py-1 bg-gradient-to-r ${getStatusBadge(event).gradient} text-white rounded-full text-xs font-medium border ${getStatusBadge(event).border}`}>
                            {getStatusBadge(event).text}
                          </span>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center text-gray-300 text-sm">
                            <svg className="w-4 h-4 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <svg className="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location || 'Online'}
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <svg className="w-4 h-4 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {event.participants}/{event.maxParticipants} participants
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <svg className="w-4 h-4 mr-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="px-2 py-1 bg-white/10 rounded-lg text-xs border border-white/20">
                              {event.category}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span>Spots filled</span>
                            <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          {event.isJoined ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 font-medium"
                              disabled
                            >
                              Already Joined
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleJoinEvent(event.id)}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 font-medium"
                              disabled={isGuest || event.status === 'completed' || event.participants >= event.maxParticipants}
                            >
                              {event.participants >= event.maxParticipants ? 'Full' : 'Join Event'}
                            </motion.button>
                          )}
                          <Link to={`/events/${event.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 font-medium"
                            >
                              View
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">No events found</h3>
                  <p className="text-gray-400">
                    {filter === 'joined' ? 'You haven\'t joined any events yet' : 'No events match your current filter'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
