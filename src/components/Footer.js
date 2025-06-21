import React from 'react';
import { FiHome, FiTrendingUp, FiList, FiUser } from 'react-icons/fi';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <button className="active">
        <FiHome className="icon" />
        <span>Home</span>
      </button>
      <button>
        <FiTrendingUp className="icon" />
        <span>Markets</span>
      </button>
      <button>
        <FiList className="icon" />
        <span>Orders</span>
      </button>
      <button>
        <FiUser className="icon" />
        <span>Account</span>
      </button>
    </footer>
  );
};

export default Footer;
