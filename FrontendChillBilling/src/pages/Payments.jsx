import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialPayments = [
  { id: 1, invoice: "Inv021", customer: "Pranay", date: "1/08/2025", amount: 5000, method: "Credit/Debit", status: "Success" },
  { id: 2, invoice: "Inv0213", customer: "Prabhas", date: "1/08/2025", amount: 4500, method: "Credit/Debit", status: "Pending" },
  { id: 3, invoice: "Inv0214", customer: "Sai Krishna", date: "1/08/2025", amount: 6000, method: "UPI", status: "Failed" },
  { id: 4, invoice: "Inv0216", customer: "pratab", date: "1/08/2025", amount: 5500, method: "Credit/Debit", status: "Success" },
  { id: 5, invoice: "Inv02118", customer: "Swapna", date: "1/08/2025", amount: 5000, method: "QR", status: "Failed" },
];

const statusColors = {
  Success: "#43a047",
  Failed: "#e53935",
  Pending: "#ff9800",
};

export default function PaymentTracking() {
  const [payments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterAmount, setFilterAmount] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const navigate = useNavigate();

  // Filtering logic
  const filteredPayments = payments.filter(payment => {
    const searchMatched =
      payment.invoice.toLowerCase().includes(search.toLowerCase()) ||
      payment.customer.toLowerCase().includes(search.toLowerCase()) ||
      payment.date.toLowerCase().includes(search.toLowerCase());

    let amountMatched = true;
    if (filterAmount === "lt5") amountMatched = payment.amount < 5000;
    else if (filterAmount === "bw5-6") amountMatched = payment.amount >= 5000 && payment.amount <= 6000;
    else if (filterAmount === "gt6") amountMatched = payment.amount > 6000;

    const methodMatched = filterMethod ? payment.method === filterMethod : true;

    return searchMatched && amountMatched && methodMatched;
  });

  const totalReceived = filteredPayments
    .filter(payment => payment.status === "Success")
    .reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <div style={{
      background: "#fff",
      borderRadius: "18px",
      margin: "32px auto",
      padding: "32px 44px",
      maxWidth: "950px",
      boxShadow: "0 0 16px rgba(0,0,0,0.08)"
    }}>
      {/* Title Row with Back Button */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
        <span style={{ color: "#1888A3", fontSize: "21px", fontWeight: "700" }}>Payment Tracking</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => navigate("/admindashboard")}  // Back button navigates to dashboard
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "22px",
              padding: "10px 32px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Back
          </button>
          <button
            style={{
              background: "#fff",
              border: "2px solid #222",
              borderRadius: "22px",
              fontWeight: "600",
              padding: "9px 20px",
              fontSize: "15px",
              cursor: "pointer"
            }}
            onClick={() => navigate("/record-payment")}
          >
            Record new payment
          </button>
        </div>
      </div>

      {/* Top controls row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            border: "1px solid #ccc",
            padding: "7px 12px",
            borderRadius: "8px",
            minWidth: "170px"
          }}
        />
        <button
          style={{
            background: "#eee",
            border: "1px solid #ccc",
            padding: "7px 20px",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
          }}
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>
      </div>

      {/* Filter Popup */}
      {showFilter && (
        <div style={{
          position: "absolute",
          top: "160px",
          left: "calc(50% - 190px)",
          width: "375px",
          background: "#fff",
          border: "1px solid #aaa",
          boxShadow: "0 12px 32px rgba(0,0,0,0.09)",
          borderRadius: "12px",
          zIndex: 2,
          padding: "24px",
        }}>
          <h4 style={{ marginTop: 0, marginBottom: "12px", fontSize: "18px", color: "#1888A3", fontWeight: "700" }}>Filter Payments</h4>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Amount:</label>
            <select
              value={filterAmount}
              onChange={e => setFilterAmount(e.target.value)}
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="">All</option>
              <option value="lt5">Less than 5,000</option>
              <option value="bw5-6">5,000 - 6,000</option>
              <option value="gt6">More than 6,000</option>
            </select>
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Method:</label>
            <select
              value={filterMethod}
              onChange={e => setFilterMethod(e.target.value)}
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="">All</option>
              <option value="Credit/Debit">Credit/Debit</option>
              <option value="UPI">UPI</option>
              <option value="QR">QR</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "9px" }}>
            <button
              onClick={() => setShowFilter(false)}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "7px 20px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                setFilterAmount("");
                setFilterMethod("");
                setShowFilter(false);
              }}
              style={{
                background: "#eaeaea",
                border: "none",
                borderRadius: "8px",
                padding: "7px 16px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Total */}
      <div style={{ marginBottom: "20px" }}>
        <span style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#029280",
          background: "#eaf7fa",
          borderRadius: "12px",
          padding: "8px 28px"
        }}>
          Total Payment Received ₹ {totalReceived.toLocaleString()}
        </span>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px", background: "#fff" }}>
        <thead>
          <tr>
            <th style={thStyle}>Invoice Id</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Method</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(pmt => (
            <tr key={pmt.id} style={{ textAlign: "center", borderBottom: "1.5px solid #e4e4e4" }}>
              <td style={tdStyle}>{pmt.invoice}</td>
              <td style={tdStyle}>{pmt.customer}</td>
              <td style={tdStyle}>{pmt.date}</td>
              <td style={tdStyle}>{pmt.amount.toLocaleString()}</td>
              <td style={tdStyle}>{pmt.method}</td>
              <td style={{ ...tdStyle, color: statusColors[pmt.status], fontWeight: "700" }}>{pmt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px 0",
  color: "#333",
  fontWeight: "700",
  background: "#f8f8f8",
  borderBottom: "1.8px solid #e4e4e4"
};

const tdStyle = {
  padding: "11px 0",
  color: "#444",
  fontWeight: "400"
};
