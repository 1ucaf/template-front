import {
  TableBody as MUITableBody,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { TableActionType, TableHeaderType, TableRowType } from '../../lib/types';
import TableRowComponent from '../TableRow';

const renderSkeletonRow = (rowIndex: number, displayHeaders: TableHeaderType[]) => (
  <TableRow key={`skeleton-${rowIndex}`}>
    {displayHeaders.map((_, index) => (
      <TableCell key={`skeleton-cell-${rowIndex}-${index}`}>
        <Skeleton variant="text" width={100} />
      </TableCell>
    ))}
  </TableRow>
);
type TableBodyProps = {
  loading?: boolean;
  rows: TableRowType[];
  displayHeaders: TableHeaderType[];
  actions?: TableActionType[];
}

const TableBody: React.FC<TableBodyProps> = ({
  loading,
  rows,
  displayHeaders,
  actions,
}) => {
  return (
    <MUITableBody>
      {loading
        ? Array(10)
          .fill(null)
          .map((_, index) => renderSkeletonRow(index, displayHeaders))
        : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={displayHeaders.length + 1} align="center">
              <Typography variant="body2" color="textSecondary">
                No data
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, index) => (
            <TableRowComponent key={`row-${index}`} row={row} headers={displayHeaders} actions={actions} />
          ))
        )}
    </MUITableBody>
  )
};

export default TableBody;