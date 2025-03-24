import { useEffect, useState } from "react";
import { usePagination } from "../../../../lib/hooks/usePagination";
import { useUsers } from "../../../../lib/hooks/users/useUsers";
import { formatUsers } from "../utils/formatUsers";
import { DatesFilterPopup } from "../../../../components/CommonFiltersPopups/DateCreated";
import { UserRolesFilterPopup } from "../../components/FiltersPopups/UserRoles";
import { UserStatusFilterPopup } from "../../components/FiltersPopups/Status";
import { useUsersTableActions } from "./useUsersTableActions";
import { FormattedUser } from "../types/FormattedUser";
import { TableActionType } from "../../../../components/Table/lib/types";
import { Role } from "../../../../lib/enums/role.enum";
import { useAuthContext } from "../../../../lib/hooks/contextHooks/useAuthContext";
import { ShowDeletedFilterPopup } from "../../../../components/CommonFiltersPopups/ShowDeleted";

export const useUsersTable = () => {
  const { user } = useAuthContext();
  const pagination = usePagination();
  const [countState, setCountState] = useState(0);
  const { activateUser, editUser, userPermissions, makeAdmin, removeAdmin, deleteUser } = useUsersTableActions();
  const { query } = pagination;
  const { data, isLoading, error } = useUsers(query);
  const {
    count,
    results,
  } = data || {};
  const formattedUsers = formatUsers(results);
  useEffect(()=> {
    if(count) setCountState(count);
  }, [count]);
  const filtersList = [
    {
      name: 'dates',
      title: 'Dates',
      popup: DatesFilterPopup,
      value: {
        startDate: query.startDate,
        endDate: query.endDate
      },
      onChange: pagination.setFilters,
    },
    {
      name: 'role',
      title: 'Roles',
      popup: UserRolesFilterPopup,
      value: query.role,
      onChange: pagination.setFilters,
    },
    {
      name: 'isActive',
      title: 'Status',
      popup: UserStatusFilterPopup,
      value: query.isActive,
      onChange: pagination.setFilters,
    },
    {
      name: 'showDeleted',
      title: 'Show Deleted',
      popup: ShowDeletedFilterPopup,
      value: query.showDeleted,
      onChange: pagination.setFilters,
    }
  ]
  const canEditPermissions = (row: FormattedUser) => {
    if(!row.isActive) return false;
    if(row.id === user?.id) return false;
    if(!user?.permissions?.includes('users.set_permissions')) return false;
    if(row.role === 'master') return false;
    if(row.role === 'owner') return false;
    if(row.role === 'admin') return user.roles?.includes(Role.OWNER) || user.roles?.includes(Role.MASTER);
    return true;
  }
  const canEdit = (row: FormattedUser) => {
    if(!user?.permissions?.includes('users.edit')) return false;
    if(row.id === user?.id) return false;
    if(row.role === 'master') return false;
    if(row.role === 'owner') return false;
    if(row.role === 'admin') return user?.roles?.includes(Role.OWNER) || user?.roles?.includes(Role.MASTER);
    return true;
  }
  const canDelete = (row: FormattedUser) => {
    if(row.id === user?.id) return false;
    if(row.isDeleted) return false;
    if(!user?.permissions?.includes('users.delete')) return false;
    if(row.role === 'master') return false;
    if(row.role === 'owner') return false;
    if(row.role === 'admin') return user?.roles?.includes(Role.OWNER) || user?.roles?.includes(Role.MASTER);
    return true;
  };
  const canMakeAdmin = (row: FormattedUser) => {
    if(row.id === user?.id) return false;
    if(row.role === 'master') return false;
    if(row.role === 'owner') return false;
    if(row.role === 'admin') return false;
    if(user?.roles?.includes(Role.OWNER) || user?.roles?.includes(Role.MASTER)) return true;
    return user?.permissions?.includes('users.set_admin')
  }
  const canRemoveAdmin = (row: FormattedUser) => {
    if(row.id === user?.id) return false;
    if(row.role === 'master') return false;
    if(row.role === 'owner') return false;
    if(!row.roles?.includes(Role.ADMIN)) return false;
    if(user?.roles?.includes(Role.OWNER) || user?.roles?.includes(Role.MASTER)) return true;
    return user?.permissions?.includes('users.set_admin')
  }
  const actions:TableActionType<FormattedUser>[] = [
    {
      label: 'Edit',
      onClick: editUser,
      condition: canEdit,
    },
    {
      label: 'Activate',
      onClick: activateUser,
      condition: row => !row.isActive,
    },
    {
      label: 'Permissions',
      onClick: userPermissions,
      condition: canEditPermissions,
    },
    {
      label: 'Make Admin',
      onClick: makeAdmin,
      condition: canMakeAdmin,
    },
    {
      label: 'Remove Admin',
      onClick: removeAdmin,
      condition: canRemoveAdmin,
    },
    {
      label: 'Delete',
      onClick: deleteUser,
      condition: canDelete,
    }
  ];
  return {
    count: countState,
    formattedUsers,
    isLoading,
    error,
    pagination,
    filtersList,
    actions,
  }
}