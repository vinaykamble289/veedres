// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css'; // Ensure to create this CSS file or update the path

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
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

  return (
    <div className="container">
      <div className="login-container">
        <h2>LOGIN</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          {error && <div className="error-text">{error}</div>}
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          <button type="submit">Login Now</button>
        </form>
        <p>Login with Others</p>
        <button className="social-btn">Login with Google</button>
        <button className="social-btn">Login with Facebook</button>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
      <div className="image-container">
        <img src="path/to/your-image.png" alt="Resume Image" />
      </div>
    </div>
  );
};

export default Login;