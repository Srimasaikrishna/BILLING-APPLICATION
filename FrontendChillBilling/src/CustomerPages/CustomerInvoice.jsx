import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.jpg';
import './CustomerInvoice.css';

const initialInvoices = [
  { id: 12345678, date: '01-01-2025', amount: 999.99, status: 'PP' },
  { id: 12345679, date: '02-01-2025', amount: 499.00, status: 'O' },
  { id: 12345680, date: '03-01-2025', amount: 799.50, status: 'P' },
  { id: 12345681, date: '04-01-2025', amount: 250.75, status: 'U' },
  { id: 12345682, date: '05-01-2025', amount: 1200.00, status: 'U' },
];

const statusColor = {
  'PP': 'yellow',
  'O': 'red',
  'P': 'green',
  'U': 'orange',
};

const CustomerInvoice = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredInvoices = initialInvoices.filter(({ id, date, amount, status }) => {
    const matchesSearch = `${id} ${date} ${amount}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">
 <div className="dashboard-navbar">
  <div className="navbar-left">
    <img src={logo} alt="Chill Billing Logo" className="ChillBillingLogo" />
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
            <li className="active"><Link to="invoices">Invoices</Link></li>
            <li><Link to="make-payment">Make payment</Link></li>
            <li><Link to="payment-history">Payment history</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="invoice-card">
            <div className="invoice-header">
              <h2>My Invoices</h2>
              <div className="filter-bar">
                <div className="search-wrapper">
                  <span className="search-icon"></span>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="PP">PP</option>
                  <option value="O">O</option>
                  <option value="P">P</option>
                  <option value="U">U</option>
                </select>
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
                    <td>₹{amount.toFixed(2)}</td>
                    <td style={{ color: statusColor[status], fontWeight: 'bold' }}>{status}</td>
                    <td>
                      <button className="view-btn">view</button>
                      <button className="download-btn">download</button>
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

export default CustomerInvoice;