"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/apis/usuarioApi';

export type UserType = 'ADMINISTRADOR' | 'PADRAO' ;

interface User {
  id: string;
  email: string;
  nome: string;
  tipo: UserType;
   permissoes: string[]; // Adiciona permissoes como array de strings
}


interface AuthContextType {
  user: User | null;
  permissions: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<{ success: boolean; userType?: string }>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Verificar se o usuário está autenticado ao carregar a página
  const checkAuth = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
   
      
      // Verifica se existe um cookie de sessão fazendo uma requisição para o backend
      const response = await fetch(api.verify, {
        method: 'GET',
        credentials: 'include', // Inclui cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

    

      if (response.ok) {
        const userData = await response.json();
      
        setUser(userData.user);
        setPermissions(userData.permissions || []);
        return true;
      } else {
        console.log('❌ Verificação falhou:', await response.text());
        setUser(null);
        setPermissions([]);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro ao verificar autenticação:', error);
      setUser(null);
      setPermissions([]);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de login inteligente
  const login = async (
    email: string, 
    senha: string
  ): Promise<{ success: boolean; userType?: string }> => {
    try {
 
      const response = await fetch(api.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();


      if (response.ok && data.user) {
        // Definir o usuário temporariamente
        setUser(data.user);
        
        // Carregar permissões fazendo uma nova verificação
        const authSuccess = await checkAuth();
        if (!authSuccess) {
          console.error('Erro ao carregar permissões após login');
          return { success: false };
        }        
        return { 
          success: true, 
          userType: data.userType || data.user.tipo 
        };
      } else {

        setUser(null);
        setPermissions([]);
        console.error('Erro no login:', data.error || 'Erro desconhecido');
        return { success: false };
      }
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
      setUser(null);
      setPermissions([]);
      return { success: false };
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      // Chamar endpoint de logout no backend para limpar cookies
      await fetch(api.logout, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setUser(null);
      setPermissions([]);
    }
  };

  // // Verificar permissão local (mais rápido)
  // const hasPermission = (permission: string): boolean => {
  //   return permissions.includes(permission);
  // };

  // // Verificar permissão no servidor (mais confiável)
  // const checkPermissionAsync = async (permission: string): Promise<boolean> => {
  //   try {
  //     const response = await fetch(`${api.verify}?permission=${permission}`, {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       return result.hasPermission;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error('Erro ao verificar permissão:', error);
  //     return false;
  //   }
  // };

  // Verificar autenticação ao montar o componente
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    permissions,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
}