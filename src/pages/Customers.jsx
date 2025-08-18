import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialCustomers = [
  { name: "Pranay", phone: "123456789", email: "pranay@gmail.com", status: "Active" },
  { name: "Prabhas", phone: "123456789", email: "prabas@gmail.com", status: "InActive" },
  { name: "Sai Krishna", phone: "123456789", email: "saikrishna@gmail.com", status: "Active" },
  { name: "Pratab", phone: "123456789", email: "pratab@gmail.com", status: "InActive" },
  { name: "Swapna", phone: "123456789", email: "swapna@gmail.com", status: "Active" }
];

export default function Customers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPhone, setFilterPhone] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || cust.status === filterStatus;
    const matchesPhone =
      !filterPhone || cust.phone.includes(filterPhone);
    return matchesSearch && matchesStatus && matchesPhone;
  });

  const handleDelete = (name) => {
    if(window.confirm(`Are you sure to delete customer: ${name}?`)){
      setCustomers(prev => prev.filter(cust => cust.name !== name));
    }
  };

  const handleEdit = (name) => {
    // navigate to edit page or open a modal for editing
    alert(`Edit ${name} clicked!`);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        marginTop: "30px",
        padding: "28px 38px",
        boxShadow: "0 0 12px rgba(0,0,0,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            fontSize: "27px",
            fontWeight: "700",
            color: "#1888A3",
            margin: 0,
          }}
        >
          Customer Management
        </h2>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "1px solid #d1d1d1",
              borderRadius: "22px",
              padding: "8px 20px",
              fontSize: "17px",
              outline: "none",
              width: "220px",
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
              alignItems: "center",
            }}
            onClick={() => setShowFilter((v) => !v)}
          >
            Filter
          </button>
          {showFilter && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "115px",
                background: "#fff",
                boxShadow: "0 0 10px rgba(0,0,0,0.09)",
                borderRadius: "14px",
                padding: "18px 20px",
                zIndex: 10,
                minWidth: "220px",
              }}
            >
              <div style={{ marginBottom: "13px" }}>
                <label
                  style={{ fontWeight: "600", fontSize: "17px", marginRight: "12px" }}
                >
                  Status:
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    border: "1px solid #d1d1d1",
                    borderRadius: "12px",
                    padding: "5px 16px",
                    fontSize: "16px",
                  }}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </select>
              </div>
              <div>
                <label
                  style={{ fontWeight: "600", fontSize: "17px", marginRight: "7px" }}
                >
                  Phone No:
                </label>
                <input
                  type="text"
                  value={filterPhone}
                  onChange={(e) => setFilterPhone(e.target.value)}
                  placeholder="Phone number"
                  style={{
                    border: "1px solid #d1d1d1",
                    borderRadius: "12px",
                    padding: "6px 16px",
                    fontSize: "16px",
                  }}
                />
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
                    cursor: "pointer",
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
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFilterStatus("All");
                    setFilterPhone("");
                    setShowFilter(false);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
          <button
            style={{
              background: "#1888A3",
              color: "#fff",
              border: "none",
              borderRadius: "22px",
              padding: "8px 24px",
              fontSize: "17px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => navigate("/add-customer")}
          >
            Add Customer
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "18px",
        }}
      >
        <thead>
          <tr style={{ background: "#f6f6f6" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Phone No</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, idx) => (
              <tr
                key={idx}
                style={{ borderBottom: "1px solid #eaeaea", textAlign: "center" }}
              >
                <td style={tdStyle}>{customer.name}</td>
                <td style={tdStyle}>{customer.phone}</td>
                <td style={tdStyle}>{customer.email}</td>
                <td
                  style={{
                    ...tdStyle,
                    color: customer.status === "Active" ? "green" : "red",
                    fontWeight: "500",
                  }}
                >
                  {customer.status}
                </td>
                <td style={tdStyle}>
                  <button
                    style={actionBtn}
                    onClick={() => alert(`Edit ${customer.name}`)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    style={{ ...actionBtn, color: "red" }}
                    onClick={() => alert(`Delete ${customer.name}`)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                No customers found
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
  fontWeight: "700",
};

const tdStyle = {
  padding: "14px 0",
  color: "#444",
  fontWeight: "400",
};

const actionBtn = {
  background: "none",
  border: "none",
  color: "#2176ae",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
};
