import React from "react";
import { useNavigate } from "react-router-dom";
// Import your uploaded logo (place the file in src/assets or public folder)
import logo from "../assets/logo.png";   // adjust path as needed

export default function Header() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 28px",
      backgroundColor: "#f5f5f5"
    }}>
      {/* Left: logo and title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img src={logo} alt="Logo" style={{ height: "48px" }} />
        <span style={{ color: "#1888A3", fontWeight: "700", fontSize: "22px" }}>
          CHILL BILLING
        </span>
      </div>

      {/* Right: profile | Username | Home | Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{
          borderRadius: "50%",
          background: "#d2dbe0",
          width: "32px",
          height: "32px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px"
        }}>👤</span>
        <span style={{ fontWeight: "500" }}>Username</span>

        <button
          style={{
            background: "#21b0c0",
            color: "#fff",
            border: "none",
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

        <button
          style={{
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "22px",
            padding: "8px 24px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer"
          }}
          onClick={() => alert("Logout")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
