import { Divider, TableCell, TableRow } from "@mui/material";
import { TableActionType, TableHeaderType, TableRowType } from "../../lib/types";
import TableActions from "../TableActions";

type TableRowProps = {
  row: TableRowType;
  headers: TableHeaderType[];
  actions?: TableActionType[];
}

const MobileRow: React.FC<TableRowProps> = ({ row, headers, actions }) => {
  const filteredActions = actions?.filter((action) => {
    if (!action.condition) return true;
    return action.condition(row);
  }) || [];
  return (
    <TableRow sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', position: 'relative'}}>
      {
        actions && (
          <TableActions actions={filteredActions} row={row} />
        )
      }
      {
        headers.map((header, index) => (
          <TableCell key={`cell-${index}`} sx={{display: 'flex', flexDirection: 'column', borderBottom: 'none', flexWrap: 'wrap'}}>
            {header.label}: {row[header.name]}
          </TableCell>
        ))
      }
      <Divider/>
    </TableRow>
  )
}
export default MobileRow;