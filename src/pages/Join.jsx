import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Join = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'player',
    experience: 'beginner',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const roles = [
    { id: 'player', name: 'Player', icon: '🎮', description: 'Join as a game enthusiast' },
    { id: 'developer', name: 'Developer', icon: '💻', description: 'Help us build amazing games' },
    { id: 'designer', name: 'Designer', icon: '🎨', description: 'Create stunning visuals' },
    { id: 'organizer', name: 'Organizer', icon: '📋', description: 'Plan and manage events' }
  ];

  const benefits = [
    { icon: '🚀', title: 'Early Access', description: 'Get exclusive access to new games before anyone else' },
    { icon: '🏆', title: 'Competitions', description: 'Participate in tournaments and win exciting prizes' },
    { icon: '🎓', title: 'Learning', description: 'Learn new skills through workshops and mentorship' },
    { icon: '🌟', title: 'Recognition', description: 'Showcase your talent and get recognized' },
    { icon: '💬', title: 'Community', description: 'Connect with like-minded individuals' },
    { icon: '📈', title: 'Growth', description: 'Develop your skills and grow with us' }
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
              Join <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tesseract</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Become part of our vibrant community of creators, players, and innovators. 
              Your journey starts here!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Join Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Get Started</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Welcome to Tesseract!
                    </h3>
                    <p className="text-white/70">
                      We'll get in touch with you soon with next steps.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        I want to join as
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {roles.map((role) => (
                          <motion.label
                            key={role.id}
                            whileHover={{ scale: 1.02 }}
                            className={`relative cursor-pointer rounded-xl p-4 glass transition-all ${
                              formData.role === role.id ? 'ring-2 ring-purple-400' : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={role.id}
                              checked={formData.role === role.id}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="text-2xl mb-1">{role.icon}</div>
                              <div className="text-white font-medium">{role.name}</div>
                              <div className="text-white/60 text-xs mt-1">{role.description}</div>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Experience Level
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Tell us about yourself (optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                        placeholder="Share your interests, skills, or what you're excited about..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
                    >
                      Join Tesseract
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Why Join Us?</h2>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <div className="text-3xl flex-shrink-0">{benefit.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-white/70 text-sm">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-3">Ready to Start?</h3>
                  <p className="text-white/80 mb-4">
                    Join hundreds of students already part of the Tesseract community. 
                    No matter your skill level, there's a place for you here!
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>👥 500+ Members</span>
                    <span>🎮 10+ Games</span>
                    <span>📅 Weekly Events</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-white/80">
              Got questions? We've got answers!
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              {
                question: "Do I need prior experience to join?",
                answer: "Not at all! We welcome members of all skill levels, from complete beginners to experienced developers and players."
              },
              {
                question: "How much time commitment is required?",
                answer: "It's completely flexible! You can participate as much or as little as you want. Some members join events weekly, others just play games casually."
              },
              {
                question: "Are there any fees to join?",
                answer: "No, Tesseract is completely free to join for all IITM BS students. We believe in making gaming and learning accessible to everyone."
              },
              {
                question: "Can I contribute to game development?",
                answer: "Absolutely! We're always looking for developers, designers, and creative minds to help us build new games and improve existing ones."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Join;
