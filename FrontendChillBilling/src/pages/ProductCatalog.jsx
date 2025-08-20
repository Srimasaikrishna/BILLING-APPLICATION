import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  { id: 1, name: "Laptop", type: "Product", price: 55000 },
  { id: 2, name: "Service", type: "Service", price: 1500 },
  { id: 3, name: "Keyboard", type: "Product", price: 1200 },
  { id: 4, name: "Consultation", type: "Service", price: 500 },
  { id: 5, name: "Headphones", type: "Product", price: 3200 }
];

export default function ProductCatalog() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", type: "", price: "" });

  // Filter products by search, type and price
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    const matchesType = !filterType || p.type === filterType;
    const matchesMin = minPrice === "" || p.price >= Number(minPrice);
    const matchesMax = maxPrice === "" || p.price <= Number(maxPrice);
    return matchesSearch && matchesType && matchesMin && matchesMax;
  });

  // Edit handlers
  function handleEditClick(product) {
    setEditingId(product.id);
    setEditForm({ name: product.name, type: product.type, price: product.price });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleEditSave(id) {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...editForm, price: Number(editForm.price) } : p
      )
    );
    setEditingId(null);
  }

  function handleEditCancel() {
    setEditingId(null);
  }

  // Delete handler
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  }

  // Add product handlers
  function handleAddClick() {
    setAdding(true);
    setAddForm({ name: '', type: '', price: '' });
  }

  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', type: '', price: '' });

  function handleAddChange(e) {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: value }));
  }

  function handleAddSave(e) {
    e.preventDefault();
    if (!addForm.name || !addForm.type || !addForm.price) {
      alert('Please fill all fields.');
      return;
    }
    const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts(prev => [...prev, { id: nextId, name: addForm.name, type: addForm.type, price: Number(addForm.price) }]);
    setAdding(false);
    setAddForm({ name: '', type: '', price: '' });
  }

  function handleAddCancel() {
    setAdding(false);
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      marginTop: "30px",
      padding: "32px 44px",
      boxShadow: "0 0 12px rgba(0,0,0,0.07)",
      maxWidth: "900px",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h2 style={{
          fontSize: "25px",
          fontWeight: "700",
          color: "#1888A3"
        }}>Product/Service Catalog</h2>
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => navigate("/admindashboard")} // Back button goes to dashboard
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
              background: "#111",
              color: "#fff",
              fontWeight: "600",
              border: "none",
              borderRadius: "22px",
              padding: "10px 38px",
              fontSize: "16px",
              cursor: "pointer"
            }}
            onClick={handleAddClick}
          >
            Add product/Service
          </button>
        </div>
      </div>

      {/* Search and Filter row */}
      <div style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        marginBottom: "20px"
      }}>
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
          top: "120px",
          left: "calc(50% - 190px)",
          width: "375px",
          background: "#fff",
          border: "1px solid #aaa",
          boxShadow: "0 12px 32px rgba(0,0,0,0.09)",
          borderRadius: "12px",
          zIndex: 2,
          padding: "24px",
        }}>
          <h4 style={{ marginTop: 0, marginBottom: "12px", fontSize: "18px", color: "#1888A3", fontWeight: "700" }}>Filter Products/Services</h4>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Type:</label>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
            >
              <option value="">All</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
            </select>
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="Min price"
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "600", marginRight: "9px" }}>Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="Max price"
              style={{ padding: "7px 17px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
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
                setFilterType("");
                setMinPrice("");
                setMaxPrice("");
                setShowFilter(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Data table */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length ? filteredProducts.map(product => (
            <tr key={product.id} style={{ borderBottom: "1px solid #eaeaea", textAlign: "center" }}>
              <td style={tdStyle}>
                {editingId === product.id ? (
                  <input name="name" value={editForm.name} onChange={handleEditChange} style={inputEditStyle} placeholder="Name" />
                ) : product.name}
              </td>
              <td style={tdStyle}>
                {editingId === product.id ? (
                  <select name="type" value={editForm.type} onChange={handleEditChange} style={inputEditStyle}>
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                  </select>
                ) : product.type}
              </td>
              <td style={tdStyle}>
                {editingId === product.id ? (
                  <input name="price" type="number" value={editForm.price} onChange={handleEditChange} style={inputEditStyle} placeholder="Price" />
                ) : `₹${product.price.toLocaleString()}`}
              </td>
              <td style={tdStyle}>
                {editingId === product.id ? (
                  <>
                    <button style={saveBtn} onClick={() => handleEditSave(product.id)}>Save</button>{" "}
                    <button style={cancelBtn} onClick={handleEditCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button style={actionBtn} onClick={() => handleEditClick(product)}>Edit</button>{" "}
                    <button style={{ ...actionBtn, color: "red" }} onClick={() => handleDelete(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                No products/services found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Product/Service Modal */}
      {adding && (
        <div style={{
          position: "fixed",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 20,
          background: "rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <form onSubmit={handleAddSave} style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "34px 38px",
            width: "360px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.13)",
            position: "relative"
          }}>
            <div style={{ fontWeight: "700", fontSize: "20px", color: "#1888A3", marginBottom: "20px" }}>
              Add Product/Service
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={formLabel}>Name</label>
              <input name="name" value={addForm.name} onChange={handleAddChange} style={formInput} placeholder="Product/Service Name" />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={formLabel}>Type</label>
              <select name="type" value={addForm.type} onChange={handleAddChange} style={formInput}>
                <option value="">Select type</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={formLabel}>Price</label>
              <input name="price" type="number" value={addForm.price} onChange={handleAddChange} style={formInput} placeholder="Price" />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "9px" }}>
              <button type="submit" style={{
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "22px",
                padding: "9px 22px",
                fontWeight: "600",
                cursor: "pointer"
              }}>
                Add
              </button>
              <button type="button" style={{
                background: "#eee",
                color: "#222",
                border: "none",
                borderRadius: "22px",
                padding: "9px 22px",
                fontWeight: "500",
                cursor: "pointer"
              }} onClick={handleAddCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
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

const formLabel = {
  display: "block",
  marginBottom: "7px",
  fontWeight: "600"
};

const formInput = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "17px"
};
