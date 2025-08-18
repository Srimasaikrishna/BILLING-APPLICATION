
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // You can add validation and backend submission logic here
    alert("Customer added!");
    navigate("/customer-management");
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "14px",
      marginTop: "30px",
      padding: "30px 50px",
      maxWidth: "550px",
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: "0 6px 28px rgba(0,0,0,0.08)"
    }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "18px" }}>
        <button
          onClick={() => navigate("/customer-management")}
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "8px 22px",
            borderRadius: "22px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Back
        </button>
      </div>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "22px", color: "#1888A3" }}>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        {["name", "username", "email", "phone", "password", "confirmPassword"].map((field) => (
          <div key={field} style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
            <label htmlFor={field} style={{ minWidth: "140px", fontWeight: "600", color: "#444", textAlign: "right" }}>
              {field === "confirmPassword" 
                ? "Confirm Password" 
                : field.charAt(0).toUpperCase() + field.slice(1).replace('id', ' ID').replace('No', ' No')} :
            </label>
            <input
              type={field.includes("password") ? "password" : "text"}
              name={field}
              id={field}
              value={form[field]}
              onChange={handleChange}
              style={{
                flex: 1,
                border: "1px solid #cfd8dc",
                borderRadius: "22px",
                padding: "8px 18px",
                marginLeft: "14px",
                fontSize: "16px"
              }}
              required
              autoComplete="off"
            />
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "22px",
              padding: "10px 38px",
              fontWeight: "600",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
