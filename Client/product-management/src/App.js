import React, { useEffect, useState } from "react";
import { fetchProducts, addProduct, deleteProduct } from "./api";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortPrice, setSortPrice] = useState("asc");

  const loadProducts = async () => {
    const data = await fetchProducts();
    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      console.error("Unexpected response:", data);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = async (product) => {
    if (editingProduct) {
      await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      setEditingProduct(null);
    } else {
      await addProduct(product);
    }
    loadProducts();
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSortChange = (e) => {
    setSortPrice(e.target.value);
  };

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortPrice === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Product Management</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <select
          value={sortPrice}
          onChange={handleSortChange}
          style={styles.select}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        {!showForm && (
          <button onClick={() => setShowForm(true)} style={styles.addButton}>
            Add Product
          </button>
        )}
      </div>

      {showForm && (
        <AddProductForm onAdd={handleAdd} editingProduct={editingProduct} />
      )}

      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(to right, #e0eafc, #cfdef3)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  searchInput: {
    padding: "8px",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "8px 15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
