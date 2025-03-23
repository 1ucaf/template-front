import { Divider, TableRow } from "@mui/material";
import { TableActionType, TableHeaderType, TableRowType } from "../../lib/types";
import TableActions from "../TableActions";
import TableCellComponent from "../TableCell";
import { getFilteredActions } from "../../lib/utils";

type TableRowProps<T extends TableRowType> = {
  row: T;
  headers: TableHeaderType<T>[];
  actions?: TableActionType<T>[];
}

const MobileRow = <T extends TableRowType>({ row, headers, actions }: TableRowProps<T>) => {
  const filteredActions = getFilteredActions(actions, row);
  return (
    <TableRow sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', position: 'relative'}}>
      {
        actions && (
          <TableActions actions={filteredActions} row={row} />
        )
      }
      {
        headers.map((header, index) => (
          <TableCellComponent key={`cell-${index}`} row={row} header={header} />
        ))
      }
      <Divider/>
    </TableRow>
  )
}
export default MobileRow;