// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  MainContent,
  WelcomeSection,
  WelcomeTitle,
  WelcomeText,
  DashboardGrid,
  Card,
  CardIcon,
  CardTitle,
  CardDescription
} from '../styles/StyledComponents';
import {
  DocumentTextIcon,
  CalculatorIcon,
  MapIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

const Dashboard = ({ user }) => {
  const features = [
    {
      name: 'Create Resume',
      description: 'Create a powerful resume.',
      icon: DocumentTextIcon,
      link: '/create-resume',
      bgColor: '#3b82f6'
    },
    {
      name: 'ATS Calculator',
      description: 'Check ATS (Applicant Tracking System).',
      icon: CalculatorIcon,
      link: '/ats-calculator',
      bgColor: '#10b981'
    },
    {
      name: 'RoadMap',
      description: 'Follow personalized RoadMap for career development.',
      icon: MapIcon,
      link: '/roadmap',
      bgColor: '#8b5cf6'
    },
    {
      name: 'Current Courses',
      description: 'Manage current courses about skills.',
      icon: AcademicCapIcon,
      link: '/courses',
      bgColor: '#f59e0b'
    },
    {
      name: 'Interview',
      description: 'Schedule interview and apply for new posting.',
      icon: UserGroupIcon,
      link: '/interview',
      bgColor: '#6366f1'
    },
    {
      name: 'Chat with AI',
      description: 'For any queries and Guidance chat with your personalized AI chatbot.',
      icon: ChatBubbleBottomCenterTextIcon,
      link: '/ai-chat',
      bgColor: '#ec4899'
    }
  ];

  return (
    <PageContainer>
      <MainContent>
        <WelcomeSection>
          <WelcomeTitle>Welcome, {user?.name}!</WelcomeTitle>
          <WelcomeText>
            Access all your career development tools in one place
          </WelcomeText>
        </WelcomeSection>

        <DashboardGrid>
          {features.map((feature) => (
            <Card key={feature.name} to={feature.link}>
              <CardIcon bgColor={feature.bgColor}>
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </CardIcon>
              <div>
                <CardTitle>{feature.name}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </Card>
          ))}
        </DashboardGrid>
      </MainContent>
    </PageContainer>
  );
};

export default Dashboard;