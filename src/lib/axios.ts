import axios from 'axios';

const BASE_URL = import.meta.env.PROD 
  ? 'https://your-render-api.onrender.com' 
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;