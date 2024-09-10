// src/components/FindIn.js
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import ImageRetriever from './ImageRetriever'; 
import ContentRetriever from './ContentRetriever'; 
import TopBar from './TopBar';
import Login from './Login';
import './findIn.css';
import { useNavigate } from 'react-router-dom';

const FindIn = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const location = useLocation();
  const isImageActive = location.pathname === '/';
  const isContentActive = location.pathname === '/content-retriever';

    // Check authentication status on component mount
    useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  if (!isAuthenticated) {
    // Render the login page if not authenticated
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

   // Handle logout and clear authentication state
   const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="findin-container">
       <TopBar onLogout={handleLogout} /> {/* Pass logout handler to TopBar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!isCollapsed && <h2 className="sidebar-title">AI Retrievers</h2>}
          <button className="collapse-btn" onClick={handleCollapse}>
            <FaBars />
          </button>
        </div>
        {!isCollapsed && (
          <div className="sidebar-menu">
            <Link to="/" className={`menu-item ${isImageActive ? 'active' : ''}`}>Image Retriever</Link>
            <Link to="/content-retriever" className={`menu-item ${isContentActive ? 'active' : ''}`}>Content Retriever</Link>
          </div>
        )}
      </aside>
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ImageRetriever />} />
          <Route path="/content-retriever" element={<ContentRetriever />} />
        </Routes>
      </div>
    </div>
  );
};

export default FindIn;
