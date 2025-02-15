import axios from "axios";

const API_URL = "https://mystore-backend-qnu3.onrender.com/verse/cart";

const getCart = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const addProductToCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const updateProductInCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const checkout = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/checkout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export default {
  getCart,
  addProductToCart,
  updateProductInCart,
  checkout,
};