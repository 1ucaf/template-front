import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { GetUsersQueryType, httpGETUsers } from "../../services/users";
import { PaginatedUsersResponse } from "../../responses/users";


export const useUsers = ({
  page = 1,
  pageSize = 10,
  endDate,
  startDate,
  search,
  role,
  isActive,
}: GetUsersQueryType)=>{
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PaginatedUsersResponse>, AxiosError>({
    queryKey: ['users', page, pageSize, search, startDate, endDate, role, isActive],
    queryFn: () => httpGETUsers({page, pageSize, search, startDate, endDate, role, isActive}),
    staleTime: Infinity,
  })
  const { data } = response || {};
  return {
    data,
    isLoading,
    error,
  }
}