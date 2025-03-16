import { TableCell, Typography } from "@mui/material";
import { TableHeaderType, TableRowType } from "../../lib/types";

export type TableCellProps = {
  row: TableRowType;
  header: TableHeaderType
}

const TableCellComponent: React.FC<TableCellProps> = ({ row, header }) => {
  const { name, CustomRenderComponent, label } = header;
  return (
    <TableCell sx={{display: 'flex', flexDirection: 'column', borderBottom: 'none'}}>
      {
        CustomRenderComponent ?
        <CustomRenderComponent row={row} /> : 
        <Typography>
          {label}: {row[name]}
        </Typography>
      }
    </TableCell>
  )
};

export default TableCellComponent;