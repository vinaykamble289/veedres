// src/components/Roadmap.js
import React from 'react';
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Roadmap = () => {
  const roadmapSteps = [
    {
      title: 'Foundation',
      completed: true,
      tasks: ['Create Resume', 'LinkedIn Profile Setup', 'Basic Portfolio']
    },
    {
      title: 'Skill Development',
      completed: false,
      tasks: ['Technical Skills', 'Soft Skills Training', 'Certifications']
    },
    {
      title: 'Job Search',
      completed: false,
      tasks: ['Company Research', 'Network Building', 'Application Strategy']
    },
    {
      title: 'Interview Prep',
      completed: false,
      tasks: ['Mock Interviews', 'Technical Practice', 'Company Research']
    }
  ];

  return (
    <div>
      <style>
        {`
          .container {
            min-height: 100vh;
            background-color: #f3f4f6;
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
          }
          .roadmap-container {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            overflow-x: auto;
          }
          .roadmap-step {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border: 4px solid #d1d5db;
            min-width: 200px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .roadmap-step.completed {
            border-color: #10b981;
            background-color: #e6fffa;
          }
          .step-title {
            font-size: 1.25rem;
            font-weight: 600;
            text-align: center;
            color: #1f2937;
          }
          .completed-icon {
            color: #10b981;
            margin-bottom: 0.5rem;
          }
          .incomplete-icon {
            color: #d1d5db;
            margin-bottom: 0.5rem;
          }
          .task {
            display: flex;
            align-items: center;
            color: #4b5563;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }
          .connector {
            display: flex;
            align-items: center;
            font-size: 0;
          }
          .connector::before {
            content: '';
            width: 2rem;
            height: 4px;
            background-color: #d1d5db;
          }
        `}
      </style>

      <div className="container">
        <div className="roadmap-container">
          {roadmapSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={`roadmap-step ${step.completed ? 'completed' : ''}`}>
                <CheckCircleIcon
                  className={`${step.completed ? 'completed-icon' : 'incomplete-icon'} h-8 w-8`}
                />
                <h3 className="step-title">{step.title}</h3>
                <div className="mt-2 space-y-2">
                  {step.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="task">
                      <ChevronRightIcon className="task-icon h-4 w-4 text-gray-400" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
              {index < roadmapSteps.length - 1 && <div className="connector" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
