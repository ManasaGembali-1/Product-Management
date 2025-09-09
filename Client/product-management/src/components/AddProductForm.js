import React, { useState, useEffect } from "react";

export default function AddProductForm({ onAdd, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    } else {
      setForm({ name: "", price: "", description: "", category: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert("Name and Price are required!");
      return;
    }
    onAdd({ ...form, price: Number(form.price) });
    setForm({ name: "", price: "", description: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <button type="submit">{editingProduct ? "Update" : "Add"} Product</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
};
