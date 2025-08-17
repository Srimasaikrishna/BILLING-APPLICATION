import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "Laptop", type: "Product", price: 55000 },
  { id: 2, name: "Service", type: "Service", price: 1500 },
  { id: 3, name: "Keyboard", type: "Product", price: 1200 },
  { id: 4, name: "Consultation", type: "Service", price: 500 },
  { id: 5, name: "Headphones", type: "Product", price: 3200 }
];

export default function ProductCatalog() {
  const [products, setProducts] = useState(initialProducts);
  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", type: "", price: "" });

  // For adding new product/service
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', type: '', price: '' });

  // Filter products by type and price
  const filteredProducts = products.filter((p) => {
    const matchesType = !filterType || p.type === filterType;
    const matchesMin = !minPrice || p.price >= Number(minPrice);
    const matchesMax = !maxPrice || p.price <= Number(maxPrice);
    return matchesType && matchesMin && matchesMax;
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
    setProducts((prev) =>
      prev.map((p) =>
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
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  // Add product handlers
  function handleAddClick() {
    setAdding(true);
    setAddForm({ name: '', type: '', price: '' });
  }

  function handleAddChange(e) {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddSave() {
    if (!addForm.name || !addForm.type || !addForm.price) {
      alert('Please fill all fields.');
      return;
    }
    const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts(prev =>
      [...prev, { id: nextId, name: addForm.name, type: addForm.type, price: Number(addForm.price) }]
    );
    setAdding(false);
  }

  function handleAddCancel() {
    setAdding(false);
    setAddForm({ name: '', type: '', price: '' });
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      marginTop: "30px",
      padding: "28px 38px",
      boxShadow: "0 0 12px rgba(0,0,0,0.07)",
      maxWidth: "900px",
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{
        fontSize: "25px",
        fontWeight: "700",
        color: "#1888A3",
        marginBottom: "25px"
      }}>Product/Service Catalog</h2>

      {/* Filters row */}
      <div style={{
        display: "flex",
        gap: "18px",
        alignItems: "center",
        marginBottom: "15px"
      }}>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          style={{
            border: "1px solid #d1d1d1",
            borderRadius: "10px",
            padding: "8px 18px",
            fontSize: "17px"
          }}
        >
          <option value="">Type</option>
          <option value="Product">Product</option>
          <option value="Service">Service</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{
            border: "1px solid #d1d1d1",
            borderRadius: "10px",
            padding: "8px 18px",
            fontSize: "17px",
            width: "120px"
          }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{
            border: "1px solid #d1d1d1",
            borderRadius: "10px",
            padding: "8px 18px",
            fontSize: "17px",
            width: "120px"
          }}
        />
      </div>

      {/* Data table */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
        <thead>
          <tr style={{ background: "#f6f6f6" }}>
            <th style={thStyle}>Id</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Add Row at the top if adding */}
          {adding && (
            <tr>
              <td style={tdStyle}>New</td>
              <td style={tdStyle}>
                <input
                  name="name"
                  value={addForm.name}
                  onChange={handleAddChange}
                  style={inputEditStyle}
                  placeholder="Name"
                />
              </td>
              <td style={tdStyle}>
                <select
                  name="type"
                  value={addForm.type}
                  onChange={handleAddChange}
                  style={inputEditStyle}
                >
                  <option value="">Select type</option>
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </td>
              <td style={tdStyle}>
                <input
                  name="price"
                  type="number"
                  value={addForm.price}
                  onChange={handleAddChange}
                  style={inputEditStyle}
                  placeholder="Price"
                />
              </td>
              <td style={tdStyle}>
                <button style={saveBtn} onClick={handleAddSave}>Save</button>{" "}
                <button style={cancelBtn} onClick={handleAddCancel}>Cancel</button>
              </td>
            </tr>
          )}
          {/* List products */}
          {filteredProducts.length
            ? filteredProducts.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #eaeaea", textAlign: "center" }}>
                  <td style={tdStyle}>{product.id}</td>
                  <td style={tdStyle}>
                    {editingId === product.id ? (
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        style={inputEditStyle}
                      />
                    ) : product.name}
                  </td>
                  <td style={tdStyle}>
                    {editingId === product.id ? (
                      <select
                        name="type"
                        value={editForm.type}
                        onChange={handleEditChange}
                        style={inputEditStyle}
                      >
                        <option value="Product">Product</option>
                        <option value="Service">Service</option>
                      </select>
                    ) : product.type}
                  </td>
                  <td style={tdStyle}>
                    {editingId === product.id ? (
                      <input
                        name="price"
                        type="number"
                        value={editForm.price}
                        onChange={handleEditChange}
                        style={inputEditStyle}
                      />
                    ) : (
                      <>₹{product.price.toLocaleString()}</>
                    )}
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
              ))
            : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                    No products/services found
                  </td>
                </tr>
              )}
        </tbody>
      </table>
      {/* Add Product/Service button */}
      {!adding && (
        <div style={{ textAlign: "right", marginTop: "22px" }}>
          <button
            style={{
              background: "#111",
              color: "#fff",
              fontWeight: "600",
              border: "none",
              borderRadius: "22px",
              padding: "10px 38px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={handleAddClick}
          >
            add product/service
          </button>
        </div>
      )}
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
