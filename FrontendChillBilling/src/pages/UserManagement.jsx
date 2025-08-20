import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function UserManagement() {
  const { users, setUsers } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRole, setFilterRole] = useState("All");

  const navigate = useNavigate();

  // Apply filters and search
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || user.status === filterStatus;
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Navigate to edit user page
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // Delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        marginTop: 30,
        padding: "28px 38px",
        boxShadow: "0 0 12px rgba(0,0,0,0.07)"
      }}
    >
      {/* Header with title and Back button */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 32, position: "relative" }}>
        <h2 style={{ fontSize: 27, fontWeight: "700", color: "#1883A", margin: 0, flexGrow: 1 }}>
          User Management
        </h2>
        <button
          onClick={() => navigate("/admindashboard")}  // Change /admindashboard to your dashboard path if different
          style={{
            marginLeft: "auto",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 22,
            padding: "8px 24px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Back
        </button>
      </div>

      {/* Search, Filter, Add User */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          position: "relative",
          marginBottom: 20
        }}
      >
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "1px solid #d1d1d1",
            borderRadius: 22,
            padding: "8px 20px",
            fontSize: 17,
            outline: "none",
            width: "240px",
            marginRight: "10px"
          }}
        />
        <button
          onClick={() => setShowFilter((v) => !v)}
          style={{
            background: "#f2f2f2",
            color: "#555",
            border: "1px solid #d1d1d1",
            borderRadius: 22,
            padding: "8px 20px",
            fontSize: 17,
            cursor: "pointer"
          }}
        >
          Filter
        </button>
        <button
          onClick={() => navigate("/add-user")}
          style={{
            padding: "8px 24px",
            fontSize: 16,
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 28,
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          Add User
        </button>
      </div>

      {showFilter && (
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 0,
            background: "#fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.09)",
            borderRadius: 14,
            padding: "18px 20px",
            zIndex: 10,
            minWidth: 220
          }}
        >
          <div style={{ marginBottom: 13 }}>
            <label
              style={{
                fontWeight: "600",
                fontSize: 17,
                marginRight: 12
              }}
            >
              Status:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                border: "1px solid #d1d1d1",
                borderRadius: 14,
                padding: "5px 16px",
                fontSize: 16
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>
          <div>
            <label
              style={{
                fontWeight: "600",
                fontSize: 17,
                marginRight: 7
              }}
            >
              Role:
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{
                border: "1px solid #d1d1d1",
                borderRadius: 14,
                padding: "5px 16px",
                fontSize: 16
              }}
            >
              <option value="All">All</option>
              <option value="customer">Customer</option>
              <option value="account">Account</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div style={{ marginTop: 18, textAlign: "right" }}>
            <button
              onClick={() => setShowFilter(false)}
              style={{
                background: "#1888A3",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "7px 18px",
                fontSize: 16,
                fontWeight: "600",
                marginRight: 9,
                cursor: "pointer"
              }}
            >
              Apply
            </button>
            <button
              onClick={() => {
                setFilterStatus("All");
                setFilterRole("All");
                setShowFilter(false);
              }}
              style={{
                background: "#f2f2f2",
                color: "#555",
                border: "1px solid #d1d1d1",
                borderRadius: 14,
                padding: "7px 18px",
                fontSize: 16,
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 18
        }}
      >
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
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: "1px solid #eaeaea",
                  textAlign: "center"
                }}
              >
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td
                  style={{
                    ...tdStyle,
                    color: user.status === "Active" ? "green" : "red",
                    fontWeight: "500"
                  }}
                >
                  {user.status}
                </td>
                <td style={tdStyle}>
                  <button
                    style={actionBtn}
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    style={{ ...actionBtn, color: "red" }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                style={{ textAlign: "center", padding: 20, color: "#999" }}
              >
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
  fontSize: 16,
  cursor: "pointer"
};

