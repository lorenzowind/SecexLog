import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

import { UserOperationsData } from './modules/user';

export interface SignInCredentials {
  login: string;
  password: string;
}

export interface AuthState {
  user: UserOperationsData;
  token: string;
}

interface AuthContextData extends AuthState {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@SecexLog:user');
    const token = localStorage.getItem('@SecexLog:token');

    if (token && user) {
      return { user: JSON.parse(user), token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ login, password }) => {
    const response = await api.post<AuthState>('sessions', {
      login,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@SecexLog:user', JSON.stringify(user));
    localStorage.setItem('@SecexLog:token', token);

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SecexLog:user');
    localStorage.removeItem('@SecexLog:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
