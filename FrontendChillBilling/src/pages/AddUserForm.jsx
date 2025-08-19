import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUserForm({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "Admin",
    password: "",
    confirmPassword: "",
    status: "Active",
  });

  // Update form for radio/inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // Add user validation if needed
  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onAdd(form);
    navigate("/user-management");
  }

  return (
    <div style={{
      maxWidth: "500px", margin: "40px auto", background: "#fff",
      borderRadius: "12px", padding: "38px", boxShadow: "0 0 12px rgba(0,0,0,0.07)"
    }}>
      <h2 style={{ marginBottom: "22px", color: "#1888A3", textAlign: "center" }}>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div style={formRow}><label style={label}>Name :</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} style={input} required />
        </div>
        <div style={formRow}><label style={label}>Username :</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} style={input} required />
        </div>
        <div style={formRow}><label style={label}>Email id :</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={input} required />
        </div>
        <div style={formRow}><label style={label}>Phone No :</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} style={input} required />
        </div>
        <div style={formRow}>
          <label style={label}>Role :</label>
          <label>
            <input type="radio" name="role" value="Admin" checked={form.role === "Admin"} onChange={handleChange} />
            Admin
          </label>
          <label style={{ marginLeft: "22px" }}>
            <input type="radio" name="role" value="Accountant" checked={form.role === "Accountant"} onChange={handleChange} />
            Accountant
          </label>
          <label style={{ marginLeft: "22px" }}>
            <input type="radio" name="role" value="Customer" checked={form.role === "Customer"} onChange={handleChange} />
            Customer
          </label>
        </div>
        <div style={formRow}><label style={label}>Password :</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={input} required />
        </div>
        <div style={formRow}><label style={label}>Confirm Password :</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} style={input} required />
        </div>
        <div style={formRow}>
          <label style={label}>Status :</label>
          <label>
            <input type="radio" name="status" value="Active" checked={form.status === "Active"} onChange={handleChange} />
            Active
          </label>
          <label style={{ marginLeft: "22px" }}>
            <input type="radio" name="status" value="Inactive" checked={form.status === "Inactive"} onChange={handleChange} />
            Inactive
          </label>
        </div>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button type="button" onClick={() => navigate("/user-management")} style={backBtn}>Back</button>
          <button type="submit" style={addBtn}>Add</button>
        </div>
      </form>
    </div>
  );
}

const formRow = { display: "flex", alignItems: "center", marginBottom: "22px" };
const label = { width: "140px", fontWeight: "600", fontSize: "16px" };
const input = { flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" };
const backBtn = { background: "#111", color: "#fff", border: "none", borderRadius: "22px", padding: "8px 32px", fontWeight: "700", fontSize: "16px", cursor: "pointer", marginRight: "15px" };
const addBtn = { background: "#111", color: "#fff", border: "none", borderRadius: "22px", padding: "8px 32px", fontWeight: "700", fontSize: "16px", cursor: "pointer" };
