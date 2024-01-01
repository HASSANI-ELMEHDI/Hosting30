import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  emailAddress: string;
  setPassword: (password: string) => void;
  password: string;
  setEmailAddress: (emailAddress: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const authContextValue: AuthContextType = {
    emailAddress,
    setPassword,
    password,
    setEmailAddress,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};