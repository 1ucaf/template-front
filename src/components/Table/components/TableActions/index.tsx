import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import { FC, useState } from "react";
import { TableActionType, TableRowType } from "../../lib/types";

type TableActionsProps = {
  actions: TableActionType[];
  row: TableRowType;
}

const TableActions: FC<TableActionsProps> = ({ actions, row }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <TableCell key="actions" align="right" sx={{ width: "1px", whiteSpace: "nowrap" }}>
      <IconButton disabled={actions.length === 0} onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-label': 'actions' }}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={`action-${index}`}
            onClick={() => {
              handleClose();
              action.onClick(row);
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </TableCell>
  )
}
export default TableActions;