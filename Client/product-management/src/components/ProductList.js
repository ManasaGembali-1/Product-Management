import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onDelete, onEdit }) {
  return (
    <div style={styles.list}>
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    flexWrap: "wrap",
  },
};
