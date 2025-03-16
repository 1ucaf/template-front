import { PaginatedResponse } from "./paginated";

export type IBookResponse = {
  id: number;
  title: string;
  description: string;
  date_created: string;
}

export type PaginatedBooksResponse = PaginatedResponse<IBookResponse>;