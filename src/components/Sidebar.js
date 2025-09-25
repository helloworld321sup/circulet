import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/profile', label: 'Stats', icon: '📊', enabled: true },
    { path: '/market', label: 'Market', icon: '🛒', enabled: false },
    { path: '/news', label: 'News', icon: '📰', enabled: false },
    { path: '/chat', label: 'Chat', icon: '💬', enabled: false },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">circulet</h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.enabled ? item.path : '#'}
            className={`nav-item ${
              location.pathname === item.path ? 'active' : ''
            } ${!item.enabled ? 'disabled' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {!item.enabled && <span className="coming-soon">Soon</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-section">
          <button className="upgrade-btn" disabled>
            + Upgrade to Plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
