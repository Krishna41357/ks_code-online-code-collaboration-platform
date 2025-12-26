import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Configure axios defaults
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      setToken(storedToken);
    }
  }, []);

  // Check if user is logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // Verify token is still valid
          const { data } = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });

          if (data.success) {
            setUser(data.data.user);
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            // Token invalid, clear storage
            logout();
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (data.success) {
        const { token: newToken, user: newUser } = data.data;
        
        // Store in localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        // Update state
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        toast.success(data.message || 'Login successful');
        return { success: true, data: data.data };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });

      if (data.success) {
        const { token: newToken, user: newUser } = data.data;
        
        // Store in localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        // Update state
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        toast.success(data.message || 'Registration successful');
        return { success: true, data: data.data };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Google login function
  const googleLogin = async (credential) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/google`, {
        credential
      });

      if (data.success) {
        const { token: newToken, user: newUser } = data.data;
        
        // Store in localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        // Update state
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        toast.success(data.message || 'Google login successful');
        return { success: true, data: data.data };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Google login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear axios default header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    toast.success('Logged out successfully');
  };

  // Update user profile
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    googleLogin,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;