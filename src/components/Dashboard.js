import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Calculator, Map, GraduationCap, 
  Users, MessageCircle, Sun, Moon, ChevronRight,
  Sparkles, Activity
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      name: 'Create Resume',
      description: 'Build a professional resume that stands out',
      icon: FileText,
      link: '/create-resume',
      gradient: 'from-pink-500 to-rose-500',
      stats: '2.5k+ created'
    },
    {
      name: 'ATS Calculator',
      description: 'Optimize your resume for ATS systems',
      icon: Calculator,
      link: '/ats-calculator',
      gradient: 'from-violet-500 to-purple-500',
      stats: '98% success rate'
    },
    {
      name: 'Career RoadMap',
      description: 'Plan your career progression',
      icon: Map,
      link: '/roadmap',
      gradient: 'from-blue-500 to-indigo-500',
      stats: 'Trending'
    },
    {
      name: 'Skill Courses',
      description: 'Enhance your professional skills',
      icon: GraduationCap,
      link: '/courses',
      gradient: 'from-emerald-500 to-teal-500',
      stats: '50+ courses'
    },
    {
      name: 'Interview Prep',
      description: 'Practice and prepare for interviews',
      icon: Users,
      link: '/interview',
      gradient: 'from-orange-500 to-amber-500',
      stats: 'Live practice'
    },
    {
      name: 'AI Assistant',
      description: 'Get personalized career guidance',
      icon: MessageCircle,
      link: '/ai-chat',
      gradient: 'from-cyan-500 to-blue-500',
      stats: '24/7 support'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 pointer-events-none" />
      
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-xl shadow-lg z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl transform group-hover:rotate-6 transition-all duration-300" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-bounce" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                VeedRes
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500/10 to-pink-500/10 backdrop-blur-lg">
                <Activity className="w-5 h-5 text-violet-500 inline mr-2" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-violet-100 text-violet-600'
                } hover:scale-110`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h1 className={`text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, {user?.name || 'Guest'}! ✨
            </h1>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Your career development journey continues here
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={feature.name}
                to={feature.link}
                className={`group relative overflow-hidden rounded-2xl p-8 ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="mt-6">
                    <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      {feature.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${feature.gradient} text-white`}>
                        {feature.stats}
                      </span>
                      <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} group-hover:translate-x-2 transition-transform duration-300`} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;