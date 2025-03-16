import React from 'react'
import { useViewContext } from '../../lib/hooks/contextHooks/useViewContext';
import { Box, Button } from '@mui/material';
import Table from '../../components/Table';
import { useBooksTable } from './lib/hooks/useBooksTable';
import { booksHeaders } from './lib/constants/headers';
import BookInformationModal from './components/BookInformationModal';

type BooksProps = {}

const Books: React.FC<BooksProps> = () => {
  const { modal } = useViewContext();
  const {
    count,
    formattedBooks,
    isLoading,
    pagination,
    filtersList,
    actions,
  } = useBooksTable();
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    setSearch,
    setFilters,
  } = pagination;
  return (
    <Box padding={4} display={'flex'} flexDirection={'column'}>
      <Button
        sx={{
          mb: 2,
          alignSelf: 'flex-end',
        }}
        onClick={() => modal.show({
          title: 'Create Book',
          Component: BookInformationModal,
        })}
        variant="contained"
      >
        Create Book
      </Button>
      <Table
        rows={formattedBooks || []}
        loading={isLoading}
        headers={booksHeaders}
        search={{
          onClickSearchButton: (term) => setSearch(term || ''),
        }}
        filter={{
          clearAllFilters: () => {
            setFilters({});
          },
          filtersList,
        }}
        pagination={{
          page: page,
          rowsPerPage: pageSize,
          totalRows: count || 0,
          onPageChange: (_, page) => {setPage(page)},
          onRowsPerPageChange: (e) => {
            setPageSize(parseInt(e.target.value))
            setPage(1);
          },
        }}
        actions={actions}
      />
    </Box>
  )
}

export default Books