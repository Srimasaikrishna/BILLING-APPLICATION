import React, { useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.jpg';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  // Refs for each input
  const refs = {
    name: useRef(null),
    username: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    password: useRef(null),
  };

  // Track which field is currently focused
  const [focusedField, setFocusedField] = useState(null);

  const handleEditClick = (field) => {
    setFocusedField(field);
    refs[field].current?.focus();
  };

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
            {[
              { label: 'Name', key: 'name', type: 'text' },
              { label: 'Username', key: 'username', type: 'text' },
              { label: 'Email id', key: 'email', type: 'email' },
              { label: 'Phone No', key: 'phone', type: 'text' },
              { label: 'Password', key: 'password', type: 'password' },
            ].map(({ label, key, type }) => (
              <div className="form-group" key={key}>
                <label>{label} :</label>
                <input
                  type={type}
                  ref={refs[key]}
                  onBlur={() => setFocusedField(null)}
                />
                <span className="edit" onClick={() => handleEditClick(key)}>✎</span>
              </div>
            ))}

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