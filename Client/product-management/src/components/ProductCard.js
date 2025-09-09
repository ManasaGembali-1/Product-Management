import React from "react";

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
      <p>
        <b>{product.category}</b>
      </p>
      <div style={{ display: "flex", gap: "5px" }}>
        <button style={styles.editButton} onClick={() => onEdit(product)}>
          Edit
        </button>
        <button
          style={styles.deleteButton}
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px",
    borderRadius: "10px",
    width: "220px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
