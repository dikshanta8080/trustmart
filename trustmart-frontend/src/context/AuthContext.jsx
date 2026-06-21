import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const padPassword = (pwd) => {
    if (!pwd) return pwd;
    if (pwd.length >= 6) return pwd;
    return pwd + 'x'.repeat(6 - pwd.length);
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      setLoading(true);
      const response = await authAPI.login({
        email: email.trim(),
        password: padPassword(password)
      });

      const loginData = response.data;
      const roleNames = loginData.roles?.map(role => role.name) || [];
      
      const userData = {
        id: loginData.id,
        name: loginData.name,
        address: loginData.address,
        email: loginData.email,
        roles: roleNames,
        roleObjects: loginData.roles
      };

      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      setToken(loginData.token);
      setUser(userData);

      const isAdmin = roleNames.some(role => 
        role === "ROLE_ADMIN" || role === "ADMIN" || role === "admin"
      );
      
      if (isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/user/dashboard', { replace: true });
      }

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register({
        name: userData.name.trim(),
        address: userData.address.trim(),
        email: userData.email.trim(),
        password: padPassword(userData.password)
      });
      return { success: true, message: response.message || 'Account created successfully!' };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    setUser(null);
    setToken(null);
    navigate('/login', { replace: true });
  };

  const isAdmin = () => {
    if (!user) return false;
    return user.roles?.some(role => 
      role === "ROLE_ADMIN" || role === "ADMIN" || role === "admin"
    );
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated,
    setUser,
    setToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;