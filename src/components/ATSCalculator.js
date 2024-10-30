import React, { useState } from 'react';

const ATSCalculator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [score, setScore] = useState(null);
  const [keywords, setKeywords] = useState([]);

  const calculateScore = () => {
    // Simple keyword matching algorithm
    const jdKeywords = jobDescription.toLowerCase().split(/\W+/);
    const resumeKeywords = resume.toLowerCase().split(/\W+/);
    
    const matches = resumeKeywords.filter(word => 
      jdKeywords.includes(word) && word.length > 3
    );
    
    const uniqueMatches = [...new Set(matches)];
    setKeywords(uniqueMatches);
    setScore((uniqueMatches.length / jdKeywords.length * 100).toFixed(1));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">ATS Score Calculator</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              className="w-full h-48 p-3 border border-gray-300 rounded-md"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Resume
            </label>
            <textarea
              className="w-full h-48 p-3 border border-gray-300 rounded-md"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume content here..."
            />
          </div>
          <button
            onClick={calculateScore}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Calculate ATS Score
          </button>
          
          {score !== null && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Results</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-4">{score}% Match</p>
              <div>
                <h4 className="font-medium mb-2">Matched Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSCalculator;