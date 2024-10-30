// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb', // Gray-50
      padding: '3rem 1rem'
    },
    formContainer: {
      maxWidth: '28rem',
      width: '100%',
      spaceY: '2rem',
      textAlign: 'center'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '800',
      color: '#111827' // Gray-900
    },
    errorText: {
      color: '#ef4444', // Red-500
      textAlign: 'center'
    },
    input: {
      appearance: 'none',
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #d1d5db', // Gray-300
      color: '#1f2937', // Gray-900
      borderRadius: '0.375rem',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      ':focus': {
        borderColor: '#6366f1', // Indigo-500
        outline: '2px solid #6366f1'
      }
    },
    submitButton: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: '#4f46e5', // Indigo-600
      color: '#fff',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      border: 'none',
      ':hover': {
        backgroundColor: '#4338ca' // Indigo-700
      },
      ':focus': {
        outline: '2px solid #6366f1'
      }
    },
    registerLink: {
      fontSize: '0.875rem',
      color: '#4f46e5', // Indigo-600
      textDecoration: 'none',
      transition: 'color 0.2s',
      ':hover': {
        color: '#6366f1' // Indigo-500
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign in to your account</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          {error && <div style={styles.errorText}>{error}</div>}
          <div>
            <input
              type="email"
              required
              style={styles.input}
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              required
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.submitButton[':hover'].backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            Sign in
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={styles.registerLink}
              onMouseEnter={(e) => (e.target.style.color = styles.registerLink[':hover'].color)}
              onMouseLeave={(e) => (e.target.style.color = styles.registerLink.color)}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
