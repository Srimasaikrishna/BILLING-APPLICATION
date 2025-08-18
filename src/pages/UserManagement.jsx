import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "Pranay", email: "pranay@gmail.com", role: "customer", status: "Active" },
  { id: 2, name: "Prabhas", email: "prabas@gmail.com", role: "account", status: "InActive" },
  { id: 3, name: "Sai Krishna", email: "saikrishna@gmail.com", role: "Admin", status: "Active" },
  { id: 4, name: "Pratab", email: "pratab@gmail.com", role: "customer", status: "InActive" },
  { id: 5, name: "Swapna", email: "swapna@gmail.com", role: "account", status: "Active" }
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  // Hide inline filter selects, use a dropdown instead
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRole, setFilterRole] = useState("All");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "", status: "" });

  // Combine filters and search
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || user.status === filterStatus;
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  function handleEditClick(user) {
    setEditingUserId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  }

  function handleEditSave(userId) {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, ...editForm } : u
      )
    );
    setEditingUserId(null);
  }

  function handleEditCancel() {
    setEditingUserId(null);
  }

  function handleDelete(userId) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      marginTop: "30px",
      padding: "28px 38px",
      boxShadow: "0 0 12px rgba(0,0,0,0.07)"
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "32px", position: "relative" }}>
        <h2 style={{ fontSize: "27px", fontWeight: "700", color: "#1888A3", margin: 0 }}>
          User Management
        </h2>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px", position: "relative" }}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: "1px solid #d1d1d1",
              borderRadius: "22px",
              padding: "8px 20px",
              fontSize: "17px",
              outline: "none"
            }}
          />
          <button
            style={{
              background: "#f2f2f2",
              color: "#555",
              border: "1px solid #d1d1d1",
              borderRadius: "22px",
              padding: "8px 20px",
              fontSize: "17px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
            onClick={() => setShowFilter(v => !v)}
          >
            Filter
          </button>
          {showFilter && (
            <div style={{
              position: "absolute",
              top: "50px",
              right: "115px",
              background: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.09)",
              borderRadius: "14px",
              padding: "18px 20px",
              zIndex: 10,
              minWidth: "220px"
            }}>
              <div style={{ marginBottom: "13px" }}>
                <label style={{ fontWeight: "600", fontSize: "17px", marginRight: "12px" }}>Status:</label>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{
                    border: "1px solid #d1d1d1",
                    borderRadius: "12px",
                    padding: "5px 16px",
                    fontSize: "16px"
                  }}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: "600", fontSize: "17px", marginRight: "7px" }}>Role:</label>
                <select
                  value={filterRole}
                  onChange={e => setFilterRole(e.target.value)}
                  style={{
                    border: "1px solid #d1d1d1",
                    borderRadius: "12px",
                    padding: "5px 16px",
                    fontSize: "16px"
                  }}
                >
                  <option value="All">All</option>
                  <option value="customer">Customer</option>
                  <option value="account">Account</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div style={{ marginTop: "18px", textAlign: "right" }}>
                <button
                  style={{
                    background: "#1888A3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "7px 18px",
                    fontSize: "16px",
                    fontWeight: "600",
                    marginRight: "9px",
                    cursor: "pointer"
                  }}
                  onClick={() => setShowFilter(false)}
                >
                  Apply
                </button>
                <button
                  style={{
                    background: "#f2f2f2",
                    color: "#555",
                    border: "1px solid #d1d1d1",
                    borderRadius: "12px",
                    padding: "7px 18px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setFilterStatus("All");
                    setFilterRole("All");
                    setShowFilter(false);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
        <thead>
          <tr style={{ background: "#f6f6f6" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length ? filteredUsers.map(user => (
            <tr key={user.id} style={{ borderBottom: "1px solid #eaeaea", textAlign: "center" }}>
              <td style={tdStyle}>
                {editingUserId === user.id ? (
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    style={inputEditStyle}
                  />
                ) : user.name}
              </td>
              <td style={tdStyle}>
                {editingUserId === user.id ? (
                  <input
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    style={inputEditStyle}
                  />
                ) : user.email}
              </td>
              <td style={tdStyle}>
                {editingUserId === user.id ? (
                  <select
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                    style={inputEditStyle}
                  >
                    <option value="customer">Customer</option>
                    <option value="account">Account</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : user.role}
              </td>
              <td style={{ ...tdStyle, color: user.status === "Active" ? "green" : "red", fontWeight: "500" }}>
                {editingUserId === user.id ? (
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    style={inputEditStyle}
                  >
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                  </select>
                ) : user.status}
              </td>
              <td style={tdStyle}>
                {editingUserId === user.id ? (
                  <>
                    <button style={saveBtn} onClick={() => handleEditSave(user.id)}>Save</button>{" "}
                    <button style={cancelBtn} onClick={handleEditCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button style={actionBtn} onClick={() => handleEditClick(user)}>Edit</button>{" "}
                    <button style={{ ...actionBtn, color: "red" }} onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "11px 0",
  color: "#333",
  fontWeight: "700"
};

const tdStyle = {
  padding: "14px 0",
  color: "#444",
  fontWeight: "400"
};

const actionBtn = {
  background: "none",
  border: "none",
  color: "#2176ae",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer"
};

const saveBtn = {
  background: "#4CAF50",
  border: "none",
  color: "#fff",
  fontWeight: "600",
  padding: "6px 14px",
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "15px"
};

const cancelBtn = {
  background: "#f44336",
  border: "none",
  color: "#fff",
  fontWeight: "600",
  padding: "6px 14px",
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "15px"
};

const inputEditStyle = {
  width: "90%",
  padding: "4px 8px",
  fontSize: "16px"
};
