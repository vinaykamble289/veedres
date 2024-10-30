
// src/styles/StyledComponents.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Layout Components
export const PageContainer = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
`;

// Header Components
export const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  color: #4f46e5;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  
  &:hover {
    color: #4338ca;
  }
`;

// Navigation Components
export const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }
`;

export const Button = styled.button`
  background-color: ${props => props.variant === 'primary' ? '#4f46e5' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#4f46e5'};
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #4f46e5'};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#4338ca' : '#f3f4f6'};
  }
`;

// Dashboard Components
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Card = styled(Link)`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const CardIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${props => props.bgColor || '#4f46e5'};
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
`;

export const CardDescription = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
`;

// Form Components
export const Form = styled.form`
  max-width: 28rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  color: #1f2937;
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

export const ErrorText = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

// Footer Component
export const Footer = styled.footer`
  background-color: white;
  padding: 1.5rem;
  text-align: center;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
`;

// Welcome Section
export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const WelcomeTitle = styled.h1`
  color: #1f2937;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const WelcomeText = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  max-width: 36rem;
  margin: 0 auto;
`;