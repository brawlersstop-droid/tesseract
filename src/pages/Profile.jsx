import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    skills: '',
    interests: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {
      fullName: 'John Doe',
      email: 'john.doe@ds.study.iitm.ac.in',
      studentId: 'BS20231234',
      role: 'member',
      joinedAt: '2024-01-15T10:30:00Z',
      avatar: '👤',
      bio: 'Passionate about game development and competitive programming.',
      skills: 'JavaScript, React, Python, Game Development',
      interests: 'Competitive Programming, Game Design, UI/UX',
      socialLinks: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe'
      }
    };
    setUser(userData);
    setFormData({
      fullName: userData.fullName || '',
      bio: userData.bio || '',
      skills: userData.skills || '',
      interests: userData.interests || '',
      socialLinks: userData.socialLinks || { github: '', linkedin: '', twitter: '' }
    });
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('socialLinks.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      setLoading(false);
    }, 1000);
  };

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
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9]
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 glass text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl">
                {user?.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{user?.fullName}</h2>
                <div className="flex items-center space-x-4 text-white/60">
                  <span>📧 {user?.email}</span>
                  <span>🆔 {user?.studentId}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user?.role === 'member' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {user?.role === 'member' ? 'Member' : 'Guest'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Basic Information */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none disabled:opacity-50"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Skills & Interests */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Skills & Interests</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                    placeholder="e.g., JavaScript, React, Python, Game Development"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Interests</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                    placeholder="e.g., Competitive Programming, Game Design, UI/UX"
                  />
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Social Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">GitHub</label>
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Twitter</label>
                  <input
                    type="url"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 glass text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </motion.div>

            {/* Account Information */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass rounded-xl">
                  <div>
                    <div className="text-white font-medium">Email Address</div>
                    <div className="text-white/60 text-sm">{user?.email}</div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 glass rounded-xl">
                  <div>
                    <div className="text-white font-medium">Student ID</div>
                    <div className="text-white/60 text-sm">{user?.studentId}</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                    IITM BS
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 glass rounded-xl">
                  <div>
                    <div className="text-white font-medium">Member Since</div>
                    <div className="text-white/60 text-sm">
                      {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 glass text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-3 btn-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all btn-hover disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
