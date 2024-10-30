// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, CalculatorIcon, MapIcon, AcademicCapIcon, UserGroupIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const Dashboard = ({ user }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    },
    wrapper: {
      maxWidth: '1120px',
      margin: '0 auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#333',
      fontFamily: 'Roboto, sans-serif'
    },
    subtitle: {
      marginTop: '1rem',
      color: '#555',
      fontSize: '1.25rem',
      fontFamily: 'Roboto, sans-serif'
    },
    grid: {
      marginTop: '3rem',
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    card: {
      position: 'relative',
      padding: '1.5rem',
      backgroundColor: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      textDecoration: 'none',
      color: 'inherit'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
    },
    iconWrapper: (bgColor) => ({
      width: '50px',
      height: '50px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: bgColor,
      color: '#fff'
    }),
    cardTitle: {
      marginTop: '1rem',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#333'
    },
    cardDescription: {
      marginTop: '0.5rem',
      color: '#777',
      fontSize: '0.875rem'
    }
  };

  const features = [
    {
      name: 'Create Resume',
      description: 'Create a powerful resume.',
      icon: DocumentTextIcon,
      link: '/create-resume',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'ATS Calculator',
      description: 'Check ATS (Applicant Tracking System).',
      icon: CalculatorIcon,
      link: '/ats-calculator',
      bgColor: 'bg-green-500'
    },
    {
      name: 'RoadMap',
      description: 'Follow personalized RoadMap for career development.',
      icon: MapIcon,
      link: '/roadmap',
      bgColor: 'bg-purple-500'
    },
    {
      name: 'Current Courses',
      description: 'Manage current courses about skills.',
      icon: AcademicCapIcon,
      link: '/courses',
      bgColor: 'bg-yellow-500'
    },
    {
      name: 'Interview',
      description: 'Schedule interview and apply for new posting.',
      icon: UserGroupIcon,
      link: '/interview',
      bgColor: 'bg-indigo-500'
    },
    {
      name: 'Chat with AI',
      description: 'For any queries and Guidance chat with your personalized AI chatbot.',
      icon: ChatBubbleBottomCenterTextIcon,
      link: '/ai-chat',
      bgColor: 'bg-pink-500'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>Welcome, {user?.name}!</h2>
        <p style={styles.subtitle}>
          Access all your career development tools in one place
        </p>

        <div style={{ ...styles.grid, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.link}
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' })}
            >
              <div>
                <span style={styles.iconWrapper(feature.bgColor)}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div>
                <h3 style={styles.cardTitle}>{feature.name}</h3>
                <p style={styles.cardDescription}>{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
