import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getChampions = async () => {
  const res = await axios.get(`${API_URL}/champions`);
  return res.data;
};
