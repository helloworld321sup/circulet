import React from 'react';
import './PlaceholderPage.css';

const Market = () => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-icon">🛒</div>
        <h1>Market</h1>
        <p>The Circulet Market is coming soon!</p>
        <p>Here you'll be able to buy packs and discover new circulets.</p>
        <div className="feature-list">
          <div className="feature-item">📦 Open Circulet Packs</div>
          <div className="feature-item">⭕ Collect Rare Circulets</div>
          <div className="feature-item">🪙 Spend Your Tokens</div>
        </div>
      </div>
    </div>
  );
};

export default Market;
