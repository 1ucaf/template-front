import { useEffect, useState } from "react";
import { useBooks } from "../../../../lib/hooks/useBooks";
import { usePagination } from "../../../../lib/hooks/usePagination";
import { formatBooks } from "../utils/formatBooks";
import { DatesFilterPopup } from "../../../../components/CommonFiltersPopups/DateCreated";
import { TableActionType } from "../../../../components/Table/lib/types";
import { FormattedBook } from "../types/FormattedBook";
import BookInformationModal from "../../components/BookInformationModal";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import { useOnDeleteBook } from "./useOnDeleteBook";

export const useBooksTable = () => {
  const { modal } = useViewContext();
  const { onDeleteBook } = useOnDeleteBook();
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
  const onEditBook = (book: FormattedBook) => {
    modal.show({
      title: 'Edit Book',
      Component: () => BookInformationModal({book}),
    })
  }
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