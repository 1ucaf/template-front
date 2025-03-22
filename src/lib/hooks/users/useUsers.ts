import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { GetUsersQueryType, httpGETUsers } from "../../services/users";
import { PaginatedUsersResponse } from "../../responses/users";


export const useUsers = (query: GetUsersQueryType)=>{
  const keys = Object.values(query);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PaginatedUsersResponse>, AxiosError>({
    queryKey: ['users', ...keys],
    queryFn: () => httpGETUsers(query),
    staleTime: Infinity,
  })
  const { data } = response || {};
  return {
    data,
    isLoading,
    error,
  }
}