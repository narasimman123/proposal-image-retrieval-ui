import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey, faUnlock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication check
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Save authentication state
      navigate('/'); // Redirect to the home page after successful login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2><FontAwesomeIcon icon={faKey} className="heading-icon" /> Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">
            Login <FontAwesomeIcon className="button-icon"  icon={faSignInAlt}/> 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
