import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { BookOpen, Brain, Briefcase, ChevronRight, Layout, Server } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:6969/api';

const AiRoadmapGenerator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);

  // Fetch saved roadmaps
  useEffect(() => {
    fetchSavedRoadmaps();
  }, []);

  const fetchSavedRoadmaps = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roadmaps`);
      setSavedRoadmaps(response.data);
    } catch (err) {
      console.error('Error fetching roadmaps:', err);
    }
  };

  // Generate new roadmap
  const generateAIRoadmap = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${API_BASE_URL}/generate-roadmap`, {
        jobDescription,
        careerGoal,
        experienceLevel: experience
      });

      setGeneratedRoadmap(response.data);
      await fetchSavedRoadmaps(); // Refresh the list of saved roadmaps
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Learning Roadmap Generator</h1>
      
      {/* Input Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Your Personalized Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <textarea
                className="w-full p-3 border rounded-md"
                rows="4"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Career Goal</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md"
                placeholder="e.g., Frontend Developer, Full Stack Developer..."
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Experience Level</label>
              <select
                className="w-full p-3 border rounded-md"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <button
              className={`w-full p-3 rounded-md text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={generateAIRoadmap}
              disabled={loading || !jobDescription || !careerGoal}
            >
              {loading ? 'Generating Roadmap...' : 'Generate Personalized Roadmap'}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Roadmaps */}
      {savedRoadmaps.length > 0 && !generatedRoadmap && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Previously Generated Roadmaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedRoadmaps.map((roadmap) => (
                <div
                  key={roadmap._id}
                  className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => setGeneratedRoadmap(roadmap)}
                >
                  <h3 className="font-medium">{roadmap.title}</h3>
                  <p className="text-sm text-gray-500">{roadmap.careerGoal} • {roadmap.timeEstimate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Roadmap */}
      {generatedRoadmap && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Roadmap Overview */}
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  {generatedRoadmap.title}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedRoadmap.nodes.map((node, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-md cursor-pointer transition-colors
                      ${selectedNode?.id === node.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{node.title}</h3>
                        <p className="text-sm text-gray-500">{node.timeEstimate}</p>
                      </div>
                      <ChevronRight className="ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Node Details */}
          {selectedNode && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedNode.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" /> Skills to Learn
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Recommended Courses
                    </h3>
                    <div className="space-y-3">
                      {selectedNode.courses.map((course, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-gray-500">
                            {course.provider} • {course.duration} • {course.level}
                          </p>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">Topics:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {course.topics.map((topic, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Practice Projects
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedNode.projects.map((project, index) => (
                        <li key={index} className="text-sm text-gray-700">{project}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AiRoadmapGenerator;