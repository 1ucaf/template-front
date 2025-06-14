import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { GetUsersQueryType, httpGETUsers } from "../../services/users";
import { PaginatedUsersResponse } from "../../responses/users";
import { useDefaultErrorHandler } from "../useDefaultErrorHandler";
import { APIBaseError } from "../../types/errors/commonError.type";


export const useUsers = (query: GetUsersQueryType)=>{
  const keys = Object.values(query);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PaginatedUsersResponse>, AxiosError<APIBaseError>>({
    queryKey: ['users', ...keys],
    queryFn: () => httpGETUsers(query),
    staleTime: Infinity,
  })
  useDefaultErrorHandler(error);
  const { data } = response || {};
  return {
    data,
    isLoading,
    error,
  }
}