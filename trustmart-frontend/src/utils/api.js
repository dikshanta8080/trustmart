import axios from 'axios';

// --------------------------------------------
// 1. Base URL – use the backend context path
// --------------------------------------------
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

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
        const { data } = await axios.post(`${API_BASE_URL}/auth/rotate`, {
          refreshToken,
        });

        const newAccessToken = data?.data?.tokenResponse?.accessToken || data?.data?.accessToken;
        const newRefreshToken = data?.data?.tokenResponse?.refreshToken || data?.data?.refreshToken;

        if (newAccessToken) localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

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
// 5. API helpers
// --------------------------------------------
const unwrap = (response) => response?.data?.data ?? response?.data ?? null;

// ----- Authentication -----
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  register: (userData) =>
    apiClient.post('/auth/register', userData),

  getOtp: (email) =>
    apiClient.post(`/auth/get-otp?email=${encodeURIComponent(email)}`),

  changePassword: (payload) =>
    apiClient.post('/auth/change-password', payload),

  logout: () =>
    apiClient.post('/auth/logout'),

  getCurrentUser: () =>
    apiClient.get('/users/profile'),

};

// ----- Dashboard / User Home -----
const unwrapApiData = (payload) => {
  if (payload?.data?.data !== undefined) return payload.data.data;
  if (payload?.data !== undefined) return payload.data;
  return payload;
};

export const usersAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  create: (userData) => apiClient.post('/users', userData),
  update: (id, userData) => apiClient.put(`/users/${id}`, userData),
  delete: (id) => apiClient.delete(`/users/${id}`),
  updateRole: (id, role) => apiClient.put(`/users/${id}/role`, { role }),
};

export const ordersAPI = {
  getMyOrders: (params) => apiClient.get('/orders/my', { params }),
  getById: (id) => apiClient.get(`/orders/${id}`),
  create: (orderData) => apiClient.post('/orders', orderData),
  update: (id, orderData) => apiClient.put(`/orders/${id}`, orderData),
  cancel: (id) => apiClient.delete(`/orders/${id}`),
};

// ----- Dashboard aggregate -----
export const dashboardAPI = {
  getStats: async () => {
    const [profileRes, ordersRes] = await Promise.all([
      authAPI.getCurrentUser(),
      ordersAPI.getMyOrders(),
    ]);

    const profile = unwrap(profileRes);
    const orders = unwrap(ordersRes) || [];
    const totalSales = orders.reduce((sum, order) => sum + Number(order.price || 0), 0);

    return {
      totalListings: 0,
      totalSales,
      totalOrders: orders.length,
      profileViews: 0,
      thisMonthGrowth: 0,
      monthlyOrdersGrowth: 0,
      profile,
    };
  },

  getRecentActivity: async () => {
    const ordersRes = await ordersAPI.getMyOrders();
    const orders = unwrap(ordersRes) || [];

    return orders.slice(0, 4).map((order, index) => ({
      action: `Order ${order.productTitle || 'item'} is ${order.status || 'pending'}`,
      time: `${index + 1} hour${index === 0 ? '' : 's'} ago`,
    }));
  },

  getRevenueTrend: async () => {
    const ordersRes = await ordersAPI.getMyOrders();
    const orders = unwrap(ordersRes) || [];

    return [
      { month: 'Jan', value: 0 },
      { month: 'Feb', value: 0 },
      { month: 'Mar', value: 0 },
      { month: 'Apr', value: 0 },
      { month: 'May', value: 0 },
      { month: 'Jun', value: orders.reduce((sum, order) => sum + Number(order.price || 0), 0) },
    ];
  },

  getMonthlyOrders: async () => {
    const ordersRes = await ordersAPI.getMyOrders();
    const orders = unwrap(ordersRes) || [];

    return [
      { month: 'Jan', orders: 0 },
      { month: 'Feb', orders: 0 },
      { month: 'Mar', orders: 0 },
      { month: 'Apr', orders: 0 },
      { month: 'May', orders: 0 },
      { month: 'Jun', orders: orders.length },
    ];
  },

  getPendingActions: async () => {
    const ordersRes = await ordersAPI.getMyOrders();
    const orders = unwrap(ordersRes) || [];
    return {
      offers: 0,
      ordersToShip: orders.length,
      reviewsToRespond: 0,
    };
  },

  getSalesHistory: async () => {
    const ordersRes = await ordersAPI.getMyOrders();
    const orders = unwrap(ordersRes) || [];

    return orders.map((order, index) => ({
      id: index + 1,
      item: order.productTitle || `Order ${index + 1}`,
      price: Number(order.price || 0),
      date: new Date().toISOString().split('T')[0],
      buyer: order.buyerName || 'Buyer',
    }));
  },
};

// ----- Listings -----
export const listingsAPI = {
  getAll: (params) => apiClient.get('/products', { params }),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (listingData) => apiClient.post('/products', listingData),
  update: (id, listingData) => apiClient.put(`/products/${id}`, listingData),
  delete: (id) => apiClient.delete(`/products/${id}`),
  approve: (id) => apiClient.put(`/products/${id}/approve`),
  reject: (id, reason) => apiClient.put(`/products/${id}/reject`, { reason }),
};

// ----- Categories -----
export const categoriesAPI = {
  getAll: () => apiClient.get('/categories'),
  getById: (id) => apiClient.get(`/categories/${id}`),
  create: (categoryData) => apiClient.post('/categories', categoryData),
  update: (id, categoryData) => apiClient.put(`/categories/${id}`, categoryData),
  delete: (id) => apiClient.delete(`/categories/${id}`),
};

// ----- Reports / Dashboard -----
export const reportsAPI = {
  getDashboardStats: () => apiClient.get('/reports/dashboard'),
  getSalesReport: (params) => apiClient.get('/reports/sales', { params }),
  getUserActivity: (params) => apiClient.get('/reports/user-activity', { params }),
  getFraudAlerts: () => apiClient.get('/reports/fraud-alerts'),
};

// ----- Purchase History -----
export const purchaseAPI = {
  getMyPurchases: (params) => apiClient.get('/purchases', { params }),
  getPurchaseById: (id) => apiClient.get(`/purchases/${id}`),
  createPurchase: (purchaseData) => apiClient.post('/purchases', purchaseData),
  updateStatus: (id, status) => apiClient.put(`/purchases/${id}/status`, { status }),
};

// ----- Fraud Monitoring -----
export const fraudAPI = {
  getAllAlerts: (params) => apiClient.get('/fraud/alerts', { params }),
  resolveAlert: (id, action) => apiClient.put(`/fraud/alerts/${id}`, { action }),
  getFraudStats: () => apiClient.get('/fraud/stats'),
};

// --------------------------------------------
// 6. Default export (optional)
// --------------------------------------------
export default {
  auth: authAPI,
  orders: ordersAPI,
  dashboard: dashboardAPI,
  listings: listingsAPI,
  categories: categoriesAPI,
  users: usersAPI,
  reports: reportsAPI,
  purchases: purchaseAPI,
  fraud: fraudAPI,
};

// --------------------------------------------
// 7. FIX: Export userAPI to match the import in ChangePasswordPage
// --------------------------------------------
export const userAPI = {
  changePassword: authAPI.changePassword,
  // If you need other user methods, add them here
};