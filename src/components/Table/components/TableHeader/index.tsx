import { styled, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import { TableActionType, TableHeaderType } from "../../lib/types";

type TableHeadProps = {
  actions?: TableActionType[];
  headers: TableHeaderType[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

const TableHeader: React.FC<TableHeadProps> = ({ headers, actions }) => {
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