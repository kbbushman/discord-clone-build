import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    switch (status) {
      case 403:
        localStorage.removeItem('user-storage');
        window.location.replace('/login');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);
