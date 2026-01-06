// src/config.js
export const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "http://192.168.0.106:8080";
