import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getItems= async () => {
  const res = await axios.get(`${API_URL}/items`);
  return res.data;
};
