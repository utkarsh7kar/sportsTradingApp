import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FiStar, FiBell } from 'react-icons/fi';
import cskLogo from '../assets/csk.png';
import chartIcon from '../assets/Icon.png';
import '../styles/Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="icon-group">
          <button className="icon-btn">
            <FiArrowLeft className="icon" />
          </button>
        </div>
        <div className="icon-group">
          <button className="icon-btn">
            <FiStar className="icon" />
          </button>
          <button className="icon-btn">
            <FiBell className="icon" />
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="team-info">
          <img src={cskLogo} alt="CSK Logo" className="logo" />
          <div className="team-details">
            <h1 className="team-name">Chennai Super Kings</h1>
            <p className="volume">$65.2M Vol.</p>
          </div>
        </div>
        <div className="price-info">
          <div className="price-data">
            <p className="current-price">34¢</p>
            <span className="price-change positive">+0.84%</span>
          </div>
          <img src={chartIcon} alt="Chart" className="chart-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
