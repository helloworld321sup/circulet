import React from 'react';
import './PlaceholderPage.css';

const Chat = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-icon">💬</div>
        <h1>Chat</h1>
        <p>Connect with other Circulet players!</p>
        <p>Chat with friends, discuss strategies, and show off your collections.</p>
        <div className="feature-list">
          <div className="feature-item">💬 Global Chat</div>
          <div className="feature-item">👥 Friend Messages</div>
          <div className="feature-item">🔄 Trade Discussions</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
