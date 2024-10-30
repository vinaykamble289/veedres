// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const styles = {
    nav: {
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '0 1rem'
    },
    container: {
      maxWidth: '1120px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      height: '4rem',
      alignItems: 'center'
    },
    brand: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#4f46e5', // Indigo-600
      textDecoration: 'none'
    },
    link: {
      color: '#4b5563', // Gray-600
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    linkHover: {
      color: '#111827' // Gray-900
    },
    button: {
      backgroundColor: '#4f46e5',
      color: '#fff',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      textDecoration: 'none',
      transition: 'background-color 0.2s'
    },
    buttonHover: {
      backgroundColor: '#4338ca' // Indigo-700
    },
    icon: {
      height: '2rem',
      width: '2rem',
      color: '#9ca3af' // Gray-400
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div>
          <Link to="/" style={styles.brand}>
            VeedRes
          </Link>
        </div>

        <div>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={handleLogout}
                style={styles.link}
                onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
              >
                Logout
              </button>
              <UserCircleIcon style={styles.icon} />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link
                to="/login"
                style={styles.link}
                onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
