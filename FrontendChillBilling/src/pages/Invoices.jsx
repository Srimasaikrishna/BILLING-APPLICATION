import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialInvoices = [
  { id: 1, invNo: "Inv021", customer: "Pranay", date: "1/08/2025", amount: 40000, status: "P" },
  { id: 2, invNo: "Inv0213", customer: "Prabhas", date: "1/08/2025", amount: 20000, status: "U" },
  { id: 3, invNo: "Inv0214", customer: "Sai Krishna", date: "1/08/2025", amount: 30000, status: "OD" },
  { id: 4, invNo: "Inv0216", customer: "pratab", date: "1/08/2025", amount: 40000, status: "PP" },
  { id: 5, invNo: "Inv02118", customer: "Swapna", date: "1/08/2025", amount: 30000, status: "PP" }
];

const statusColors = {
  P: "#4CAF50",
  U: "#e53935",
  OD: "#ffd600",
  PP: "#29b6f6",
};

const statusOptions = [
  { value: "", label: "All" },
  { value: "P", label: "Paid (P)" },
  { value: "U", label: "Unpaid (U)" },
  { value: "OD", label: "Overdue (OD)" },
  { value: "PP", label: "Partial Paid (PP)" }
];

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    invNo: "", customer: "", date: "", amount: "", status: ""
  });
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const navigate = useNavigate();

  const handleEdit = (id) => {
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
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this invoice?")) {
      setInvoices(prev => prev.filter(inv => inv.id !== id));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (id) => {
    setInvoices(prev => prev.map(inv =>
      inv.id === id ? { ...inv, ...editForm, amount: Number(editForm.amount) } : inv
    ));
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  // >>> THIS IS THE KEY: FILTER APPLIED TO RENDERED ROWS <<<
  const filteredInvoices = invoices.filter(inv => {
    // Search on invoice number or customer name (case-insensitive)
    const matchesSearch =
      inv.invNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !filterStatus || inv.status === filterStatus;
    const matchesMinAmount = minAmount === "" || inv.amount >= Number(minAmount);
    const matchesMaxAmount = maxAmount === "" || inv.amount <= Number(maxAmount);

    return matchesSearch && matchesStatus && matchesMinAmount && matchesMaxAmount;
  });

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      margin: "30px auto",
      padding: "28px 38px",
      maxWidth: "980px",
      boxShadow: "0 0 12px rgba(0,0,0,0.07)",
      position: "relative"
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

      {/* Search and Filter */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by invoice or customer…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            border: "1px solid #ccc",
            padding: "7px 12px",
            borderRadius: "8px",
            minWidth: "230px"
          }}
        />
        <button
          style={{
            background: "#eee",
            border: "1px solid #ccc",
            padding: "7px 20px",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer"
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
          top: "120px",
          left: "calc(50% - 190px)",
          width: "375px",
          background: "#fff",
          border: "1px solid #aaa",
          boxShadow: "0 12px 32px rgba(0,0,0,0.09)",
          borderRadius: "12px",
          zIndex: 2,
          padding: "24px"
        }}>
          <h4 style={{ marginTop: 0, marginBottom: "12px", fontSize: "18px", color: "#1888A3", fontWeight: "700" }}>Filter Invoices</h4>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Status:</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Min Amount:</label>
            <input
              type="number"
              value={minAmount}
              onChange={e => setMinAmount(e.target.value)}
              placeholder="Min amount"
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc", width: "100px" }}
            />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Max Amount:</label>
            <input
              type="number"
              value={maxAmount}
              onChange={e => setMaxAmount(e.target.value)}
              placeholder="Max amount"
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc", width: "100px" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "9px" }}>
            <button
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "7px 20px",
                fontWeight: "600",
                cursor: "pointer"
              }}
              onClick={() => setShowFilter(false)}
            >
              Apply Filter
            </button>
            <button
              style={{
                background: "#eaeaea",
                border: "none",
                borderRadius: "8px",
                padding: "7px 16px",
                fontWeight: "500",
                cursor: "pointer"
              }}
              onClick={() => {
                setFilterStatus("");
                setMinAmount("");
                setMaxAmount("");
                setShowFilter(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table displays ONLY filtered & searched invoices */}
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
          {filteredInvoices.length > 0 ? filteredInvoices.map(inv => (
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
                  ? (
                    <select name="status" value={editForm.status} onChange={handleEditChange} style={inputEditStyle}>
                      {statusOptions.filter(opt => opt.value !== "").map(opt =>
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      )}
                    </select>
                  ) : inv.status}
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
