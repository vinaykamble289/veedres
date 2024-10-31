// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css'; // Ensure to create this CSS file or update the path

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
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
          name: formData.username,
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
    <div className="container">
      <div className="login-container">
        <h2>REGISTER</h2>
        <form id="registerForm" onSubmit={handleSubmit}>
          {error && <div className="error-text">{error}</div>}
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          <button type="submit">Register Now</button>
        </form>
        <p>Register with Others</p>
        <button className="social-btn">Register with Google</button>
        <button className="social-btn">Register with Facebook</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="image-container">
        <img src="path/to/your-image.png" alt="Registration Image" />
      </div>
    </div>
  );
};

export default Register;
