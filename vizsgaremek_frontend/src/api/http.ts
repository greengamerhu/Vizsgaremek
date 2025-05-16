// services/http.ts
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // vagy akár .env-ből
  timeout: 5000,
  withCredentials : true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ha van auth token, ide beállíthatod automatikusan minden kéréshez:
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // vagy máshonnan
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;