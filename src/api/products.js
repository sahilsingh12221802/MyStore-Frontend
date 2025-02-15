import axios from "axios";

const API_URL = "https://mystore-backend-qnu3.onrender.com/verse/products";

const getProducts = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

const getProductById = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

export default {
  getProducts,
  getProductById,
};