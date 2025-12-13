// src/api.js
// Usa VITE_API_URL definida en tu .env, ejemplo:
// VITE_API_URL=http://localhost:4000/api/v1
export async function postContactForm({ nombre, email, mensaje }) {
  const base = import.meta.env.VITE_API_URL;
  if (!base) throw new Error("API URL no configurada en .env (VITE_API_URL)");
  const url = `${base}/web-contacts`;
  // Mapear los campos al formato esperado por el backend
  const body = { name: nombre, email, message: mensaje };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error en el servidor");
    }
    return await res.json();
  } catch (err) {
    throw new Error(err.message || "Error de red");
  }
}
