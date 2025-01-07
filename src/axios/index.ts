import axios, { AxiosError } from 'axios';
import { notify } from "@kyvg/vue3-notification";

interface IErrors {
  ['string']: string
}

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
    if (response.status === 201) notify({
      type: 'success',
      text: `عملیات با موفقیت انجام شد`,
    })

    return response;
  },
  (error: AxiosError) => {
    const title = error.message
    const errors = error.response?.data as IErrors
    for (const error in errors) {
      notify({
        title,
        text: `${error} ${errors[error]}`,
        type: 'error',
        ignoreDuplicates: true,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
