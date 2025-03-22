import { Divider, TableRow } from "@mui/material";
import { TableActionType, TableHeaderType, TableRowType } from "../../lib/types";
import TableActions from "../TableActions";
import TableCellComponent from "../TableCell";
import { getFilteredActions } from "../../lib/utils";

type TableRowProps = {
  row: TableRowType;
  headers: TableHeaderType[];
  actions?: TableActionType[];
}

const MobileRow: React.FC<TableRowProps> = ({ row, headers, actions }) => {
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