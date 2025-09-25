import React from 'react';
import './Header.css';

const Header = () => {
  // Mock user data - in real app this would come from Firebase
  const userTokens = 500;
  const username = "CirculetAce";

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {/* This could show current page title */}
        </div>
        
        <div className="header-right">
          <div className="token-display">
            <span className="token-icon">🪙</span>
            <span className="token-amount">{userTokens}</span>
          </div>
          
          <div className="user-display">
            <span className="user-icon">👤</span>
            <span className="username">{username}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
