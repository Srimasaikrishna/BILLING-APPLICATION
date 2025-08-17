import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialPayments = [
  { id: 1, invoice: "Inv021", customer: "Pranay", date: "1/08/2025", amount: 6500, status: "Success" },
  { id: 2, invoice: "Inv0213", customer: "Prabhas", date: "1/08/2025", amount: 4500, status: "Failed" },
  { id: 3, invoice: "Inv0214", customer: "Sai Krishna", date: "1/08/2025", amount: 5000, status: "Success" },
  { id: 4, invoice: "Inv0216", customer: "pratab", date: "1/08/2025", amount: 6000, status: "Pending" },
  { id: 5, invoice: "Inv02118", customer: "Swapna", date: "1/08/2025", amount: 5500, status: "Failed" },
];

const statusColors = {
  Success: "#43a047",
  Failed: "#e53935",
  Pending: "#ffd600",
};

export default function PaymentTracking() {
  const [payments] = useState(initialPayments);
  const navigate = useNavigate();

  const totalReceived = payments
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ color: "#1888A3", fontSize: "21px", fontWeight: "700" }}>
          Payment Tracking
        </span>
        <button
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "22px",
            fontWeight: "600",
            padding: "9px 32px",
            fontSize: "17px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/record-payment")}
        >
          Record new payment
        </button>
      </div>
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
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "17px" }}>
        <thead>
          <tr style={{ background: "#f6f6f6" }}>
            <th style={thStyle}>Invoice</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Payment Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(pmt => (
            <tr key={pmt.id} style={{ borderBottom: "1px solid #eaeaea", textAlign: "center" }}>
              <td style={tdStyle}>{pmt.invoice}</td>
              <td style={tdStyle}>{pmt.customer}</td>
              <td style={tdStyle}>{pmt.date}</td>
              <td style={tdStyle}>₹ {pmt.amount.toLocaleString()}</td>
              <td style={{ ...tdStyle, color: statusColors[pmt.status] || "#222", fontWeight: "600" }}>
                {pmt.status}
              </td>
              <td style={tdStyle}>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2176ae",
                    fontWeight: "600",
                    fontSize: "16px",
                    cursor: "pointer"
                  }}
                  onClick={() => alert("Edit payment")}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "12px 0",
  color: "#333",
  fontWeight: "700"
};

const tdStyle = {
  padding: "17px 0",
  color: "#444",
  fontWeight: "400"
};
