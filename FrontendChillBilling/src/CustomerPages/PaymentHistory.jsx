import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PaymentHistory.css';
import logo from '../assets/logo2.jpg'; 

const initialPayments = [
  { transactionId: 'T4576575755', date: '01-01-2025', invoiceId: 12345678, amount: 999.99, status: 'Pending' },
  { transactionId: 'T3252487978', date: '01-01-2025', invoiceId: 75858745, amount: 999.99, status: 'Paid' },
  { transactionId: 'T5744578456', date: '01-01-2025', invoiceId: 54567456, amount: 999.99, status: 'Failed' },
];

const statusColor = {
  Pending: 'orange',
  Paid: 'green',
  Failed: 'red',
};

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = initialPayments.filter(({ transactionId, date, invoiceId, amount }) =>
    `${transactionId} ${date} ${invoiceId} ${amount}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <div className="dashboard-navbar">
        <div className="navbar-left">
          <img src={logo} alt="Chill Billing" className="ChillBillingLogo" />
        </div>
        <div className="navbar-right">
          <div className="user-wrapper">
            <span className="user-avatar">👤</span>
            <span className="username">Username</span>
          </div>
          <button className="home-btn" onClick={() => navigate('/')}>Home</button>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </div>

      {/* Body */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/invoices">Invoices</Link></li>
            <li><Link to="/make-payment">Make payment</Link></li>
            <li className="active"><Link to="/payment-history">Payment history</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="payment-card">
            <div className="payment-header">
              <h2>Payments History</h2>
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="filter-box">
                  <span className="filter-icon"></span>
                  <span className="filter-label">Filter</span>
                </div>
              </div>
            </div>
            
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Invoice ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(({ transactionId, date, invoiceId, amount, status }, index) => (
                  <tr key={index}>
                    <td>{transactionId}</td>
                    <td className="highlighted">{date}</td>
                    <td>{invoiceId}</td>
                    <td className="highlighted">{amount.toFixed(2)}</td>
                    <td style={{ color: statusColor[status], fontWeight: 'bold' }}>{status}</td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© Chill Billing. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentHistory;