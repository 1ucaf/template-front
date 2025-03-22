import { useEffect, useState } from "react";
import { useBooks } from "../../../../lib/hooks/books/useBooks";
import { usePagination } from "../../../../lib/hooks/usePagination";
import { formatBooks } from "../utils/formatBooks";
import { DatesFilterPopup } from "../../../../components/CommonFiltersPopups/DateCreated";
import { TableActionType } from "../../../../components/Table/lib/types";
import { useBooksTableActions } from "./useBooksTableActions";

export const useBooksTable = () => {
  const { onDeleteBook, onEditBook } = useBooksTableActions();
  const pagination = usePagination();
  const [countState, setCountState] = useState(0);
  const { query } = pagination;
  const { data, isLoading, error } = useBooks(query);
  const {
    count,
    results,
  } = data || {};
  const formattedBooks = formatBooks(results);
  useEffect(()=> {
    if(count) setCountState(count);
  }, [count])
  const filtersList = [
    {
      name: 'dates',
      title: 'Dates',
      popup: DatesFilterPopup,
      value: {
        startDate: query.startDate,
        endDate: query.endDate
      },
      onChange: pagination.setFilters,
    },
  ]
  const actions = [
    {
      label: 'Edit',
      onClick: onEditBook,
    },
    {
      label: 'Delete',
      onClick: onDeleteBook,
    }
  ] as TableActionType[];
  return {
    actions,
    count: countState,
    formattedBooks,
    isLoading,
    error,
    pagination,
    filtersList,
  }
}