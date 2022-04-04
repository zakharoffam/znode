import axios from "axios";

const currentAccessToken = localStorage.getItem('access-token');
const API = axios.create({
  headers: {
    'x-access-token': currentAccessToken || '',
  },
});

API.interceptors.response.use((res) => {
  const newToken = res.headers['x-access-token'];
  if (newToken) {
    localStorage.setItem('x-access-token', newToken);
  }
  return res;
});

export default API;
