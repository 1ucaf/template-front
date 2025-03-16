import axios from "axios";
export type GetBooksQueryType = { page: number, pageSize: number, search?: string, startDate?: string, endDate?: string };

export const httpGETBooks = (query: GetBooksQueryType) => axios.get('/books', { params: query });

export const httpPUTBook = (
  {bookId, title, description}: {bookId: string, title: string, description: string}
) => axios.put(`/books/${bookId}`, { title, description });

export const httpPOSTBook = (
  {title, description}: { title: string, description: string }
) => axios.post(`/books`, { title, description });

export const httpDELETEBook = (id: string) => axios.delete(`/books`, { data: { id } });