import axios from "axios";

const api = axios.create({
  baseURL: "https://bank-ledger-backend-p2g0.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;