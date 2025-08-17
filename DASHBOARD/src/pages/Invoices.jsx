import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialInvoices = [
  { id: 1, invNo: "Inv021", customer: "Pranay", date: "1/08/2025", amount: 40000, status: "P" },
  { id: 2, invNo: "Inv0213", customer: "Prabhas", date: "1/08/2025", amount: 20000, status: "U" },
  { id: 3, invNo: "Inv0214", customer: "Sai Krishna", date: "1/08/2025", amount: 30000, status: "OD" },
  { id: 4, invNo: "Inv0216", customer: "pratab", date: "1/08/2025", amount: 40000, status: "PP" },
  { id: 5, invNo: "Inv02118", customer: "Swapna", date: "1/08/2025", amount: 30000, status: "PP" },
];

const statusColors = {
  P: "#4CAF50",
  U: "#e53935",
  OD: "#ffd600",
  PP: "#29b6f6",
};

const statusOptions = [
  { value: "P", label: "P" },
  { value: "U", label: "U" },
  { value: "OD", label: "OD" },
  { value: "PP", label: "PP" }
];

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    invNo: "", customer: "", date: "", amount: "", status: ""
  });
  const navigate = useNavigate();

  function handleEdit(id) {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
      setEditingId(id);
      setEditForm({
        invNo: invoice.invNo,
        customer: invoice.customer,
        date: invoice.date,
        amount: invoice.amount,
        status: invoice.status
      });
    }
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure to delete this invoice?")) {
      setInvoices(prev => prev.filter(inv => inv.id !== id));
    }
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  }

  function handleEditSave(id) {
    setInvoices(prev => prev.map(inv => (
      inv.id === id ? { ...inv, ...editForm, amount: Number(editForm.amount) } : inv
    )));
    setEditingId(null);
  }

  function handleEditCancel() {
    setEditingId(null);
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      margin: "30px auto",
      padding: "28px 38px",
      maxWidth: "980px",
      boxShadow: "0 0 12px rgba(0,0,0,0.07)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <span style={{ color: "#1888A3", fontSize: "20px", fontWeight: "700" }}>
          Invoice Management
        </span>
        <button
          onClick={() => navigate("/generate-invoice")}
          style={{
            background: "#111",
            color: "#fff",
            fontWeight: "600",
            border: "none",
            borderRadius: "22px",
            padding: "10px 28px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Generate Invoice
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
        <thead>
          <tr style={{ background: "#f6f6f6" }}>
            <th style={thStyle}>Invoice No.</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? invoices.map(inv => (
            <tr key={inv.id} style={{ borderBottom: "1px solid #eaeaea", textAlign: "center" }}>
              <td style={tdStyle}>
                {editingId === inv.id
                  ? <input name="invNo" value={editForm.invNo} onChange={handleEditChange} style={inputEditStyle} />
                  : inv.invNo}
              </td>
              <td style={tdStyle}>
                {editingId === inv.id
                  ? <input name="customer" value={editForm.customer} onChange={handleEditChange} style={inputEditStyle} />
                  : inv.customer}
              </td>
              <td style={tdStyle}>
                {editingId === inv.id
                  ? <input name="date" value={editForm.date} onChange={handleEditChange} style={inputEditStyle} />
                  : inv.date}
              </td>
              <td style={tdStyle}>
                {editingId === inv.id
                  ? <input name="amount" value={editForm.amount} onChange={handleEditChange} style={inputEditStyle} type="number" />
                  : inv.amount.toLocaleString()}
              </td>
              <td style={{
                ...tdStyle,
                fontWeight: "600",
                color: statusColors[editingId === inv.id ? editForm.status : inv.status] || "#333"
              }}>
                {editingId === inv.id
                  ? <select name="status" value={editForm.status} onChange={handleEditChange} style={inputEditStyle}>
                      {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  : inv.status}
              </td>
              <td style={tdStyle}>
                {editingId === inv.id ? (
                  <>
                    <button style={saveBtn} onClick={() => handleEditSave(inv.id)}>Save</button>{" "}
                    <button style={cancelBtn} onClick={handleEditCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button style={actionBtn} onClick={() => handleEdit(inv.id)}>Edit</button>{" "}
                    <button style={{ ...actionBtn, color: "red" }} onClick={() => handleDelete(inv.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "#999", padding: "20px" }}>No invoices found</td>
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
