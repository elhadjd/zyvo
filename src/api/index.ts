import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export const baseApiURL = 'https://app.zyvoerp.com';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  statusCode: number;
}


// Configuração base do Axios
const axiosConfig: AxiosRequestConfig = {
  baseURL: `${baseApiURL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const apiKey = 'MiHKyHqHwsfNyoP+BVqoJk3zTRD+AMZY4iq6G7hfprrIp0C9uleGWQRzU8yUOPre4aNdN5kaUXC4ejl/lVJk0VUlLXyol5fNPzR0p4TXA7sV8lWUWWIeMx+HUaQIU1jjFC23GEIoVCvzxNFmjb5eEb7SLQ67p2ue56NvkTOEUUQ='

// Instância base do Axios
const axiosInstance: AxiosInstance = axios.create(axiosConfig);


// Interceptor para responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Tratamento global de erros
    if (error.response?.status === 401) {
      // Redirecionar para login se não autorizado
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
      config.headers.Authorization = `Bearer ${apiKey}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const Requests = () => {
  const routeGet = async (router: string) => {
    return await axiosInstance.get(`${router}`);
  };

  const routePost = async (route: string, data: any) => {
    return await axiosInstance.post(route, { ...data });
  };

  const routeDelete = async (route: string) => {
    return await axiosInstance.delete(route);
  };

  return {
    routeGet,
    routePost,
    routeDelete,
  };
};
