import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './CustomerDashboard.css';
import logo from '../assets/logo2.jpg';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="dashboard-navbar">
        <div className="logo">
          <img src={logo} alt="Chill Billing Logo" className="ChillBillingLogo" />
        </div>
        <div className="user-controls">
          <span className="username">Username</span>
          <button className="logout-btn" onClick={() => navigate('/Login')}>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="dashboard-body">
        <div className="sidebar">
          <ul>
            <li><Link to="profile">Profile</Link></li>
            <li><Link to="invoices">Invoices</Link></li>
            <li><Link to="make-payment">Make Payment</Link></li>
            <li><Link to="payment-history">Payment History</Link></li>
          </ul>
        </div>

        <div className="main-content">
          <img src={logo} alt="Chill Billing Banner" className="banner-img" />
          <Outlet />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>© Chill Billing. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerDashboard;