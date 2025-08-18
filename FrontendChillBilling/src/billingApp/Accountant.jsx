// Accountant.js
import React from "react";
import "./Account.css";
const Accountant = () => {
  const handleLogout = () => {
    alert("You have logged out!");
  };

  return (
   <>
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-text">Accountant Dashboard</div>
        <nav>
          <ul>
            <li>Manage Customers</li>
            <li>Invoices</li>
            <li>Payments</li>
            <li>Reports</li>
            <li>Profile</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <span className="username">👥 Username</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="center-content">
          <img
            src="" // Add logo URL here
            alt="Chill Billing Logo"
            className="main-logo"
          />
          <h1>CHILL BILLING</h1>
        </section>
      </main>
    </div>
   </>
  );
};

export default Accountant;



