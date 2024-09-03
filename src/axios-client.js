import axios from 'axios';

// Create an Axios instance with the base URL from the environment variable
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
