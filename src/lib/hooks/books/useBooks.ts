import { useQuery } from "@tanstack/react-query"
import { GetBooksQueryType, httpGETBooks } from "../../services/books"
import { AxiosError, AxiosResponse } from "axios";
import { PaginatedBooksResponse } from "../../responses/books";

export const useBooks = (query: GetBooksQueryType)=>{
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<AxiosResponse<PaginatedBooksResponse>, AxiosError>({
    queryKey: ['books', ...Object.values(query)],
    queryFn: () => httpGETBooks(query),
    staleTime: Infinity,
  })
  const { data } = response || {};
  return {
    data,
    isLoading,
    error,
  }
}