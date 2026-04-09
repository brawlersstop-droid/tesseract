import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('achievements');
  const [userRewards, setUserRewards] = useState([]);
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
    // Mock rewards data
    const mockRewards = {
      achievements: [
        {
          id: 1,
          name: 'First Victory',
          description: 'Win your first game',
          icon: '🏆',
          rarity: 'common',
          unlocked: true,
          unlockedAt: '2024-03-15',
          progress: 100,
          xp: 50
        },
        {
          id: 2,
          name: 'Speed Demon',
          description: 'Complete Speed Rush in under 2 minutes',
          icon: '⚡',
          rarity: 'rare',
          unlocked: true,
          unlockedAt: '2024-03-20',
          progress: 100,
          xp: 150
        },
        {
          id: 3,
          name: 'Puzzle Master',
          description: 'Solve 50 puzzles',
          icon: '🧩',
          rarity: 'epic',
          unlocked: false,
          progress: 35,
          total: 50,
          xp: 300
        },
        {
          id: 4,
          name: 'Tournament Champion',
          description: 'Win a tournament',
          icon: '👑',
          rarity: 'legendary',
          unlocked: false,
          progress: 0,
          xp: 500
        },
        {
          id: 5,
          name: 'Social Butterfly',
          description: 'Join 5 events',
          icon: '🦋',
          rarity: 'common',
          unlocked: true,
          unlockedAt: '2024-04-01',
          progress: 100,
          xp: 75
        }
      ],
      badges: [
        {
          id: 1,
          name: 'Top Player',
          description: 'Ranked in top 10',
          icon: '⭐',
          rarity: 'epic',
          unlocked: true,
          unlockedAt: '2024-03-25'
        },
        {
          id: 2,
          name: 'Event Organizer',
          description: 'Hosted an event',
          icon: '📋',
          rarity: 'rare',
          unlocked: false
        },
        {
          id: 3,
          name: 'Community Helper',
          description: 'Helped 10 new players',
          icon: '🤝',
          rarity: 'common',
          unlocked: true,
          unlockedAt: '2024-04-05'
        }
      ],
      rewards: [
        {
          id: 1,
          name: 'Premium Avatar Frame',
          description: 'Exclusive avatar frame for 30 days',
          icon: '🖼️',
          cost: 500,
          category: 'cosmetic',
          purchased: false
        },
        {
          id: 2,
          name: 'Double XP Weekend',
          description: '2x XP for all games this weekend',
          icon: '✨',
          cost: 300,
          category: 'boost',
          purchased: true
        },
        {
          id: 3,
          name: 'Custom Username Color',
          description: 'Stand out with custom colors',
          icon: '🎨',
          cost: 200,
          category: 'cosmetic',
          purchased: false
        },
        {
          id: 4,
          name: 'Tournament Entry Pass',
          description: 'Free entry to any tournament',
          icon: '🎫',
          cost: 400,
          category: 'utility',
          purchased: false
        }
      ]
    };

    setUserRewards(mockRewards);
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

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'from-gray-500 to-gray-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBorder = (rarity) => {
    switch(rarity) {
      case 'common': return 'border-gray-500/30';
      case 'rare': return 'border-blue-500/30';
      case 'epic': return 'border-purple-500/30';
      case 'legendary': return 'border-yellow-500/30';
      default: return 'border-gray-500/30';
    }
  };

  const userXP = 275;
  const userLevel = Math.floor(userXP / 100) + 1;
  const nextLevelXP = (userLevel * 100);
  const currentLevelXP = ((userLevel - 1) * 100);
  const progressToNext = ((userXP - currentLevelXP) / 100) * 100;

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
        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Your Progress</h2>
              <p className="text-white/70">Level {userLevel} • {userXP} XP</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{userXP}</div>
              <div className="text-white/70 text-sm">Total XP</div>
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-4 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <div className="flex justify-between text-white/60 text-sm">
            <span>{currentLevelXP} XP</span>
            <span>{nextLevelXP} XP</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            { id: 'achievements', name: 'Achievements', icon: '🏆', count: userRewards.achievements?.filter(a => a.unlocked).length || 0 },
            { id: 'badges', name: 'Badges', icon: '🎖️', count: userRewards.badges?.filter(b => b.unlocked).length || 0 },
            { id: 'rewards', name: 'Rewards Store', icon: '🛍️', count: userRewards.rewards?.filter(r => r.purchased).length || 0 }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
              {tab.count > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <div>
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRewards.achievements?.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all ${
                    achievement.unlocked ? getRarityBorder(achievement.rarity) : 'border-white/10'
                  } ${!achievement.unlocked && 'opacity-60'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center text-2xl`}>
                      {achievement.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">+{achievement.xp} XP</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        achievement.unlocked 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {achievement.unlocked ? 'Unlocked' : 'Locked'}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{achievement.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{achievement.description}</p>
                  
                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <div>
                      <div className="flex justify-between text-white/60 text-xs mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total || 100}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {achievement.unlocked && (
                    <div className="text-green-400 text-sm">
                      ✨ Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRewards.badges?.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all ${
                    badge.unlocked ? getRarityBorder(badge.rarity) : 'border-white/10'
                  } ${!badge.unlocked && 'opacity-60'}`}
                >
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} flex items-center justify-center text-3xl`}>
                    {badge.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{badge.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{badge.description}</p>
                  <div className={`text-sm font-medium ${
                    badge.unlocked ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {badge.unlocked ? `✨ Earned ${new Date(badge.unlockedAt).toLocaleDateString()}` : '🔒 Locked'}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRewards.rewards?.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all ${
                    reward.purchased ? 'border-green-500/30' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-2xl">
                      {reward.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-yellow-400">{reward.cost} XP</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        reward.purchased 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {reward.purchased ? 'Owned' : 'Available'}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{reward.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{reward.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={reward.purchased || userXP < reward.cost}
                    className={`w-full py-3 font-bold rounded-xl transition-all ${
                      reward.purchased
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : userXP >= reward.cost
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed'
                    }`}
                  >
                    {reward.purchased ? 'Owned' : userXP >= reward.cost ? 'Redeem' : 'Insufficient XP'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
