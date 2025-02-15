import axios from "axios";

const API_URL = "https://mystore-backend-qnu3.onrender.com/verse/auth";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.tokens) {
    localStorage.setItem("token", response.data.tokens.access.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};