import React from "react";

export default function Sidebar() {
  return (
    <div
      style={{
        minWidth: "250px",
        background: "#fff",
        borderRight: "1px solid #eee",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* LOGO SECTION with background strip */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "20px 0",
          background: "#F2E1E1", // soft pink background like Figma
          borderBottom: "1px solid #ddd",
        }}
      >
        <img
          src="/logo2.png" // ✅ rename file (no spaces)
          alt="Chill Billing"
          style={{
            height: "80px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Sidebar content */}
      <nav style={{ width: "100%", marginTop: "20px" }}>
        <ul style={{ listStyle: "none", padding: "0 15px", margin: 0 }}>
          <li style={menuItemStyle}>User Management</li>
          <li style={menuItemStyle}>Customer Management</li>
          <li style={menuItemStyle}>Product/Service Catalog</li>
          <li style={menuItemStyle}>Invoice Management</li>
          <li style={menuItemStyle}>Payment Tracking</li>
          <li style={menuItemStyle}>Reporting & Analytics</li>
        </ul>
      </nav>
    </div>
  );
}

// ✅ Extracted common styles for menu items
const menuItemStyle = {
  padding: "12px 10px",
  cursor: "pointer",
  borderRadius: "6px",
  marginBottom: "5px",
  transition: "background 0.3s",
};

