import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getCurrentUser, User } from '../utils/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// PUBLIC_INTERFACE
/**
 * Authentication provider component for managing mock auth state
 * Simulates login/logout functionality without backend
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // PUBLIC_INTERFACE
  /**
   * Mock login function - accepts any credentials
   * @param username - Username (not validated in mock)
   * @param _password - Password (not validated in mock)
   */
  const login = async (username: string, _password: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock authentication - always succeeds
    const currentUser = getCurrentUser();
    currentUser.username = username || 'demo_user';
    
    setIsAuthenticated(true);
    setUser(currentUser);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(currentUser));
  };

  // PUBLIC_INTERFACE
  /**
   * Mock logout function - clears auth state
   */
  const logout = (): void => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook to access auth context
 * @returns AuthContextType object with auth state and methods
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
