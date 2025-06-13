import axios from 'axios';

const HTML = 'https://fakestoreapi.com';

export const handleLogin = async (username, password) => {
  const credentials = { username, password };
  const response = await axios.post(`${HTML}/auth/login`, credentials, {
    headers: { 'Content-Type': 'application/json' }
  });
  console.log('Login response:', response?.data);
  return response?.data;
};
