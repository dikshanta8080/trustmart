import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);
const normalizeUser = (userData) => {
  if (!userData) return null;

  const roleValue = userData.role ?? userData.roles ?? [];
  const roles = Array.isArray(roleValue)
    ? roleValue
    : roleValue
      ? [roleValue]
      : [];

  return {
    ...userData,
    roles: roles.map((role) => {
      if (typeof role === 'string') return role;
      if (role?.name) return role.name;
      return role;
    }),
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      authAPI
        .getCurrentUser()
        .then((response) => {
          const profile = response?.data?.data ?? response?.data ?? response;
          setUser(normalizeUser(profile));
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      const payload = response?.data?.data ?? response?.data ?? response;
      const accessToken = payload?.tokenResponse?.accessToken || payload?.accessToken;
      const refreshToken = payload?.tokenResponse?.refreshToken || payload?.refreshToken;

      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

      const normalizedUser = normalizeUser(payload);
      setUser(normalizedUser);
      return payload;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      // ignore logout errors
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const response = await authAPI.register(userData);
      return response?.data?.data ?? response?.data ?? response;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};