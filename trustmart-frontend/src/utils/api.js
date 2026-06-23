import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Cannot connect to server.'));
    }
    const message = error.response.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

//  Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  //  Forgot Password 
  forgotPassword: async (data) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },
  
  //  Reset Password 
  resetPassword: async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  getRecentActivity: async () => {
    const response = await api.get('/dashboard/recent-activity');
    return response.data;
  },
  getRevenueTrend: async () => {
    const response = await api.get('/dashboard/revenue-trend');
    return response.data;
  },
  getMonthlyOrders: async () => {
    const response = await api.get('/dashboard/monthly-orders');
    return response.data;
  },
  getPendingActions: async () => {
    const response = await api.get('/dashboard/pending-actions');
    return response.data;
  },
  getSalesHistory: async () => {
    const response = await api.get('/dashboard/sales-history');
    return response.data;
  },
};

export default api;