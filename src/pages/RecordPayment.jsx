import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecordPayment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    invoice: "",
    amount: "",
    method: "Credit /Debit",
    date: "",
    txnid: "",
    status: "Success",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleRadio(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Payment recorded!");
    navigate("/payment-tracking");
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      margin: "38px auto",
      padding: "36px 64px",
      maxWidth: "650px",
      boxShadow: "0 6px 24px rgba(0,0,0,0.08)"
    }}>
      {/* No logo here */}
      <h2 style={{ textAlign: "center", marginBottom: 28, fontSize: 23, fontWeight: "700" }}>
        Record a Payment
      </h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "490px", margin: "0 auto" }}>
        {/* Select Invoice */}
        <div style={rowStyle}>
          <label style={labelStyle}>Select Invoice :</label>
          <input
            type="text"
            name="invoice"
            value={form.invoice}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter invoice number…"
            required
          />
        </div>
        {/* Enter Amount */}
        <div style={rowStyle}>
          <label style={labelStyle}>Enter Amount :</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Amount…"
            required
          />
        </div>
        {/* Payment Method */}
        <div style={rowStyle}>
          <label style={labelStyle}>Payment Method :</label>
          <label style={{ marginRight: 14 }}>
            <input
              type="radio"
              name="method"
              value="Credit /Debit"
              checked={form.method === "Credit /Debit"}
              onChange={() => handleRadio("method", "Credit /Debit")}
            /> Credit /Debit
          </label>
          <label style={{ marginRight: 14 }}>
            <input
              type="radio"
              name="method"
              value="UPI"
              checked={form.method === "UPI"}
              onChange={() => handleRadio("method", "UPI")}
            />
            <span style={{ marginLeft: 6, color: "#295bee" }}>UPI</span>
          </label>
          <label>
            <input
              type="radio"
              name="method"
              value="QR"
              checked={form.method === "QR"}
              onChange={() => handleRadio("method", "QR")}
            /> QR
          </label>
        </div>
        {/* Payment Date */}
        <div style={rowStyle}>
          <label style={labelStyle}>Payment Date :</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        {/* Transaction ID */}
        <div style={rowStyle}>
          <label style={labelStyle}>Transaction id :</label>
          <input
            type="text"
            name="txnid"
            value={form.txnid}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        {/* Status */}
        <div style={rowStyle}>
          <label style={labelStyle}>Status :</label>
          <label style={{ marginRight: 14 }}>
            <input
              type="radio"
              name="status"
              value="Success"
              checked={form.status === "Success"}
              onChange={() => handleRadio("status", "Success")}
            /> Success
          </label>
          <label style={{ marginRight: 14 }}>
            <input
              type="radio"
              name="status"
              value="Failed"
              checked={form.status === "Failed"}
              onChange={() => handleRadio("status", "Failed")}
            /> Failed
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="Pending"
              checked={form.status === "Pending"}
              onChange={() => handleRadio("status", "Pending")}
            />
            <span style={{ marginLeft: 6, color: "#295bee" }}>Pending</span>
          </label>
        </div>
        {/* Save Button */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            type="submit"
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "22px",
              padding: "9px 38px",
              fontWeight: "600",
              fontSize: "17px",
              cursor: "pointer"
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

const rowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "22px",
  gap: "12px"
};

const labelStyle = {
  fontWeight: "500",
  width: "180px",
  fontSize: "16px"
};

const inputStyle = {
  width: "210px",
  padding: "8px 16px",
  fontSize: "15px",
  borderRadius: "8px",
  border: "1px solid #cfd8dc",
  fontWeight: "500",
  marginLeft: "8px"
};
