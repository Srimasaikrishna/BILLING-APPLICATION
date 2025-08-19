import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function EditInvoiceForm() {
  const { invoices, setInvoices } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const currentInvoice = invoices?.find(inv => String(inv.id) === String(id));

  const [form, setForm] = useState({
    invoiceNo: "",
    customer: "",
    date: "",
    amount: "",
    status: ""
  });

  useEffect(() => {
    if (currentInvoice) {
      setForm({
        invoiceNo: currentInvoice.invoiceNo || "",
        customer: currentInvoice.customer || "",
        date: currentInvoice.date || "",
        amount: currentInvoice.amount || "",
        status: currentInvoice.status || "",
      });
    }
  }, [currentInvoice]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInvoices(prev =>
      prev.map(inv =>
        String(inv.id) === String(id)
          ? {
              ...inv,
              amount: form.amount,
              status: form.status,
              date: form.date
            }
          : inv
      )
    );
    navigate("/invoice-management");
  }

  if (!currentInvoice) return <div>Invoice not found</div>;

  return (
    <div style={{
      maxWidth: "580px",
      margin: "40px auto",
      padding: "38px 48px",
      background: "#fff",
      borderRadius: "18px",
      boxShadow: "0 0 12px rgba(0,0,0,0.07)"
    }}>
      <h2 style={{ marginBottom: "22px", color: "#1888A3", textAlign: "center", fontWeight: 700 }}>Edit Invoice</h2>
      <form onSubmit={handleSubmit}>
        <FormRow label="Invoice No">
          <input name="invoiceNo" value={form.invoiceNo} readOnly disabled style={inputStyle} />
        </FormRow>
        <FormRow label="Customer">
          <input name="customer" value={form.customer} readOnly disabled style={inputStyle} />
        </FormRow>
        <FormRow label="Date">
          <input name="date" type="date" value={form.date} onChange={handleChange} style={inputStyle} />
        </FormRow>
        <FormRow label="Amount">
          <input name="amount" type="number" value={form.amount} onChange={handleChange} style={inputStyle} />
        </FormRow>
        <FormRow label="Status">
          <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
            <option value="P">P</option>
            <option value="U">U</option>
            <option value="OD">OD</option>
            <option value="PP">PP</option>
          </select>
        </FormRow>
        <div style={{
          marginTop: "28px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: "20px"
        }}>
          <button type="submit" style={saveBtn}>Save</button>
          <button type="button" onClick={() => navigate("/invoice-management")} style={cancelBtn}>Cancel</button>
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
