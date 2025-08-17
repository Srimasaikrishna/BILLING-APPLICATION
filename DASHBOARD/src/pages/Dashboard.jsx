import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

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
    <div style={{ width: "100vw", height: "100vh", background: "#D9D9D9" }}>
      {/* Header */}
      <div style={{
        background: "#ece3e3",
        height: "60px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 40px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ display: "flex", alignItems: "center", fontSize: "18px", color: "#444" }}>
            <span style={{
              borderRadius: "50%",
              background: "#d8dbde",
              width: "32px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "8px"
            }}>
              <span role="img" aria-label="user">👤</span>
            </span>
            Username
          </span>
          <button
            style={{
              background: "#fff",
              color: "#000",
              border: "2px solid #ccc",
              borderRadius: "22px",
              fontWeight: "600",
              padding: "8px 24px",
              fontSize: "16px",
              marginLeft: "8px",
              marginRight: "8px",
              boxShadow: "0 0 7px rgba(0,0,0,0.07)",
              cursor: "pointer"
            }}
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button style={{
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "6px 22px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "16px"
          }} onClick={() => alert("Logout clicked")}>Logout</button>
        </div>
      </div>

      {/* Main area */}
      <div style={{ display: "flex", width: "100%", height: "calc(100vh - 60px)" }}>
        {/* Sidebar without logo and app name */}
        <aside style={{
          width: "260px",
          background: "#fff",
          minHeight: "100%",
          borderRight: "2px solid #dedede",
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Sidebar navigation links only */}
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sidebarMenu.map((item) => {
                const active = location.pathname === item.link;
                return (
                  <li
                    key={item.label}
                    style={{
                      borderBottom: "1px solid #ebebeb",
                      background: active ? "#eaf7fc" : "#fff",
                      borderLeft: active ? "5px solid #1888A3" : "5px solid transparent",
                      fontWeight: active ? "700" : "500",
                      padding: "0"
                    }}
                  >
                    <NavLink
                      to={item.link}
                      style={{
                        textDecoration: "none",
                        color: active ? "#1888A3" : "#333",
                        display: "block",
                        padding: "18px 25px"
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content area: nested routes */}
        <main style={{
          flex: 1,
          minHeight: "100%",
          padding: "55px 70px",
          background: "#f5f7fa",
          overflowY: "auto"
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
