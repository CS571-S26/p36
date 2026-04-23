import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, password });
  return res.data;
};

export const registerUser = async (username: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  return res.data;
}