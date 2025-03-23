
import { TableHeaderType } from "../../../../components/Table/lib/types";
import UserStatusChip from "../../components/UserStatusChip";
import { FormattedUser } from "../types/FormattedUser";

export const userHeaders: TableHeaderType<FormattedUser>[] = [
  {
    label: 'Name',
    name: 'name',
  },
  {
    label: 'Email',
    name: 'email',
  },
  {
    label: 'Role',
    name: 'role',
  },
  {
    label: 'Created',
    name: 'createdAt',
  },
  {
    label: 'Status',
    name: 'status',
    CustomRenderComponent: ({ row }) => UserStatusChip({ isActive: row.isActive }),
  }
]