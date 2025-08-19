import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function EditUserForm() {
  const { users, setUsers } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = users?.find(u => u.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
    status: "Active"
  });

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        role: currentUser.role || "",
        password: "",
        confirmPassword: "",
        status: currentUser.status || "Active"
      });
    }
  }, [currentUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }
    setUsers(prev =>
      prev.map(u =>
        u.id === Number(id)
          ? {
              ...u,
              username: form.username,
              phone: form.phone,
              password: form.password ? form.password : u.password,
              status: form.status
            }
          : u
      )
    );
    navigate("/user-management");
  }

  if (!currentUser) return <div>User not found</div>;

  return (
    <div style={{
      maxWidth: "580px",
      margin: "40px auto",
      padding: "38px 48px",
      background: "#fff",
      borderRadius: "18px",
      boxShadow: "0 0 12px rgba(0,0,0,0.07)"
    }}>
      <h2 style={{ marginBottom: "22px", color: "#1888A3", textAlign: "center", fontWeight: 700 }}>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <FormRow label="Name">
          <input name="name" value={form.name} readOnly disabled style={inputStyle} />
        </FormRow>
        <FormRow label="Username">
          <input name="username" value={form.username} onChange={handleChange} style={inputStyle} />
        </FormRow>
        <FormRow label="Email id">
          <input name="email" value={form.email} readOnly disabled style={inputStyle} />
        </FormRow>
        <FormRow label="Phone No">
          <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
        </FormRow>
        <FormRow label="Role">
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label style={radioLabel}>
              <input type="radio" name="role" value="Admin" checked={form.role === "Admin"} disabled /> Admin
            </label>
            <label style={radioLabel}>
              <input type="radio" name="role" value="account" checked={form.role === "account"} disabled /> Accountant
            </label>
            <label style={radioLabel}>
              <input type="radio" name="role" value="customer" checked={form.role === "customer"} disabled /> Customer
            </label>
          </div>
        </FormRow>
        <FormRow label="Password">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter new password"
            style={inputStyle}
          />
        </FormRow>
        <FormRow label="Confirm Password">
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            style={inputStyle}
          />
        </FormRow>
        <FormRow label="Status">
          <label style={radioLabel}>
            <input
              type="radio"
              name="status"
              value="Active"
              checked={form.status === "Active"}
              onChange={handleChange}
            /> Active
          </label>
          <label style={radioLabel}>
            <input
              type="radio"
              name="status"
              value="InActive"
              checked={form.status === "InActive"}
              onChange={handleChange}
            /> Inactive
          </label>
        </FormRow>
        <div style={{
          marginTop: "28px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: "20px"
        }}>
          <button type="submit" style={saveBtn}>Save</button>
          <button type="button" onClick={() => navigate("/user-management")} style={cancelBtn}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
      <label style={{ width: 160, fontWeight: 600, fontSize: 17, textAlign: "right", marginRight: 12 }}>{label} :</label>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16,
  boxSizing: "border-box"
};
const radioLabel = {
  marginRight: 28,
  fontWeight: 500,
  fontSize: 16,
};
const saveBtn = {
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: 22,
  padding: "8px 32px",
  fontWeight: 700,
  fontSize: 17,
  cursor: "pointer"
};
const cancelBtn = {
  background: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: 22,
  padding: "8px 32px",
  fontWeight: 700,
  fontSize: 17,
  cursor: "pointer"
};
