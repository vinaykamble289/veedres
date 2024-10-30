import React, { useState } from 'react';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

const Interview = () => {
  const [interviews, setInterviews] = useState([
    {
      company: 'Tech Corp',
      role: 'Senior Developer',
      date: '2024-11-15',
      time: '14:00',
      type: 'Technical',
      status: 'Scheduled'
    }
  ]);

  const [newInterview, setNewInterview] = useState({
    company: '',
    role: '',
    date: '',
    time: '',
    type: 'Technical',
    status: 'Scheduled'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setInterviews([...interviews, newInterview]);
    setNewInterview({
      company: '',
      role: '',
      date: '',
      time: '',
      type: 'Technical',
      status: 'Scheduled'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Interview Schedule</h2>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Schedule New Interview</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Company"
                className="w-full p-2 border border-gray-300 rounded"
                value={newInterview.company}
                onChange={(e) => setNewInterview({...newInterview, company: e.target.value})}
              />
              <input
                type="text"
                placeholder="Role"
                className="w-full p-2 border border-gray-300 rounded"
                value={newInterview.role}
                onChange={(e) => setNewInterview({...newInterview, role: e.target.value})}
              />
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={newInterview.date}
                onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
              />
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded"
                value={newInterview.time}
                onChange={(e) => setNewInterview({...newInterview, time: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Schedule Interview
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {interviews.map((interview, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{interview.company}</h3>
                  <p className="text-gray-600">{interview.role}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  {interview.status}
                </span>
              </div>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{interview.date} {interview.time}</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  <span>{interview.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;
