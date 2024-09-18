import axios from "axios";

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (typeof window !== 'undefined') {
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(baseURL.includes('/admin') ? 'adminToken' : 'jwtToken');
        if (token) {
          config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => {
        console.log(response);
        if (response?.data?.message === "jwt expired") {
          localStorage.removeItem(baseURL.includes('/admin') ? 'adminToken' : 'jwtToken');
          window.location.replace('/login');
        }
        return response;
      },
      (error) => {
        if (error?.response?.data?.message === "jwt expired") {
          localStorage.removeItem(baseURL.includes('/admin') ? 'adminToken' : 'jwtToken');
          window.location.replace('/login');
        }
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

export const axiosInstance = createAxiosInstance("http://localhost:3001/api/users");
export const adminaxiosInstance = createAxiosInstance("http://localhost:3001/api/admin");
