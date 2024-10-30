// src/components/CreateResume.js
import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const CreateResume = () => {
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: ''
    },
    summary: '',
    experience: [{ company: '', position: '', duration: '', description: '' }],
    education: [{ institution: '', degree: '', year: '', gpa: '' }],
    skills: ['']
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setResumeData(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    setResumeData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '', gpa: '' }]
    }));
  };

  const removeEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <div>
      <style>
        {`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .tabs {
            display: flex;
            gap: 12px;
            border-bottom: 2px solid #e5e7eb;
            margin-bottom: 16px;
          }
          .tab-button {
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 4px;
            font-weight: 500;
            color: #374151;
          }
          .tab-button.active {
            color: #2563eb;
            background-color: #e0f2fe;
            border: 1px solid #bfdbfe;
          }
          .input-group {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 12px;
          }
          .input-label {
            display: block;
            font-size: 14px;
            color: #374151;
            margin-bottom: 6px;
          }
          .input-field {
            width: 100%;
            padding: 8px;
            font-size: 14px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
          }
          .add-button, .remove-button, .button {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 8px 12px;
            color: #ffffff;
            background-color: #2563eb;
            border-radius: 4px;
            cursor: pointer;
          }
          .remove-button {
            background-color: #dc2626;
          }
          .add-button {
            background-color: #10b981;
          }
          .button {
            background-color: #3b82f6;
            font-weight: 600;
            padding: 10px 16px;
          }
        `}
      </style>

      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'personalInfo' ? 'active' : ''}`}
            onClick={() => handleTabChange('personalInfo')}
          >
            Personal Info
          </button>
          <button
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => handleTabChange('experience')}
          >
            Experience
          </button>
          <button
            className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => handleTabChange('education')}
          >
            Education
          </button>
          <button
            className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => handleTabChange('skills')}
          >
            Skills
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'personalInfo' && (
            <div className="input-group">
              <h3 className="section-title">Personal Information</h3>
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => handleChange('personalInfo', e.target.name, e.target.value)}
                className="input-field"
              />
              {/* Add other personal info fields */}
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <h3 className="section-title">Experience</h3>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="input-group">
                  <label className="input-label">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="input-field"
                  />
                  {/* Other experience fields */}
                  <button onClick={() => removeExperience(index)} className="remove-button mt-2">
                    <TrashIcon className="h-5 w-5 mr-1" /> Remove Experience
                  </button>
                </div>
              ))}
              <button onClick={addExperience} className="add-button mt-4">
                <PlusIcon className="h-5 w-5 mr-1" /> Add Experience
              </button>
            </div>
          )}

          {activeTab === 'education' && (
            <div>
              <h3 className="section-title">Education</h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="input-group">
                  <label className="input-label">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="input-field"
                  />
                  {/* Other education fields */}
                  <button onClick={() => removeEducation(index)} className="remove-button mt-2">
                    <TrashIcon className="h-5 w-5 mr-1" /> Remove Education
                  </button>
                </div>
              ))}
              <button onClick={addEducation} className="add-button mt-4">
                <PlusIcon className="h-5 w-5 mr-1" /> Add Education
              </button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="section-title">Skills</h3>
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="input-field"
                  />
                </div>
              ))}
              <button onClick={addSkill} className="add-button mt-4">
                <PlusIcon className="h-5 w-5 mr-1" /> Add Skill
              </button>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button type="submit" className="button">
              Create Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResume;
