import { styled, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import { TableActionType, TableHeaderType, TableRowType } from "../../lib/types";

type TableHeadProps<T extends TableRowType> = {
  actions?: TableActionType<T>[];
  headers: TableHeaderType<T>[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

const TableHeader = <T extends TableRowType>({ headers, actions }: TableHeadProps<T>) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <StyledTableCell key={`header-${index}`}>{header.label}</StyledTableCell>
        ))}
        {actions && (
          <StyledTableCell sx={{ whiteSpace: "nowrap", flexGrow: 1 }} key="actions"/>
        )}
      </TableRow>
    </TableHead>
  )
};
export default TableHeader;