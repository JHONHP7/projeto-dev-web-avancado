import { useState, useEffect, createContext, useContext } from 'react';
import { AuthContextType, User } from '../interfaces/interfaces';

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  getCurrentUser: async () => {},
});

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/usuario/logado`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        logout();
      }
    } catch (error) {
      console.error('Erro ao buscar usuário logado:', error);
      logout();
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 