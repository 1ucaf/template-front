import { TableActionType, TableHeaderType, TableRowType } from "../../lib/types";
import { styled, TableCell, TableRow } from "@mui/material";
import TableCellComponent from "../TableCell";
import TableActions from "../TableActions";
import { getFilteredActions } from "../../lib/utils";

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
  const filteredActions = getFilteredActions(actions, row);

  return (
    <StyledTableRow>
      {headers.map((header, index) => (
        <TableCell key={`cell-${index}`}>
          <TableCellComponent row={row} header={header} />
        </TableCell>
      ))}
      {
        actions && (
          <TableCell key="actions" align="right" sx={{ width: "1px", whiteSpace: "nowrap" }}>
            <TableActions actions={filteredActions} row={row} />
          </TableCell>
        )
      }
    </StyledTableRow>
  );
};

export default TableRowComponent;