export type PaginatedResponse<T> = {
  results: T[];
  count: number;
  page: number;
  pageSize: number;
};