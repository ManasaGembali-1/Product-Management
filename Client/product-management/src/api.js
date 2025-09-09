const API_URL = "http://localhost:5000/api/products";

export async function fetchProducts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
