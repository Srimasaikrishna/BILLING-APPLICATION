import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GenerateInvoice() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    invoiceNo: "12345678",
    dueDate: "2025-08-20",
    customerName: "Abcdefg Hijkl",
    customerEmail: "abc@gmail.com",
    customerPhone: "9876543210",
    productService: "IT services",
    quantity: 4,
    rate: 5000,
    paid: 12500,
    balance: 8500,
    status: "Paid"
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleQuantityChange(e) {
    const val = Number(e.target.value);
    if (val < 1) return;
    setForm(prev => ({ ...prev, quantity: val }));
  }

  function incrementQuantity() {
    setForm(prev => ({ ...prev, quantity: prev.quantity + 1 }));
  }

  function decrementQuantity() {
    setForm(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Invoice Generated!");
    navigate("/invoice-management");
  }

  function handleReset() {
    setForm({
      invoiceNo: "",
      dueDate: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      productService: "",
      quantity: 1,
      rate: "",
      paid: "",
      balance: "",
      status: "Paid"
    });
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "14px",
      margin: "40px auto",
      padding: "30px 60px",
      maxWidth: "670px",
      boxShadow: "0 6px 28px rgba(0,0,0,0.09)"
    }}>
      {/* Top row: Back button only */}
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 18
      }}>
        <button
          onClick={() => navigate("/invoice-management")}
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "9px 26px",
            borderRadius: "22px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >Back</button>
      </div>
      <h2 style={{ textAlign: "center", marginBottom: 32, fontSize: 22, color: "#1888A3" }}>Generate Invoice</h2>
      <form onSubmit={handleSubmit}>
        {/* Invoice No & Due Date */}
        <div style={{ display: "flex", gap: "18px", marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <label>Invoice Number</label>
            <input name="invoiceNo" type="text" value={form.invoiceNo} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Due Date</label>
            <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        {/* Customer Info */}
        <div style={{ display: "flex", gap: "18px", marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <label>Customer Name</label>
            <input name="customerName" type="text" value={form.customerName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Customer Email</label>
            <input name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "18px", marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <label>Customer Phone</label>
            <input name="customerPhone" type="text" value={form.customerPhone} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Product/Service</label>
            <input name="productService" type="text" value={form.productService} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        {/* Quantity & Rate */}
        <div style={{ display: "flex", gap: "18px", marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <label>Quantity</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button type="button" onClick={decrementQuantity} style={qtyBtnStyle}>-</button>
              <input name="quantity" type="number" value={form.quantity} onChange={handleQuantityChange} style={inputQtyStyle} />
              <button type="button" onClick={incrementQuantity} style={qtyBtnStyle}>+</button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label>Rate</label>
            <input name="rate" type="number" value={form.rate} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        {/* Paid & Balance */}
        <div style={{ display: "flex", gap: "18px", marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <label>Paid</label>
            <input name="paid" type="number" value={form.paid} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Balance</label>
            <input name="balance" type="number" value={form.balance} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        {/* Status Radio */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ marginRight: 20 }}>Status:</label>
          {["Paid", "Unpaid", "Partial Paid", "Overdue"].map(st => (
            <label key={st} style={{ marginRight: 14 }}>
              <input type="radio" name="status" value={st} checked={form.status === st} onChange={handleChange} />
              <span style={{ marginLeft: 7 }}>{st}</span>
            </label>
          ))}
        </div>
        {/* Buttons */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={btnGenerateStyle}>Generate</button>
          <button type="button" style={btnResetStyle} onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 16px",
  fontSize: "16px",
  borderRadius: "9px",
  border: "1px solid #cfd8dc",
  fontWeight: "500",
  marginTop: "8px"
};

const qtyBtnStyle = {
  background: "#efefef", border: "none", borderRadius: "50%",
  width: 30, height: 30, fontSize: 20, fontWeight: 600,
  marginRight: 10, marginLeft: 10, cursor: "pointer"
};

const inputQtyStyle = {
  width: 50, padding: "7px", textAlign: "center", fontSize: "17px",
  borderRadius: "7px", border: "1px solid #cfd8dc", fontWeight: "600"
};

const btnGenerateStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "22px",
  padding: "10px 42px",
  fontWeight: "600",
  fontSize: "17px",
  cursor: "pointer",
  marginRight: "18px"
};

const btnResetStyle = {
  background: "#efefef",
  color: "#333",
  border: "none",
  borderRadius: "22px",
  padding: "9px 38px",
  fontWeight: "500",
  fontSize: "17px",
  cursor: "pointer"
};
