
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://67dd0bb5e00db03c4069f04d.mockapi.io/api',
  timeout: 5000,
});

export default axiosInstance;