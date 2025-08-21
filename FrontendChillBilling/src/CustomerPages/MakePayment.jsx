import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './MakePayment.css';

const initialInvoices = [
  { id: 12345678, date: '01-01-2025', amount: 20000.00, status: 'PP' },
  { id: 12345679, date: '01-01-2025', amount: 999.99, status: 'U' },
  { id: 12345680, date: '01-01-2025', amount: 7000.00, status: 'O' },
  { id: 12345681, date: '01-01-2025', amount: 9100.00, status: 'U' },
  { id: 12345682, date: '01-01-2025', amount: 5000.00, status: 'U' },
];

const statusColor = {
  'PP': 'gold',
  'O': 'red',
  'P': 'green',
  'U': 'orange',
};

const MakePayments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = initialInvoices.filter(({ id, date, amount }) =>
    `${id} ${date} ${amount}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        <div className="navbar-left">
          <span className="emoji-icon">💳</span>
        </div>
        <div className="navbar-right">
          <button className="user-icon">👤Username</button>
          <button className="home-btn" onClick={() => navigate('/')}>Home</button>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </div>

      {/* Body */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li><Link to="profile">Profile</Link></li>
            <li><Link to="invoices">Invoices</Link></li>
            <li className="active"><Link to="make-payment">Make payment</Link></li>
            <li><Link to="payment-history">Payment history</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="invoice-card">
            <div className="invoice-header">
              <h2>Payment Dues</h2>
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map(({ id, date, amount, status }, index) => (
                  <tr key={index}>
                    <td>{id}</td>
                    <td>{date}</td>
                    <td>{amount.toFixed(2)}</td>
                    <td style={{ color: statusColor[status], fontWeight: 'bold' }}>{status}</td>
                    <td>
                  <button className="paynow-btn">Pay now</button>
                    </td>
                  </tr>
                ))}
                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© Chill Billing. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MakePayments;