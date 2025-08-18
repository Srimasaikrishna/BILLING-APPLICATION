import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import './Dashboard.css';

const sidebarMenu = [
  { label: "User Management", link: "/user-management" },
  { label: "Customer Management", link: "/customer-management" },
  { label: "Product/Service Catalog", link: "/product-catalog" },
  { label: "Invoice Management", link: "/invoice-management" },
  { label: "Payment Tracking", link: "/payment-tracking" },
  { label: "Reporting & Analytics", link: "/reports" }
];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <span className="user-info">
            <span className="user-avatar" role="img" aria-label="user">👤</span>
            Username
          </span>
          <button className="home-btn" onClick={() => navigate("/")}>Home</button>
          <button className="logout-btn" onClick={() => alert("Logout clicked")}>Logout</button>
        </div>
      </div>

      {/* Main Area */}
      <div className="dashboard-main">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav>
            <ul className="sidebar-nav">
              {sidebarMenu.map((item) => {
                const active = location.pathname === item.link;
                return (
                  <li
                    key={item.label}
                    className={`sidebar-item ${active ? "active" : ""}`}
                  >
                    <NavLink
                      to={item.link}
                      className={`sidebar-link ${active ? "active" : ""}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <Welcome />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
