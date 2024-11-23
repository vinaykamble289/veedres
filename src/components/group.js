import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Briefcase, Users, Award, 
  Search, Bell, Menu, X, ChevronRight,
  Building, Bookmark, Clock, MapPin
} from 'lucide-react';

// Navbar Component
const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JobConnect</span>
            </Link>
            <div className="hidden md:flex md:ml-10 space-x-8">
              <Link className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md" to="/jobs">Find Jobs</Link>
              <Link className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md" to="/companies">Companies</Link>
              <Link className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md" to="/resources">Resources</Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">JD</span>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-gray-900">Sign in</Link>
                <Link to="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Dashboard Component
const Dashboard = ({ user }) => {
  const stats = [
    { label: 'Applied Jobs', value: '24', trend: '+5', icon: Briefcase },
    { label: 'Interviews', value: '8', trend: '+2', icon: Users },
    { label: 'Profile Views', value: '143', trend: '+12%', icon: Award }
  ];

  const recentJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full-time'
    },
    {
      title: 'UX Designer',
      company: 'DesignHub',
      location: 'Remote',
      salary: '$90k - $120k',
      type: 'Full-time'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}</h1>
          <p className="mt-1 text-sm text-gray-500">Here's what's happening with your job search</p>
        </header>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-indigo-600" />
                <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Job Matches</h2>
                <div className="mt-4 space-y-4">
                  {recentJobs.map((job, index) => (
                    <div key={index} className="p-4 border border-gray-100 rounded-lg hover:border-indigo-100 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-700">
                          <Bookmark className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Technical Interview</h3>
                        <p className="text-sm text-gray-600">TechCorp</p>
                      </div>
                      <Clock className="h-5 w-5 text-indigo-600" />
                    </div>
                    <p className="mt-2 text-sm text-indigo-600">Tomorrow at 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Component
const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Briefcase className="mx-auto h-12 w-12 text-indigo-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navbar, Dashboard, Login };