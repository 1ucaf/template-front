import { Skeleton, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { TableActionType, TableHeaderType, TableRowType } from "../lib/types";
import MobileRow from "./TableRow";

const renderSkeletonRow = (rowIndex: number) => (
  <TableRow key={`skeleton-${rowIndex}`}>
    <TableCell>
      <Skeleton variant="text" height={156.84} width={'100%'} />
    </TableCell>
  </TableRow>
);

type MobileTableProps<T extends TableRowType> = {
  actions?: TableActionType<T>[];
  headers: TableHeaderType<T>[];
  rows: T[];
  loading?: boolean;
};
export const MobileTable = <T extends TableRowType>({ actions, headers, rows, loading }: MobileTableProps<T>) => {

  return (
    <TableBody>
      {
        loading ? (
          Array(10)
            .fill(null)
            .map((_, index) => (renderSkeletonRow(index)))
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={headers.length + 1} align="center">
              <Typography variant="body2" color="textSecondary">
                No data
              </Typography>
            </TableCell>
          </TableRow>
        ) : 
        rows.map((row, index) => (
          <MobileRow
             key={`row-${index}`}
             row={row}
             headers={headers}
             actions={actions}
          />
        ))
      }
    </TableBody>
  )
};