// src/components/Courses.js
import React from 'react';
import { BookOpenIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const Courses = () => {
  const courses = [
    {
      title: 'Web Development Fundamentals',
      progress: 75,
      duration: '8 weeks',
      rating: 4.5,
      enrolled: true
    },
    {
      title: 'Data Structures & Algorithms',
      progress: 30,
      duration: '12 weeks',
      rating: 4.8,
      enrolled: true
    },
    {
      title: 'System Design',
      progress: 0,
      duration: '10 weeks',
      rating: 4.7,
      enrolled: false
    }
  ];

  return (
    <div>
      <style>
        {`
          .container {
            min-height: 100vh;
            background-color: #f9fafb;
            padding: 48px 32px;
          }
          .header {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 32px;
            text-align: center;
            color: #111827;
          }
          .course-card {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 32px;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .course-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .course-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #1f2937;
          }
          .progress-label {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            color: #4b5563;
          }
          .progress-bar {
            width: 100%;
            background-color: #e5e7eb;
            border-radius: 9999px;
            height: 10px;
            margin: 8px 0;
          }
          .progress {
            background-color: #2563eb;
            height: 10px;
            border-radius: 9999px;
            width: 0;
            transition: width 0.4s ease;
          }
          .course-details {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            color: #6b7280;
          }
          .enroll-button {
            width: 100%;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            margin-top: auto;
            transition: background-color 0.2s;
            cursor: pointer;
          }
          .enroll-button.enrolled {
            background-color: #d1fae5;
            color: #065f46;
          }
          .enroll-button:not(.enrolled) {
            background-color: #2563eb;
            color: #ffffff;
          }
          .enroll-button:hover:not(.enrolled) {
            background-color: #3b82f6;
          }
        `}
      </style>

      <div className="container">
        <h2 className="header">My Courses</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="course-title">{course.title}</h3>
                <BookOpenIcon className="h-8 w-8 text-indigo-500" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="progress-label">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="course-details">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 mr-1 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <button
                  className={`enroll-button ${course.enrolled ? 'enrolled' : ''}`}
                >
                  {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
