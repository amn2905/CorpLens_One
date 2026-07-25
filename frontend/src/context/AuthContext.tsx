import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'usr-001',
    email: 'analyst@corplens.ai',
    full_name: 'Sarah Jenkins',
    role: 'Lead Intelligence Analyst',
    tenant_id: 'tenant-enterprise-001',
    organization_name: 'CorpLens Security & Risk Inc.'
  });

  const login = async (email: string, pass: string) => {
    setUser({
      id: 'usr-001',
      email,
      full_name: email.split('@')[0].toUpperCase(),
      role: 'Analyst',
      tenant_id: 'tenant-enterprise-001',
      organization_name: 'CorpLens OSINT'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
