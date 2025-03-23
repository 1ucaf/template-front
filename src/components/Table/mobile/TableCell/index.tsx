import { TableCell, Typography } from "@mui/material";
import { TableHeaderType, TableRowType } from "../../lib/types";

export type TableCellProps<T extends TableRowType> = {
  row: T;
  header: TableHeaderType<T>;
}

const TableCellComponent = <T extends TableRowType>({ row, header }: TableCellProps<T>) => {
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