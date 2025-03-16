import { useEffect, useState } from "react";
import { usePagination } from "../../../../lib/hooks/usePagination";
import { useUsers } from "../../../../lib/hooks/users/useUsers";
import { formatUsers } from "../utils/formatUsers";
import { DatesFilterPopup } from "../../../../components/CommonFiltersPopups/DateCreated";
import { UserRolesFilterPopup } from "../../components/FiltersPopups/UserRoles";
import { UserStatusFilterPopup } from "../../components/FiltersPopups/Status";
import { FormattedUser } from "../types/FormattedUser";
import { TableActionType } from "../../../../components/Table/lib/types";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import ActivateUserModal from "../../components/ActivateUserModal";
import EditUserModal from "../../components/EditUserModal";

export const useUsersTable = () => {
  const { modal } = useViewContext();
  const pagination = usePagination();
  const [countState, setCountState] = useState(0);
  const { query } = pagination;
  const { data, isLoading, error } = useUsers(query);
  const {
    count,
    results,
  } = data || {};
  const activateUser = (user: FormattedUser) => {
    modal.show({
      title: 'Activate User',
      Component: () => ActivateUserModal({user}),
    })
  }
  const editUser = (user: FormattedUser) => {
    modal.show({
      title: 'Edit User',
      Component: () => EditUserModal({user}),
    })
  }
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
    }
  ]
  const actions = [
    {
      label: 'Edit',
      onClick: editUser,
      condition: (row: FormattedUser) => row.role !== 'admin',
    },
    {
      label: 'Activate',
      onClick: activateUser,
      condition: (row: FormattedUser) => !row.isActive,
    }
  ] as TableActionType[];
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