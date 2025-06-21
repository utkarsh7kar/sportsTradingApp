import React, { useState } from 'react';
import { FiInfo, FiChevronDown } from 'react-icons/fi';
import '../styles/TradingInterface.scss';

const TradingInterface = ({ midPrice, currentPrice, priceChange, shares, setShares, placeOrder, sliderValue, setSliderValue}) => {
  const [activeTab, setActiveTab] = useState('buy');
  
  const handleSharesChange = (e) => {
    setShares(parseInt(e.target.value) || 0);
  };
  
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    // Calculate shares based on slider percentage
    const maxShares = 1000; // Example max shares
    setShares(Math.floor(maxShares * (value / 100)));
  };
  
  const calculateOrderTotal = () => {
    return shares > 0 ? `$${(parseFloat(midPrice) * shares / 100).toFixed(2)}` : '$0';
  };

  const calculateToWin = () => {
    return shares > 0 ? `$${(parseFloat(midPrice) * shares * 0.9 / 100).toFixed(2)}` : '$0'; // 10% fee
  };

  return (
    <div className="trading-interface">
      <div className="trading-tabs">
        <div 
          className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
          onClick={() => setActiveTab('buy')}
        >
          BUY/LONG
        </div>
        <div 
          className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
          onClick={() => setActiveTab('sell')}
        >
          SELL/SHORT
        </div>
      </div>
      
      <div className="limit-row">
        <div className="limit-info">
          <FiInfo className="info-icon" />
          <span>Limit</span>
          
        </div>
        <FiChevronDown className="down-icon" />
      </div>
      
      <div className="balance-row">
        <span className="balance-label">Available to Trade</span>
        <span className="balance-value">0.00 USDC</span>
      </div>
      
      <div className="form-row price-row">
        <label>Price (USD)</label>
        <div className="price-value">
          <span>{midPrice}</span>
          <span className="mid-label">Mid</span>
        </div>
      </div>
      
      <div className="form-row">
        <label>Shares</label>
        <input 
          type="number" 
          value={shares} 
          onChange={handleSharesChange}
          placeholder="0"
        />
      </div>
      
      <div className="slider-container">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderValue} 
          onChange={handleSliderChange}
        />
        <div className="percentage">{sliderValue} %</div>
      </div>
      <div className="slider-divider" />
      
      <div className="calculation-row">
        <label>Order Total</label>
        <span className="value">{calculateOrderTotal()}</span>
      </div>
      
      <div className="calculation-row">
        <label>To Win 💰</label>
        <span className="value">{calculateToWin()}</span>
      </div>
      
      <button 
        className="place-order-btn"
        onClick={placeOrder}
        disabled={shares <= 0}
      >
        {activeTab === 'buy' ? 'BUY/LONG CSK' : 'SELL/SHORT CSK'}
      </button>
    </div>
  );
};

export default TradingInterface;
