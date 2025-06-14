import { AxiosError, AxiosResponse } from "axios"
import { httpGETAuth, httpPOSTLogin, httpPOSTSignUp } from "../services/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IGetAuthResponse } from "../responses/getAuth"
import { LoginDTO } from "../dto/LoginDTO"
import { SignUpDTO } from "../dto/SignUpDTO"
import { useNavigate } from "react-router"
import { APIBaseError } from "../types/errors/commonError.type"

export const useAuth = () => {
  const navigate = useNavigate();
  const onSuccessAuth = (token: string) => {
    localStorage.setItem('token', token);
    navigate('/');
  };
  const queryClient = useQueryClient();
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<IGetAuthResponse>, AxiosError<APIBaseError>>({
    queryKey: ['auth'],
    queryFn: httpGETAuth,
    staleTime: Infinity,
    retry: false,
    enabled: !!localStorage.getItem('token'),
  });
  const invalidateAuth = () => {
    queryClient.invalidateQueries({
      queryKey: ['auth'],
      exact: true,
    });
  }
  const invalidateAllQueries = () => queryClient.invalidateQueries();
  const loginMutation = useMutation<AxiosResponse<any>, AxiosError<APIBaseError>, LoginDTO>({
    mutationFn: (data: LoginDTO) => httpPOSTLogin(data),
    onSuccess: (data) => {
      invalidateAuth();
      onSuccessAuth(data.data.token);
    },
  });
  const signUpMutation = useMutation<AxiosResponse<any>, AxiosError<APIBaseError>, SignUpDTO>({
    mutationFn: (data: SignUpDTO) => httpPOSTSignUp(data),
    onSuccess: (data) => {
      invalidateAuth();
      onSuccessAuth(data.data.token);
    },
  });
  return {
    user: response?.data,
    isLoading,
    error,
    loginMutation,
    signUpMutation,
    invalidateAuth,
    invalidateAllQueries,
  }
}