import React, { useState } from 'react';
import { Loader2, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';

const SkillMatch = ({ skill, hasSkill }) => (
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm">{skill}</span>
    {hasSkill ? 
      <ThumbsUp className="h-4 w-4 text-green-500" /> : 
      <ThumbsDown className="h-4 w-4 text-red-500" />
    }
  </div>
);

const ATSResumeAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parsedAnalysis, setParsedAnalysis] = useState(null);

  const convertPdfToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const parseAnalysisText = (text) => {
    try {
      const strengthsMatch = text.match(/\*\*Strengths:\*\*([\s\S]*?)\*\*Weaknesses:/);
      const weaknessesMatch = text.match(/\*\*Weaknesses:\*\*([\s\S]*?)\*\*Recommendation:/);
      const recommendationMatch = text.match(/\*\*Recommendation:\*\*([\s\S]*?)\*\*Suggestions/);

      const strengths = strengthsMatch[1]
        .split('***')
        .filter(s => s.trim())
        .map(s => s.replace(/\*/g, '').trim());

      const weaknesses = weaknessesMatch[1]
        .split('***')
        .filter(s => s.trim())
        .map(s => s.replace(/\*/g, '').trim());

      const technicalMatch = 100 - (weaknesses.filter(w => w.toLowerCase().includes('technical') || w.toLowerCase().includes('skill')).length * 20);
      const experienceMatch = 100 - (weaknesses.filter(w => w.toLowerCase().includes('experience')).length * 25);
      const educationMatch = strengths.filter(s => s.toLowerCase().includes('academic') || s.toLowerCase().includes('education')).length * 80;
      const overallMatch = Math.round((technicalMatch + experienceMatch + educationMatch) / 3);

      const skills = {
        technical: [
          { name: 'Java Development', hasSkill: !text.toLowerCase().includes('lack of java') },
          { name: 'Distributed Systems', hasSkill: !text.toLowerCase().includes('lack of distributed systems') },
          { name: 'Database Knowledge', hasSkill: text.toLowerCase().includes('database') },
          { name: 'Cloud Technologies', hasSkill: text.toLowerCase().includes('cloud') }
        ],
        soft: [
          { name: 'Communication', hasSkill: text.toLowerCase().includes('communication') },
          { name: 'Teamwork', hasSkill: text.toLowerCase().includes('team') },
          { name: 'Problem Solving', hasSkill: text.toLowerCase().includes('problem solving') },
          { name: 'Project Management', hasSkill: text.toLowerCase().includes('project management') }
        ]
      };

      return {
        overallMatch,
        technicalMatch,
        experienceMatch,
        educationMatch,
        strengths,
        weaknesses,
        skills,
        recommendation: recommendationMatch[1].trim()
      };
    } catch (error) {
      console.error('Error parsing analysis:', error);
      return null;
    }
  };

  const analyzeResume = async (type) => {
    if (!file || !jobDescription) {
      setError('Please provide both a resume and job description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const base64Pdf = await convertPdfToBase64(file);
      
      const prompt = type === 'analyze' 
        ? `You are an experienced Technical Human Resource Manager. Review the provided resume against the job description and provide a detailed analysis in this exact format:
           **Overall Impression:**
           [Overall impression of the candidate]
           
           **Strengths:**
           ***[Strength 1]
           ***[Strength 2]
           [etc.]
           
           **Weaknesses:**
           ***[Weakness 1]
           ***[Weakness 2]
           [etc.]
           
           **Recommendation:**
           [Your recommendation]
           
           **Suggestions for Candidate:**
           ***[Suggestion 1]
           ***[Suggestion 2]
           [etc.]
           
           **Conclusion:**
           [Final thoughts]`
        : `You are an ATS scanner. Evaluate the resume against the job description. Provide percentage matches for technical skills, experience, and education. Structure your response exactly as shown above.`;

      const response = await fetch('http://localhost:6060/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf: base64Pdf,
          jobDescription,
          prompt
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze resume: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysis(result);
      
      const parsed = parseAnalysisText(result.response);
      setParsedAnalysis(parsed);
    } catch (err) {
      setError(err.message);
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">ATS Resume Analyzer</h1>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter job description..."
                className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => analyzeResume('analyze')}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading && <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />}
                Analyze Resume
              </button>
              <button
                onClick={() => analyzeResume('match')}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading && <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />}
                Calculate Match
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {parsedAnalysis && (
              <div className="space-y-6">
                {/* Overall Score Section */}
                <div className="bg-white rounded-lg p-6 border">
                  <h2 className="text-xl font-bold mb-4">Resume Analysis Summary</h2>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Overall Match</span>
                      <span>{parsedAnalysis.overallMatch}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${parsedAnalysis.overallMatch}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Technical Skills</span>
                        <span>{parsedAnalysis.technicalMatch}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${parsedAnalysis.technicalMatch}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Experience</span>
                        <span>{parsedAnalysis.experienceMatch}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${parsedAnalysis.experienceMatch}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Education</span>
                        <span>{parsedAnalysis.educationMatch}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${parsedAnalysis.educationMatch}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border">
                    <h2 className="text-xl font-bold mb-4 text-green-600">Strengths</h2>
                    {parsedAnalysis.strengths.map((strength, index) => (
                      <p key={index} className="mb-2">✓ {strength}</p>
                    ))}
                  </div>

                  <div className="bg-white rounded-lg p-6 border">
                    <h2 className="text-xl font-bold mb-4 text-red-600">Areas for Improvement</h2>
                    {parsedAnalysis.weaknesses.map((weakness, index) => (
                      <p key={index} className="mb-2">⨯ {weakness}</p>
                    ))}
                  </div>
                </div>

                {/* Required Skills Analysis */}
                <div className="bg-white rounded-lg p-6 border">
                  <h2 className="text-xl font-bold mb-4">Required Skills Analysis</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Technical Skills</h3>
                      {parsedAnalysis.skills.technical.map((skill, index) => (
                        <SkillMatch key={index} skill={skill.name} hasSkill={skill.hasSkill} />
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Soft Skills</h3>
                      {parsedAnalysis.skills.soft.map((skill, index) => (
                        <SkillMatch key={index} skill={skill.name} hasSkill={skill.hasSkill} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-white rounded-lg p-6 border">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Final Recommendation
                  </h2>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800">{parsedAnalysis.recommendation}</p>
                  </div>
                </div>
              </div>
            )}

            {analysis && !parsedAnalysis && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
                <div className="whitespace-pre-wrap">{analysis.response}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSResumeAnalyzer;