import axios, { AxiosError } from "axios";
import { useViewContext } from "../hooks/contextHooks/useViewContext";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/contextHooks/useAuthContext";

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
export const configureInterceptors = () => {
  const { notification } = useViewContext();
  const { logout } = useAuthContext();
  const location = useLocation();
  useEffect(()=>{
  
    axios.interceptors.response.use(
      async (response) => {
        // if (
        //   response.config.url !== "/auth" &&
        //   response.config.url !== "/auth/login" &&
        //   response.config.url !== "/auth/signup"
        // ) {
        //   await new Promise((resolve) => setTimeout(resolve, 5000));
        // }
  
        return response;
      },
      (error: AxiosError<{ message: string, statusCode: number }>) => {
        if(
          (error.response?.status === 401 || error.response?.status === 403) &&
          error.response?.config?.url !== "/auth" &&
          location.pathname !== "/login" &&
          location.pathname !== "/logout" &&
          location.pathname !== "/signup"
        ) {
          return logout();
        }
        if(
          error.response?.config?.url !== "/auth"
        ) {
          notification.show({
            content: error.response?.data?.message,
            severity: "error",
          });
        }
        return Promise.reject(error);
      },
    );
  }, [])
};
