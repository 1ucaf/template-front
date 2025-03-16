
import { TableHeaderType } from "../../../../components/Table/lib/types";
import UserStatusChip from "../../components/UserStatusChip";

export const userHeaders: TableHeaderType[] = [
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