import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import { FormattedUser } from "../types/FormattedUser";
import ActivateUserModal from "../../components/ActivateUserModal";
import EditUserModal from "../../components/EditUserModal";
import UserPermissionsModal from "../../components/UserPermissionsModal";
import ConfirmationModal from "../../../../components/CommonModals/ConfirmationModal";

export const useUsersTableActions = () => {
  const { modal } = useViewContext();
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
  const userPermissions = (user: FormattedUser) => {
    modal.show({
      title: 'User Permissions',
      Component: () => UserPermissionsModal({user}),
    })
  }
  const deleteUser = (user: FormattedUser) => {
    modal.show({
      title: 'Delete Book',
      Component: () => ConfirmationModal({
        confirmColor: 'error',
        description: 'Are you sure you want to delete this user?',
        confirmText: 'Delete',
        onCancel: modal.hide,
        invalidateKey: ['users'],
        actionMethod: 'delete',
        actionUrl: `/users/${String(user.id)}`,
        errorMessage: 'Error deleting user',
        successMessage: 'User deleted successfully',
        pendingMessage: 'Deleting user...'
      }),
    })
  }
  return { activateUser, editUser, userPermissions, deleteUser };
}