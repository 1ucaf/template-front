import {
  Paper,
  Table as MuiTable,
  TableContainer,
  TablePagination,
  TableFooter,
  TableRow,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { PaginationPropType, SearchPropType, TableActionType, TableHeaderType, TableRowType } from './lib/types';
import TableHeader from './components/TableHeader';
import Search from './components/Search';
import { FC, useState } from 'react';
import TableBody from './components/TableBody';
import { FilterPopupProps } from '../Filter/types';
import { FilterMenuMUI } from '../FilterMenuMUI';
import { MobileTable } from './mobile';

type FilterItemPropType = {
  title: string;
  name: string;
  value: any;
  onChange?: any;
  popup: FC<FilterPopupProps>;
}
type FilterPropType = {
  clearAllFilters: () => void;
  filtersList: FilterItemPropType[];
  isActive?: boolean;
}

type TableProps = {
  headers?: TableHeaderType[];
  rows: TableRowType[];
  loading?: boolean;
  show?: string[];
  actions?: TableActionType[];
  search?: SearchPropType;
  pagination?: PaginationPropType;
  filter?: FilterPropType;
}

export default function Table({
  headers,
  rows,
  loading,
  show,
  actions,
  search,
  pagination,
  filter,
}: TableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));
  // console.log(isMobile);
  const [filteredData, setFilteredData] = useState<TableRowType[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const detectedHeaders = headers || Object.keys(rows[0] || {}).map((key) => ({
    name: key,
    label: key,
  }));
  const displayHeaders = show ? detectedHeaders.filter((header) => show.includes(header.name)) : detectedHeaders;
  const { onType, onClickSearchButton } = search || {};
  const {
    rowsPerPageOptions = [10, 25, 50, 100],
  } = pagination || {};

  const handleSearchButton = () => {
    setFilteredData(null);
    onClickSearchButton && onClickSearchButton(searchTerm);
  }

  const handleTypeSearch = (term: string) => {
    onType && onType(term);
    setSearchTerm(term);
    if (!term) {
      setFilteredData(null);
    } else {
      const filteredData = rows.filter((row) => Object.values(row).some((value) => {
        if (typeof value !== 'string') return false;
        return value.toLowerCase().includes(term.toLowerCase());
      }));
      setFilteredData(filteredData);
    }
  }

  return (
    <>
      {(search || filter) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', mb: 2 }}>
          {search && (
            <Search
              onType={handleTypeSearch}
              onClickSearchButton={handleSearchButton}
              placeholder={search.placeholder}
              searchTerm={searchTerm}
              sx={{ flex: 1 }}
            />
          )}
          {filter &&
            <>
              <FilterMenuMUI
                filtersList={filter.filtersList}
                isActive={!!filter.isActive}
                clearAllFilters={filter.clearAllFilters}
              />
            </>
          }
        </Box>
      )}
      <TableContainer component={Paper}>
        <MuiTable aria-label="simple table">
          {
            isMobile ? (<>
              <MobileTable headers={displayHeaders} actions={actions} rows={filteredData || rows}/>
            </>) : (<>
              <TableHeader headers={displayHeaders} actions={actions} />
              <TableBody
                loading={loading}
                rows={filteredData || rows}
                displayHeaders={displayHeaders}
                actions={actions}
              />
            </>)
          }
          {
            pagination && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    sx={{ border: 0 }}
                    count={pagination.totalRows}
                    page={pagination.page}
                    onPageChange={pagination.onPageChange}
                    rowsPerPage={pagination.rowsPerPage}
                    onRowsPerPageChange={pagination.onRowsPerPageChange}
                    rowsPerPageOptions={rowsPerPageOptions}
                  />
                </TableRow>
              </TableFooter>
            )
          }
        </MuiTable>
      </TableContainer>
    </>
  );
}