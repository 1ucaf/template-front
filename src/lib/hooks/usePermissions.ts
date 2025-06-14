import { AxiosError, AxiosResponse } from "axios";
import { httpGETPermissions } from "../services/permissions";
import { useQuery } from "@tanstack/react-query";
import { APIBaseError } from "../types/errors/commonError.type";

interface IPermissionResponse {
  user: Record<string, string>;
  admin: Record<string, string>;
}

export const usePermissions = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<IPermissionResponse>, AxiosError<APIBaseError>>({
    queryKey: ['permissions'],
    queryFn: httpGETPermissions,
  });
  return {
    permissions: response?.data,
    isLoading,
    error,
  }
};