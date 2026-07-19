import axios from 'axios';

// --------------------------------------------
// 1. Base URL – use the backend context path
// --------------------------------------------
<<<<<<< HEAD
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
=======
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1';
>>>>>>> 7b2c709c8ec9f9cb4f2714dad2e9143386fa6684

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
<<<<<<< HEAD

=======
        // Spring Boot refresh endpoint – adjust if different
>>>>>>> 7b2c709c8ec9f9cb4f2714dad2e9143386fa6684
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

<<<<<<< HEAD
  getOtp: (email) =>
    apiClient.post(`/auth/get-otp?email=${encodeURIComponent(email)}`),

  changePassword: (payload) =>
    apiClient.post('/auth/change-password', payload),
=======
  forgotPassword: (email) =>
    apiClient.post('/auth/get-otp', null, { params: { email } }),

  resetPassword: (email, otp, newPassword) =>
    apiClient.post('/auth/change-password', {
      email,
      otp,
      newPassword,
    }),
>>>>>>> 7b2c709c8ec9f9cb4f2714dad2e9143386fa6684

  logout: () =>
    apiClient.post('/auth/logout'),

  getCurrentUser: () =>
    apiClient.get('/users/profile'),
<<<<<<< HEAD
=======
};

// ----- Dashboard / User Home -----
const unwrapApiData = (payload) => {
  if (payload?.data?.data !== undefined) return payload.data.data;
  if (payload?.data !== undefined) return payload.data;
  return payload;
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.content)) return value.content;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

const getMonthKey = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const numberOrZero = (value) => Number(value || 0);

export const dashboardAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  getMyListings: () => apiClient.get('/products'),
  getMyOrders: () => apiClient.get('/orders/my-orders'),
  getSellerOrders: () => apiClient.get('/orders/seller-orders'),
  getWishlist: () => apiClient.get('/wishlist'),
  getMyReviews: () => apiClient.get('/reviews/my-reviews'),

  getStats: async () => {
    const [profileRes, listingsRes, myOrdersRes, sellerOrdersRes, wishlistRes] = await Promise.allSettled([
      dashboardAPI.getProfile(),
      dashboardAPI.getMyListings(),
      dashboardAPI.getMyOrders(),
      dashboardAPI.getSellerOrders(),
      dashboardAPI.getWishlist(),
    ]);

    const profile = unwrapApiData(profileRes.value || {});
    const listings = normalizeArray(unwrapApiData(listingsRes.value || {}));
    const myOrders = normalizeArray(unwrapApiData(myOrdersRes.value || {}));
    const sellerOrders = normalizeArray(unwrapApiData(sellerOrdersRes.value || {}));
    const wishlist = normalizeArray(unwrapApiData(wishlistRes.value || {}));

    const totalSales = sellerOrders.reduce((sum, order) => sum + numberOrZero(order.price), 0);

    return {
      totalListings: listings.length,
      totalSales,
      totalOrders: myOrders.length + sellerOrders.length,
      profileViews: 0,
      thisMonthGrowth: Math.min(99, Math.max(0, Math.round((wishlist.length || 0) * 2))),
      monthlyOrdersGrowth: Math.min(99, Math.max(0, Math.round((myOrders.length + sellerOrders.length) * 5))),
      profile,
    };
  },

  getRecentActivity: async () => {
    const [myOrdersRes, sellerOrdersRes, myReviewsRes] = await Promise.allSettled([
      dashboardAPI.getMyOrders(),
      dashboardAPI.getSellerOrders(),
      dashboardAPI.getMyReviews(),
    ]);

    const myOrders = normalizeArray(unwrapApiData(myOrdersRes.value || {}));
    const sellerOrders = normalizeArray(unwrapApiData(sellerOrdersRes.value || {}));
    const myReviews = normalizeArray(unwrapApiData(myReviewsRes.value || {}));

    const activity = [
      ...myOrders.slice(0, 2).map((order) => ({
        action: `Order ${order.status || 'placed'} for ${order.productTitle || 'product'}`,
        time: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent order',
      })),
      ...sellerOrders.slice(0, 2).map((order) => ({
        action: `Sale ${order.status || 'processed'} for ${order.productTitle || 'product'}`,
        time: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent sale',
      })),
      ...myReviews.slice(0, 2).map((review) => ({
        action: `Review received for ${review.productTitle || 'product'}`,
        time: review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent review',
      })),
    ];

    return activity.slice(0, 5);
  },

  getRevenueTrend: async () => {
    const sellerOrdersRes = await Promise.allSettled([dashboardAPI.getSellerOrders()]);
    const sellerOrders = normalizeArray(unwrapApiData(sellerOrdersRes[0].value || {}));

    const grouped = sellerOrders.reduce((acc, order) => {
      const monthKey = getMonthKey(order.createdAt || order.orderDate);
      if (!monthKey) return acc;
      acc[monthKey] = (acc[monthKey] || 0) + numberOrZero(order.price);
      return acc;
    }, {});

    const months = Object.entries(grouped).slice(-6);
    return months.map(([month, value]) => ({
      month: month.split('-')[1] ? new Date(`${month}-01`).toLocaleString('en-US', { month: 'short' }) : month,
      value,
    }));
  },

  getMonthlyOrders: async () => {
    const myOrdersRes = await Promise.allSettled([dashboardAPI.getMyOrders()]);
    const myOrders = normalizeArray(unwrapApiData(myOrdersRes[0].value || {}));

    const grouped = myOrders.reduce((acc, order) => {
      const monthKey = getMonthKey(order.createdAt || order.orderDate);
      if (!monthKey) return acc;
      acc[monthKey] = (acc[monthKey] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).slice(-6).map(([month, orders]) => ({
      month: new Date(`${month}-01`).toLocaleString('en-US', { month: 'short' }),
      orders,
    }));
  },

  getPendingActions: async () => {
    const [sellerOrdersRes, reviewsRes] = await Promise.allSettled([
      dashboardAPI.getSellerOrders(),
      dashboardAPI.getMyReviews(),
    ]);

    const sellerOrders = normalizeArray(unwrapApiData(sellerOrdersRes.value || {}));
    const reviews = normalizeArray(unwrapApiData(reviewsRes.value || {}));
    const ordersToShip = sellerOrders.filter((order) => (order.status || '').toUpperCase() === 'PENDING').length;

    return {
      offers: 0,
      ordersToShip,
      reviewsToRespond: reviews.length,
    };
  },

  getSalesHistory: async () => {
    const sellerOrdersRes = await Promise.allSettled([dashboardAPI.getSellerOrders()]);
    const sellerOrders = normalizeArray(unwrapApiData(sellerOrdersRes[0].value || {}));

    return sellerOrders.slice(0, 5).map((order, index) => ({
      id: order.id || index + 1,
      item: order.productTitle || 'Product',
      price: numberOrZero(order.price),
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent',
      buyer: order.buyerName || 'Buyer',
    }));
  },
>>>>>>> 7b2c709c8ec9f9cb4f2714dad2e9143386fa6684
};

// ----- Orders -----
export const ordersAPI = {
  getMyOrders: () => apiClient.get('/orders/my-orders'),
  getSellerOrders: () => apiClient.get('/orders/seller-orders'),
};

// ----- Users -----
export const usersAPI = {
  getAll: (params) => apiClient.get('/users', { params }),
  getById: (id) => apiClient.get(`/users/${id}`),
  getProfile: () => apiClient.get('/users/profile'),
  create: (userData) => apiClient.post('/users', userData),
  update: (id, userData) => apiClient.put(`/users/${id}`, userData),
  delete: (id) => apiClient.delete(`/users/${id}`),
  updateRole: (id, role) => apiClient.put(`/users/${id}/role`, { role }),
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