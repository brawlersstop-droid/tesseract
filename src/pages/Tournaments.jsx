import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const Tournaments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

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
    // Mock tournament data
    const mockTournaments = {
      upcoming: [
        {
          id: 1,
          name: 'Speed Rush Championship',
          game: 'Speed Rush',
          date: '2024-04-20',
          time: '6:00 PM',
          prizePool: '₹5,000',
          participants: 45,
          maxParticipants: 64,
          type: 'solo',
          status: 'registration',
          image: '⚡'
        },
        {
          id: 2,
          name: 'Puzzle Masters League',
          game: 'Puzzle Master',
          date: '2024-04-22',
          time: '7:00 PM',
          prizePool: '₹3,000',
          participants: 28,
          maxParticipants: 32,
          type: 'solo',
          status: 'registration',
          image: '🧩'
        },
        {
          id: 3,
          name: 'Strategy Quest Team Battle',
          game: 'Strategy Quest',
          date: '2024-04-25',
          time: '5:00 PM',
          prizePool: '₹10,000',
          participants: 12,
          maxParticipants: 16,
          type: 'team',
          status: 'registration',
          image: '♟️'
        }
      ],
      ongoing: [
        {
          id: 4,
          name: 'Scribl.io Art Challenge',
          game: 'Scribl.io',
          startDate: '2024-04-15',
          endDate: '2024-04-18',
          prizePool: '₹2,500',
          participants: 56,
          type: 'solo',
          status: 'live',
          currentRound: 'Semi-Finals',
          image: '🎨'
        }
      ],
      completed: [
        {
          id: 5,
          name: 'Krunker.io Spring Cup',
          game: 'Krunker.io',
          date: '2024-04-10',
          prizePool: '₹7,500',
          participants: 48,
          type: 'solo',
          status: 'completed',
          winner: 'ProGamer123',
          image: '🔫'
        },
        {
          id: 6,
          name: 'SmashKart Racing League',
          game: 'SmashKart',
          date: '2024-04-05',
          prizePool: '₹4,000',
          participants: 32,
          type: 'solo',
          status: 'completed',
          winner: 'SpeedDemon',
          image: '🏎️'
        }
      ]
    };

    setTournaments(mockTournaments);
    setLoading(false);
  }, []);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.9]
      }
    }
  };

  const renderTournamentCard = (tournament) => (
    <motion.div
      key={tournament.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all"
    >
      <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative flex items-center justify-center">
        <div className="text-5xl">{tournament.image}</div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            tournament.status === 'live' ? 'bg-red-500 text-white animate-pulse' :
            tournament.status === 'registration' ? 'bg-green-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {tournament.status === 'live' ? 'LIVE' :
             tournament.status === 'registration' ? 'OPEN' :
             'COMPLETED'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70">{tournament.game}</span>
          <span className="text-purple-400 font-bold">{tournament.prizePool}</span>
        </div>
        
        <div className="space-y-2 text-white/60 text-sm mb-4">
          <div className="flex items-center justify-between">
            <span>📅 {tournament.date}</span>
            <span>⏰ {tournament.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>👥 {tournament.participants}/{tournament.maxParticipants}</span>
            <span>🏆 {tournament.type === 'team' ? 'Team' : 'Solo'}</span>
          </div>
          {tournament.currentRound && (
            <div className="text-yellow-400">🔴 {tournament.currentRound}</div>
          )}
          {tournament.winner && (
            <div className="text-green-400">🏆 Winner: {tournament.winner}</div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 font-bold rounded-xl transition-all ${
            tournament.status === 'registration' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
              : tournament.status === 'live'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
          }`}
          disabled={tournament.status !== 'registration'}
        >
          {tournament.status === 'registration' ? 'Register Now' :
           tournament.status === 'live' ? 'Watch Live' :
           'View Results'}
        </motion.button>
      </div>
    </motion.div>
  );

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Tournaments
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Compete in exciting tournaments and win amazing prizes!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Active Tournaments', value: '3', icon: '🏆', color: 'from-green-500 to-emerald-500' },
            { label: 'Total Prize Pool', value: '₹32K', icon: '💰', color: 'from-yellow-500 to-orange-500' },
            { label: 'Participants', value: '221', icon: '👥', color: 'from-blue-500 to-cyan-500' },
            { label: 'Games Featured', value: '6', icon: '🎮', color: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            { id: 'upcoming', name: 'Upcoming', icon: '📅' },
            { id: 'ongoing', name: 'Live Now', icon: '🔴' },
            { id: 'completed', name: 'Completed', icon: '✅' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments[activeTab]?.map(renderTournamentCard)}
        </div>

        {/* Create Tournament Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
          >
            Create Tournament
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Tournaments;
