import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://stage.achareh.ir/api/', // Base URL for all requests
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
    'Authorization': `Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4`, // Authorization header if needed
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
