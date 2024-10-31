import React, { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, Plus, Trash2, Upload } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import './ResumeBuilder.css';

//import { Alert, AlertDescription } from "@/components/ui/alert";

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({
    title: '',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      photo: null
    },
    professionalSummary: '',
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    }],
    education: [{
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }],
    skills: {
      technical: [''],
      soft: [''],
      languages: ['']
    },
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      url: ''
    }]
  });

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Start with your personal details' },
    { number: 2, title: 'Professional Summary', description: 'Write a compelling overview' },
    { number: 3, title: 'Experience', description: 'Add your work history' },
    { number: 4, title: 'Education', description: 'List your academic background' },
    { number: 5, title: 'Skills', description: 'Highlight your expertise' },
    { number: 6, title: 'Certifications', description: 'Add professional credentials' },
    { number: 7, title: 'Review', description: 'Review and finalize' }
  ];

  const handleInputChange = (section, field, value, index = null) => {
    setFormState(prev => {
      if (index !== null && Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (section === 'personalInfo') {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value }
        };
      } else if (section === 'skills') {
        return {
          ...prev,
          skills: { ...prev.skills, [field]: value }
        };
      }
      return { ...prev, [section]: value };
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setFormState(prev => ({
      ...prev,
      [section]: [...prev[section], defaultItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormState(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const addSkill = (category) => {
    setFormState(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], '']
      }
    }));
  };

  const removeSkill = (category, index) => {
    setFormState(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={formState.personalInfo.fullName}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={formState.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded-md"
                  value={formState.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={formState.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <input
                  type="url"
                  className="w-full p-2 border rounded-md"
                  value={formState.personalInfo.linkedin}
                  onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Portfolio</label>
                <input
                  type="url"
                  className="w-full p-2 border rounded-md"
                  value={formState.personalInfo.portfolio}
                  onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Professional Summary</label>
              <textarea
                className="w-full p-2 border rounded-md h-32"
                value={formState.professionalSummary}
                onChange={(e) => handleInputChange('professionalSummary', null, e.target.value)}
                placeholder="Write a compelling summary of your professional background..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {formState.experience.map((exp, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={exp.company}
                        onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Position</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={exp.position}
                        onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={exp.startDate}
                        onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={exp.endDate}
                        onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border rounded-md h-24"
                      value={exp.description}
                      onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="justify-end space-x-2">
                  {formState.experience.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('experience', index)}
                      className="flex items-center text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  )}
                </CardFooter>
              </Card>
            ))}
            <button
              onClick={() => addArrayItem('experience', {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                achievements: ['']
              })}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Experience
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {formState.education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Institution</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={edu.institution}
                        onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Degree</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Field of Study</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={edu.field}
                        onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">GPA</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={edu.gpa}
                        onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end space-x-2">
                  {formState.education.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('education', index)}
                      className="flex items-center text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  )}
                </CardFooter>
              </Card>
            ))}
            <button
              onClick={() => addArrayItem('education', {
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                gpa: ''
              })}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Education
            </button>
          </div>
        );

        case 5:
          return (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formState.skills.technical.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 p-2 border rounded-md"
                          value={skill}
                          onChange={(e) =>
                            handleInputChange('skills', 'technical',
                              formState.skills.technical.map((s, i) => i === index ? e.target.value : s)
                            )
                          }
                        />
                        {formState.skills.technical.length > 1 && (
                          <button
                            onClick={() => removeSkill('technical', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addSkill('technical')}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Technical Skill
                    </button>
                  </div>
                </CardContent>
              </Card>
        
              <Card>
                <CardHeader>
                  <CardTitle>Soft Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formState.skills.soft.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 p-2 border rounded-md"
                          value={skill}
                          onChange={(e) =>
                            handleInputChange('skills', 'soft',
                              formState.skills.soft.map((s, i) => i === index ? e.target.value : s)
                            )
                          }
                        />
                        {formState.skills.soft.length > 1 && (
                          <button
                            onClick={() => removeSkill('soft', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addSkill('soft')}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Soft Skill
                    </button>
                  </div>
                </CardContent>
              </Card>
        
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formState.skills.languages.map((language, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 p-2 border rounded-md"
                          value={language}
                          onChange={(e) =>
                            handleInputChange('skills', 'languages',
                              formState.skills.languages.map((l, i) => i === index ? e.target.value : l)
                            )
                          }
                        />
                        {formState.skills.languages.length > 1 && (
                          <button
                            onClick={() => removeSkill('languages', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addSkill('languages')}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Language
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        
        case 6:
          return (
            <div className="space-y-6">
              {formState.certifications.map((cert, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">Certification {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          value={cert.name}
                          onChange={(e) =>
                            handleInputChange('certifications', 'name', e.target.value, index)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Issuer</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          value={cert.issuer}
                          onChange={(e) =>
                            handleInputChange('certifications', 'issuer', e.target.value, index)
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                          type="date"
                          className="w-full p-2 border rounded-md"
                          value={cert.date}
                          onChange={(e) =>
                            handleInputChange('certifications', 'date', e.target.value, index)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">URL</label>
                        <input
                          type="url"
                          className="w-full p-2 border rounded-md"
                          value={cert.url}
                          onChange={(e) =>
                            handleInputChange('certifications', 'url', e.target.value, index)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end space-x-2">
                    {formState.certifications.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('certifications', index)}
                        className="flex items-center text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              <button
                onClick={() => addArrayItem('certifications', {
                  name: '',
                  issuer: '',
                  date: '',
                  url: ''
                })}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Certification
              </button>
            </div>
          );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-center ${
                currentStep === step.number ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === step.number ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                {currentStep > step.number ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span className="ml-2 hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {renderStepContent()}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => prev - 1)}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentStep === 1
              ? 'invisible'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        
        <button
          onClick={() => setCurrentStep(prev => prev + 1)}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentStep === steps.length
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {currentStep === steps.length ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Finish
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;