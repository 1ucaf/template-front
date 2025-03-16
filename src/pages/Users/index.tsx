import React from 'react'
import { userHeaders } from './lib/constants/headers';
import { Box } from '@mui/material';
import Table from '../../components/Table';
import { useUsersTable } from './lib/hooks/useUsersTable';

type UsersProps = {}

const Users: React.FC<UsersProps> = () => {
  const {
    formattedUsers,
    isLoading,
    count,
    filtersList,
    pagination,
    actions,
  } = useUsersTable();

  const {
    setFilters,
    setSearch,
    page,
    setPage,
    pageSize,
    setPageSize
  } = pagination;
  
  return (
    <Box padding={4}>
      <Table
        headers={userHeaders}
        rows={formattedUsers}
        loading={isLoading}
        filter={{ filtersList, clearAllFilters: () => setFilters({}) }}
        search={{
          onClickSearchButton: (term) => setSearch(term || ''),
        }}
        pagination={{
          page: page,
          rowsPerPage: pageSize,
          totalRows: count || 0,
          onPageChange: (_, page) => {setPage(page + 1)},
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

export default Users