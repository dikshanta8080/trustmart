import axios from 'axios';

// --------------------------------------------
// 1. Base URL – set in .env file
// --------------------------------------------
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// --------------------------------------------
// 2. Axios instance
// --------------------------------------------
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// --------------------------------------------
// 3. Request interceptor – add JWT token
// --------------------------------------------
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------------------------------
// 4. Response interceptor – token refresh (optional)
// --------------------------------------------
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        // Spring Boot refresh endpoint – adjust if different
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        // Spring Boot often returns { accessToken, refreshToken } or just accessToken
        const newAccessToken = data.accessToken || data.token;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// --------------------------------------------
// 5. API modules – adjust endpoints to your Java controllers
// --------------------------------------------

// ----- Authentication -----
export const authAPI = {
  // POST /auth/login – body: { email, password }
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  // POST /auth/register – body: user registration object
  register: (userData) =>
    apiClient.post('/auth/register', userData),

  // POST /auth/forgot-password – body: { email }
  forgotPassword: (email) =>
    apiClient.post('/auth/forgot-password', { email }),

  // POST /auth/reset-password – body: { token, newPassword }
  resetPassword: (token, newPassword) =>
    apiClient.post('/auth/reset-password', { token, newPassword }),

  // POST /auth/logout – if needed
  logout: () =>
    apiClient.post('/auth/logout'),

  // GET /auth/me – get current user profile
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
};

// ----- Listings -----
export const listingsAPI = {
  // GET /listings?page=0&size=10&search=...&category=...
  getAll: (params) =>
    apiClient.get('/listings', { params }),

  // GET /listings/{id}
  getById: (id) =>
    apiClient.get(`/listings/${id}`),

  // POST /listings – body: listing object
  create: (listingData) =>
    apiClient.post('/listings', listingData),

  // PUT /listings/{id}
  update: (id, listingData) =>
    apiClient.put(`/listings/${id}`, listingData),

  // DELETE /listings/{id}
  delete: (id) =>
    apiClient.delete(`/listings/${id}`),

  // PUT /listings/{id}/approve (or /listings/approve/{id} – adjust)
  approve: (id) =>
    apiClient.put(`/listings/${id}/approve`),

  // PUT /listings/{id}/reject – body: { reason }
  reject: (id, reason) =>
    apiClient.put(`/listings/${id}/reject`, { reason }),
};

// ----- Categories -----
export const categoriesAPI = {
  // GET /categories
  getAll: () =>
    apiClient.get('/categories'),

  // GET /categories/{id}
  getById: (id) =>
    apiClient.get(`/categories/${id}`),

  // POST /categories
  create: (categoryData) =>
    apiClient.post('/categories', categoryData),

  // PUT /categories/{id}
  update: (id, categoryData) =>
    apiClient.put(`/categories/${id}`, categoryData),

  // DELETE /categories/{id}
  delete: (id) =>
    apiClient.delete(`/categories/${id}`),
};

// ----- Users -----
export const usersAPI = {
  // GET /users?page=0&size=10&search=...
  getAll: (params) =>
    apiClient.get('/users', { params }),

  // GET /users/{id}
  getById: (id) =>
    apiClient.get(`/users/${id}`),

  // POST /users
  create: (userData) =>
    apiClient.post('/users', userData),

  // PUT /users/{id}
  update: (id, userData) =>
    apiClient.put(`/users/${id}`, userData),

  // DELETE /users/{id}
  delete: (id) =>
    apiClient.delete(`/users/${id}`),

  // PUT /users/{id}/role – body: { role }
  updateRole: (id, role) =>
    apiClient.put(`/users/${id}/role`, { role }),
};

// ----- Reports / Dashboard -----
export const reportsAPI = {
  // GET /reports/dashboard – get stats cards
  getDashboardStats: () =>
    apiClient.get('/reports/dashboard'),

  // GET /reports/sales?start=...&end=...
  getSalesReport: (params) =>
    apiClient.get('/reports/sales', { params }),

  // GET /reports/user-activity
  getUserActivity: (params) =>
    apiClient.get('/reports/user-activity', { params }),

  // GET /reports/fraud-alerts
  getFraudAlerts: () =>
    apiClient.get('/reports/fraud-alerts'),
};

// ----- Purchase History -----
export const purchaseAPI = {
  // GET /purchases?page=0&size=10
  getMyPurchases: (params) =>
    apiClient.get('/purchases', { params }),

  // GET /purchases/{id}
  getPurchaseById: (id) =>
    apiClient.get(`/purchases/${id}`),

  // POST /purchases – body: purchase data
  createPurchase: (purchaseData) =>
    apiClient.post('/purchases', purchaseData),

  // PUT /purchases/{id}/status – body: { status }
  updateStatus: (id, status) =>
    apiClient.put(`/purchases/${id}/status`, { status }),
};

// ----- Fraud Monitoring -----
export const fraudAPI = {
  // GET /fraud/alerts?page=0&size=10
  getAllAlerts: (params) =>
    apiClient.get('/fraud/alerts', { params }),

  // PUT /fraud/alerts/{id} – body: { action }
  resolveAlert: (id, action) =>
    apiClient.put(`/fraud/alerts/${id}`, { action }),

  // GET /fraud/stats
  getFraudStats: () =>
    apiClient.get('/fraud/stats'),
};

// --------------------------------------------
// 6. Default export (optional)
// --------------------------------------------
export default {
  auth: authAPI,
  listings: listingsAPI,
  categories: categoriesAPI,
  users: usersAPI,
  reports: reportsAPI,
  purchases: purchaseAPI,
  fraud: fraudAPI,
};