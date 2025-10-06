// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.plotune.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
