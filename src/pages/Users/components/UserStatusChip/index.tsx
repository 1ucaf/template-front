import { Chip } from "@mui/material";
import { FC } from "react";

type UserStatusBadgeProps = { isActive: boolean };
const UserStatusChip: FC<UserStatusBadgeProps> = ({ isActive }) => {
  const status = isActive ? "Active" : "Inactive";
  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      color={isActive ? "success" : "warning"}
    />
  )
}

export default UserStatusChip