import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FC, Fragment, useState } from "react";
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
    <Fragment>
      <IconButton disabled={actions.length === 0} onClick={handleClick} sx={{position: 'absolute', right: 0, top: 5}}>
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
    </Fragment>
  )
}
export default TableActions;