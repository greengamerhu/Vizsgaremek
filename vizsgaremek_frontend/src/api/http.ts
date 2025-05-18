
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 5000,
  withCredentials : true,
  headers: {
    'Content-Type': 'application/json',
  },
});


http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;