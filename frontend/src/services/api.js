import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Public endpoints that should NEVER send JWT
const publicEndpoints = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
];

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    if (status === 403) {
      console.error("403 Forbidden");
      console.error(error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default api;