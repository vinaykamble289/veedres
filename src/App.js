// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateResume from './components/CreateResume';
import ATSCalculator from './components/ATSCalculator';
import Roadmap from './components/Roadmap';
import Courses from './components/Courses';
import Interview from './components/Interview';
import AIChat from './components/AIChat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user data using token
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/create-resume" element={isAuthenticated ? <CreateResume /> : <Navigate to="/login" />} />
          <Route path="/ats-calculator" element={isAuthenticated ? <ATSCalculator /> : <Navigate to="/login" />} />
          <Route path="/roadmap" element={isAuthenticated ? <Roadmap /> : <Navigate to="/login" />} />
          <Route path="/courses" element={isAuthenticated ? <Courses /> : <Navigate to="/login" />} />
          <Route path="/interview" element={isAuthenticated ? <Interview /> : <Navigate to="/login" />} />
          <Route path="/ai-chat" element={isAuthenticated ? <AIChat /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;