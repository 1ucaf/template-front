import { Box, Divider, TableBody, TableCell, TableRow } from "@mui/material";
import { TableActionType, TableHeaderType, TableRowType } from "../lib/types";

type MobileTableProps = {
  actions?: TableActionType[];
  headers: TableHeaderType[];
  rows: TableRowType[];
};
export const MobileTable: React.FC<MobileTableProps> = ({ actions, headers, rows }) => {
  return (
    <TableBody>
      {rows.map((row, index) => (
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
      ))}
    </TableBody>
  )
};