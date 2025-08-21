import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './CustomerDashboard.css';
import logo from '../assets/logo2.jpg';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
  
      <div className="dashboard-navbar">
        <div className="logo">
          <img src={logo} alt="Chill Billing Logo" className="ChillBillingLogo" />
        </div>
        <div className="user-controls">
          <span className="username">Home</span>
          <button className="logout-btn" onClick={() => navigate('/Login')}>
            Logout
          </button>
        </div>
      </div>

      
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
   
          <div className="form">
            <div className="form-group">
              <label>Name :</label>
              <input type="text" />
              <span className="edit">✎</span>
            </div>

            <div className="form-group">
              <label>Username :</label>
              <input type="text" />
              <span className="edit">✎</span>
            </div>

            <div className="form-group">
              <label>Email id :</label>
              <input type="email" />
              <span className="edit">✎</span>
            </div>

            <div className="form-group">
              <label>Phone No :</label>
              <input type="text" />
              <span className="edit">✎</span>
            </div>

            <div className="form-group">
              <label>Password :</label>
              <input type="password" />
              <span className="edit">✎</span>
            </div>

            <button className="save-btn">Save</button>
          </div>

          <Outlet />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>© Chill Billing. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
