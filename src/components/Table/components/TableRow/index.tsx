import { TableActionType, TableHeaderType, TableRowType } from "../../lib/types";
import { styled, TableCell, TableRow } from "@mui/material";
import TableCellComponent from "../TableCell";
import TableActions from "../TableActions";

type TableRowProps = {
  row: TableRowType;
  headers: TableHeaderType[];
  actions?: TableActionType[];
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TableRowComponent: React.FC<TableRowProps> = ({ row, headers, actions }) => {
  const filteredActions = actions?.filter((action) => {
    if (!action.condition) return true;
    return action.condition(row);
  }) || [];

  return (
    <StyledTableRow>
      {headers.map((header, index) => (
        <TableCell key={`cell-${index}`}>
          <TableCellComponent row={row} header={header} />
        </TableCell>
      ))}
      {
        actions && (
          <TableActions actions={filteredActions} row={row} />
        )
      }
    </StyledTableRow>
  );
};

export default TableRowComponent;