import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

type BaseQueryType<T = {}> = {
  page: number;
  pageSize: number;
  search?: string;
  startDate?: string;
  endDate?: string;
} & T;

export const usePagination = <T extends Record<string, unknown>>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key: string, defaultValue: string) => searchParams.get(key) || defaultValue;
  const getNumberParam = (key: string, defaultValue: number) => parseInt(getParam(key, defaultValue.toString()), 10);

  const [page, setPage] = useState(() => getNumberParam("page", 0));
  const [pageSize, setPageSize] = useState(() => getNumberParam("pageSize", 10));
  const [search, setSearch] = useState(() => getParam("search", ""));
  const [filters, setFilters] = useState<T>(() => Object.fromEntries(searchParams.entries()) as T);

  const query: BaseQueryType<T> = useMemo(() => ({
    ...filters,
    page,
    pageSize,
    search,
  }), [page, pageSize, search, filters]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });
    setSearchParams(params);
  }, [query, setSearchParams]);

  return { page, setPage, pageSize, setPageSize, search, setSearch, filters, setFilters, query };
};
