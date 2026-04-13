import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import GameTemplate from './pages/GameTemplate';
import Join from './pages/Join';
import About from './pages/About';
import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Membership from './pages/Membership';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Tournaments from './pages/Tournaments';
import './App.css';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <div className="App">
            <Navbar />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:gameId/play" element={<GameTemplate />} />
                <Route path="/game/:gameId" element={<GameTemplate />} />
                <Route path="/join" element={<Join />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/tournaments" element={<Tournaments />} />
              </Routes>
            </motion.div>
          </div>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
