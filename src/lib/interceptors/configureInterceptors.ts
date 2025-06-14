import axios, { AxiosError } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVICE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message: string, statusCode: number }>) => {
    if(
      (error.response?.status === 401 || error.response?.status === 403) &&
      error.response?.config?.url !== "/auth" &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/logout" &&
      window.location.pathname !== "/signup"
    ) {
      localStorage.removeItem("token");
      window.location.assign("/login");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
