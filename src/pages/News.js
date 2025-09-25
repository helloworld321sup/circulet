import React from 'react';
import './PlaceholderPage.css';

const News = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-icon">📰</div>
        <h1>News</h1>
        <p>Stay updated with the latest Circulet news!</p>
        <p>Game updates, new circulets, and community events will be posted here.</p>
        <div className="feature-list">
          <div className="feature-item">🎮 Game Updates</div>
          <div className="feature-item">⭕ New Circulet Releases</div>
          <div className="feature-item">🎉 Community Events</div>
        </div>
      </div>
    </div>
  );
};

export default News;
