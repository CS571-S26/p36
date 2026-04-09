import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllComps = async (sort?: 'mostLiked' | 'recent') => {
  const { data } = await axios.get(`${API_URL}/comps`, {
    params: { sort }
  });
  return data;
};