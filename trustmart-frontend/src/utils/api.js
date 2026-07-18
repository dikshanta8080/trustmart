import axios from 'axios';

// --------------------------------------------
// 1. Base URL – set in .env file
// --------------------------------------------
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1';

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
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  register: (userData) =>
    apiClient.post('/auth/register', userData),

  forgotPassword: (email) =>
    apiClient.post('/auth/get-otp', null, { params: { email } }),

  resetPassword: (email, otp, newPassword) =>
    apiClient.post('/auth/change-password', {
      email,
      otp,
      newPassword,
    }),

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