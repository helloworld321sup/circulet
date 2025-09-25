import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  // Mock user data - in real app this would come from Firebase
  const [userData, setUserData] = useState({
    tokens: 500,
    circetsUnlocked: 12,
    friends: [
      { username: 'CirculetMaster', online: true },
      { username: 'TokenHunter', online: false },
      { username: 'CircleCollector', online: true },
    ],
    place: 47,
    totalPlayers: 1247
  });

  // Mock circets collection - these would be fetched from Firebase
  const [ownedCircets, setOwnedCircets] = useState([
    { id: 1, name: 'Common Blue', rarity: 'common', color: '#3498db' },
    { id: 2, name: 'Rare Green', rarity: 'rare', color: '#2ecc71' },
    { id: 3, name: 'Epic Purple', rarity: 'epic', color: '#9b59b6' },
    { id: 4, name: 'Common Red', rarity: 'common', color: '#e74c3c' },
    { id: 5, name: 'Uncommon Orange', rarity: 'uncommon', color: '#f39c12' },
    { id: 6, name: 'Legendary Gold', rarity: 'legendary', color: '#f1c40f' },
  ]);

  const handleTrade = (friendUsername) => {
    alert(`Trade request sent to ${friendUsername}! (Feature coming soon)`);
  };

  const getRarityColor = (rarity) => {
    const colors = {
      common: '#95a5a6',
      uncommon: '#3498db',
      rare: '#2ecc71',
      epic: '#9b59b6',
      legendary: '#f1c40f'
    };
    return colors[rarity] || '#95a5a6';
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">Your Profile</h1>
      
      <div className="stats-grid">
        <div className="stat-card tokens">
          <div className="stat-icon">🪙</div>
          <div className="stat-content">
            <h3>Tokens</h3>
            <div className="stat-value">{userData.tokens.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card circets">
          <div className="stat-icon">⭕</div>
          <div className="stat-content">
            <h3>Circulets Unlocked</h3>
            <div className="stat-value">{userData.circetsUnlocked}</div>
          </div>
        </div>

        <div className="stat-card friends">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Friends</h3>
            <div className="stat-value">{userData.friends.length}</div>
          </div>
        </div>

        <div className="stat-card place">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>Leaderboard Place</h3>
            <div className="stat-value">#{userData.place}</div>
            <div className="stat-subtitle">of {userData.totalPlayers.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <div className="section friends-section">
          <h2>Friends</h2>
          <div className="friends-list">
            {userData.friends.map((friend, index) => (
              <div key={index} className="friend-item">
                <div className="friend-info">
                  <span className={`status-indicator ${friend.online ? 'online' : 'offline'}`}></span>
                  <span className="friend-username">{friend.username}</span>
                </div>
                <button 
                  className="trade-btn"
                  onClick={() => handleTrade(friend.username)}
                >
                  Trade
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="section circulets-section">
          <h2>Your Circulets Collection</h2>
          <div className="circulets-grid">
            {ownedCircets.map((circet) => (
              <div key={circet.id} className="circulet-item">
                <div 
                  className="circulet-circle"
                  style={{ 
                    backgroundColor: circet.color,
                    border: `3px solid ${getRarityColor(circet.rarity)}`
                  }}
                ></div>
                <div className="circulet-info">
                  <div className="circulet-name">{circet.name}</div>
                  <div className={`circulet-rarity ${circet.rarity}`}>
                    {circet.rarity.charAt(0).toUpperCase() + circet.rarity.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
