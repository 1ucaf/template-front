import { Divider, Skeleton, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { TableActionType, TableHeaderType, TableRowType } from "../lib/types";

const renderSkeletonRow = (rowIndex: number, displayHeaders: TableHeaderType[]) => (
  <TableRow key={`skeleton-${rowIndex}`}>
    <TableCell>
      <Skeleton variant="text" height={156.84} width={'100%'} />
    </TableCell>
  </TableRow>
);

type MobileTableProps = {
  actions?: TableActionType[];
  headers: TableHeaderType[];
  rows: TableRowType[];
  loading?: boolean;
};
export const MobileTable: React.FC<MobileTableProps> = ({ headers, rows, loading }) => {

  return (
    <TableBody>
      {
        loading ? (
          Array(10)
            .fill(null)
            .map((_, index) => (renderSkeletonRow(index, headers)))
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
          <TableRow sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}} key={`row-${index}`}>
            {
              headers.map((header, index) => (
                <TableCell key={`cell-${index}`} sx={{display: 'flex', flexDirection: 'column', borderBottom: 'none', flexWrap: 'wrap'}}>
                  {header.label}: {row[header.name]}
                </TableCell>
              ))
            }
            <Divider/>
          </TableRow>
        ))
      }
    </TableBody>
  )
};