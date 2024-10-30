// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        const loginResponse = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const loginData = await loginResponse.json();
        
        if (loginResponse.ok) {
          localStorage.setItem('token', loginData.token);
          setIsAuthenticated(true);
          navigate('/dashboard');
        } else {
          setError('Registration successful. Please login.');
          navigate('/login');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <style>
        {`
          .container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f9fafb;
            padding: 3rem 1rem;
          }
          .form-container {
            max-width: 400px;
            width: 100%;
            background: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .error {
            color: #e53e3e;
            text-align: center;
            margin-bottom: 1rem;
          }
          .input {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 0.5rem;
            border: 1px solid #d2d6dc;
            border-radius: 0.375rem;
          }
          .button {
            width: 100%;
            padding: 0.75rem;
            background-color: #4f46e5;
            color: white;
            font-weight: 600;
            border-radius: 0.375rem;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #4338ca;
          }
          .text-center {
            text-align: center;
          }
          .link {
            color: #4f46e5;
          }
        `}
      </style>
      
      <div className="container">
        <div className="form-container">
          <h2 className="text-center text-2xl font-bold">Create your account</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              className="input"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <button type="submit" className="button">Register</button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
