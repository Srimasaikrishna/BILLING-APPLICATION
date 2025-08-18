import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GenerateInvoice.css";

export default function GenerateInvoice() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dueDate: "",
    customerEmail: "",
    productService: "",
    quantity: "",
    rate: "",
    paid: "",
    balance: "",
    status: ""
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
      dueDate: "",
      customerEmail: "",
      productService: "",
      quantity: "",
      rate: "",
      paid: "",
      balance: "",
      status: ""
    });
  }

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <button onClick={() => navigate("/invoice-management")} className="back-button">
          Back
        </button>
      </div>
      <h2 className="invoice-title">Generate Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          
          <div className="form-group">
            <label>Due Date</label>
            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Customer Email</label>
            <input
              name="customerEmail"
              type="email"
              value={form.customerEmail}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Product/Service</label>
            <input
              name="productService"
              type="text"
              value={form.productService}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <div className="qty-controls">
              <button type="button" onClick={decrementQuantity} className="qty-btn">-</button>
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleQuantityChange}
                className="qty-input"
                required
              />
              <button type="button" onClick={incrementQuantity} className="qty-btn">+</button>
            </div>
          </div>
          <div className="form-group">
            <label>Rate</label>
            <input
              name="rate"
              type="number"
              value={form.rate}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Paid</label>
            <input
              name="paid"
              type="number"
              value={form.paid}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Balance</label>
            <input
              name="balance"
              type="number"
              value={form.balance}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="radio-group">
          <label style={{ marginRight: "20px" }}>Status:</label>
          {["Paid", "Unpaid", "Partial Paid", "Overdue"].map((st) => (
            <label key={st}>
              <input
                type="radio"
                name="status"
                value={st}
                checked={form.status === st}
                onChange={handleChange}
                required
              />
              {st}
            </label>
          ))}
        </div>

        <div className="button-group">
          <button type="submit" className="generate-btn">Generate</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
