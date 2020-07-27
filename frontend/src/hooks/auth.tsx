import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  // login: User name to sign in
  login: string;
  senha: string;
}

export interface UserResponse {
  id: number;
  login: string;
  nome: string;
  email: string;
  cargo: string;
  iat: number;
  exp: number;
  token: string;
}

interface AuthState {
  user: UserResponse;
  token: string;
}

interface AuthContextData extends AuthState {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SecexLog:token');
    const user = localStorage.getItem('@SecexLog:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ login, senha }) => {
    const response = await api.post<UserResponse>('login', {
      login,
      senha,
    });

    const user = response.data;
    const { token } = response.data;

    localStorage.setItem('@SecexLog:user', JSON.stringify(user));
    localStorage.setItem('@SecexLog:token', token);

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SecexLog:token');
    localStorage.removeItem('@SecexLog:user');

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
