import React, { useEffect, useMemo } from 'react'
import { useAuth } from '../../lib/hooks/useAuth';
import { LoginDTO } from '../../lib/dto/LoginDTO';
import { initialContextValue } from './constants/initialValues';
import { IGetAuthResponse } from '../../lib/responses/getAuth';
import { SignUpFormType } from '../../lib/types/forms/SignUpForm';
import { LogInFormType } from '../../lib/types/forms/LoginForm';
import { Role } from '../../lib/enums/role.enum';
import { useNavigate } from 'react-router';

export type AuthContextType = {
  user?: IGetAuthResponse;
  isAdmin?: boolean;
  login: (data: LogInFormType) => Promise<void>;
  signUp: (data: SignUpFormType) => Promise<void>;
  logout: () => void;
  isLoginPending: boolean;
}

export const AuthContext = React.createContext<AuthContextType>(initialContextValue);

type AuthProviderProps = {
  children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const navigate = useNavigate();
  const {
    error,
    user,
    loginMutation,
    signUpMutation,
    invalidateAuth,
  } = useAuth();
  const login = async (data: LoginDTO) => {
    loginMutation.mutate(data);
  }
  const signUp = async (data: SignUpFormType) => {
    signUpMutation.mutate(data);
  }
  const logout = () => {
    localStorage.removeItem('token');
    invalidateAuth();
  }
  useEffect(()=>{
    if(error) {
      navigate('/login')
    };
  }, [error])
  const isAdmin = useMemo(() => user?.roles?.some(role => (
    role === Role.ADMIN ||
    role === Role.OWNER ||
    role === Role.MASTER
  )), [user]);
  return (
    <AuthContext.Provider value={{
      user: error ? undefined : user,
      isAdmin,
      login,
      signUp,
      logout,
      isLoginPending: loginMutation.isPending,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider