import axios from "axios";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? "" : "http://127.0.0.1:8000", // Use proxy in dev, direct URL in prod
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens (when you implement authentication)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token here when you implement authentication
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

// API service functions
export const apiService = {
  // Health check
  health: () => apiClient.get("/health/"),

  // Root endpoint
  getRoot: () => apiClient.get("/"),

  // Users endpoints (placeholder for future implementation)
  users: {
    // getProfile: () => apiClient.get('/api/users/profile/'),
    // register: (data) => apiClient.post('/api/users/register/', data),
    // login: (data) => apiClient.post('/api/users/login/', data),
  },

  // Workouts endpoints (placeholder for future implementation)
  workouts: {
    // getAll: () => apiClient.get('/api/workouts/'),
    // getById: (id) => apiClient.get(`/api/workouts/${id}/`),
    // create: (data) => apiClient.post('/api/workouts/', data),
    // update: (id, data) => apiClient.put(`/api/workouts/${id}/`, data),
    // delete: (id) => apiClient.delete(`/api/workouts/${id}/`),
  },
};

export default apiClient;
