import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const GameTemplate = () => {
  const { gameId } = useParams();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
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

  // Mock game data - in real app, this would come from API
  const gameData = {
    1: {
      name: 'Puzzle Master',
      description: 'Challenge your mind with intricate puzzles',
      category: 'puzzle',
      difficulty: 3,
      icon: '🧩',
      duration: '5-10 min'
    },
    2: {
      name: 'Speed Rush',
      description: 'Test your reflexes in this fast-paced action game',
      category: 'action',
      difficulty: 4,
      icon: '⚡',
      duration: '3-5 min'
    },
    3: {
      name: 'Strategy Quest',
      description: 'Build your empire and outsmart your opponents',
      category: 'strategy',
      difficulty: 5,
      icon: '♟️',
      duration: '15-20 min'
    }
  };

  const game = gameData[gameId] || gameData[1];

  useEffect(() => {
    let timer;
    if (isPlaying && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleGameOver();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, isPaused, timeLeft]);

  const handleGameOver = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  const restartGame = () => {
    startGame();
  };

  const exitGame = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setGameOver(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: 'from-green-500 to-emerald-500',
      2: 'from-blue-500 to-cyan-500',
      3: 'from-yellow-500 to-orange-500',
      4: 'from-orange-500 to-red-500',
      5: 'from-red-500 to-pink-500'
    };
    return colors[difficulty] || colors[3];
  };

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

      {/* Game Header */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <Link to="/games">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                  <span>{game.icon}</span>
                  <span>{game.name}</span>
                </h1>
                <p className="text-white/70">{game.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(game.difficulty)} text-white text-sm font-semibold rounded-full`}>
                Level {game.difficulty}
              </div>
              <div className="text-white/70 text-sm">
                {game.duration}
              </div>
            </div>
          </motion.div>

          {/* Game Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-8 border border-white/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-white/70 text-sm mb-1">Score</div>
                <motion.div
                  key={score}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-white"
                >
                  {score.toLocaleString()}
                </motion.div>
              </div>
              <div className="text-center">
                <div className="text-white/70 text-sm mb-1">Time</div>
                <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/70 text-sm mb-1">High Score</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {highScore.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/70 text-sm mb-1">Status</div>
                <div className={`text-2xl font-bold ${
                  isPlaying ? 'text-green-400' : 
                  isPaused ? 'text-yellow-400' : 
                  gameOver ? 'text-red-400' : 'text-white'
                }`}>
                  {isPlaying ? 'Playing' : isPaused ? 'Paused' : gameOver ? 'Game Over' : 'Ready'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Game Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 min-h-[500px] relative overflow-hidden border border-white/20"
          >
            <AnimatePresence mode="wait">
              {!isPlaying && !gameOver && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[400px]"
                >
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl mb-6"
                  >
                    {game.icon}
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Play?</h2>
                  <p className="text-white/70 text-center max-w-md mb-8">
                    Get ready to challenge yourself in {game.name}. 
                    Test your skills and see how high you can score!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    Start Game
                  </motion.button>
                </motion.div>
              )}

              {isPlaying && (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-[400px]"
                >
                  <div className="text-center">
                    <div className="text-8xl mb-6 animate-bounce">{game.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Game in Progress</h3>
                    <p className="text-white/70 mb-8">
                      This is where the actual game would be implemented.
                      For now, enjoy the demo interface!
                    </p>
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={pauseGame}
                        className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
                      >
                        {isPaused ? 'Resume' : 'Pause'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setScore(score + 100)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
                      >
                        Add Points (Demo)
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {gameOver && (
                <motion.div
                  key="gameover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-[400px]"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6">🏆</div>
                    <h3 className="text-3xl font-bold text-white mb-4">Game Over!</h3>
                    <div className="mb-6">
                      <p className="text-white/70 mb-2">Final Score</p>
                      <p className="text-5xl font-bold text-yellow-400">{score.toLocaleString()}</p>
                      {score === highScore && score > 0 && (
                        <p className="text-green-400 font-semibold mt-2">New High Score! 🎉</p>
                      )}
                    </div>
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={restartGame}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                      >
                        Play Again
                      </motion.button>
                      <Link to="/games">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
                        >
                          Exit Game
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
                  animate={{
                    x: [0, 100, -100, 0],
                    y: [0, -100, 100, 0],
                    scale: [1, 1.5, 0.8, 1],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Game Controls */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-8 space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseGame}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartGame}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                Restart
              </motion.button>
              <Link to="/games">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exitGame}
                  className="px-6 py-3 bg-white/10 border border-red-500/30 text-red-400 font-semibold rounded-full hover:bg-red-500/20 transition-all"
                >
                  Exit Game
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GameTemplate;
