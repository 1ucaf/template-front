import { useQuery } from "@tanstack/react-query"
import { GetBooksQueryType, httpGETBooks } from "../services/books"
import { AxiosError, AxiosResponse } from "axios";
import { PaginatedBooksResponse } from "../responses/books";

export const useBooks = ({
  page = 1,
  pageSize = 10,
  search,
  startDate,
  endDate,
}: GetBooksQueryType)=>{
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PaginatedBooksResponse>, AxiosError>({
    queryKey: ['books', page, pageSize, search, startDate, endDate],
    queryFn: () => httpGETBooks({page, pageSize, search, startDate, endDate}),
    staleTime: Infinity,
  })
  const { data } = response || {};
  return {
    data,
    isLoading,
    error,
  }
}