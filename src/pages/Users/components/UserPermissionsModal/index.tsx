import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { FormattedUser } from "../../lib/types/FormattedUser";
import { useUsersMutations } from "../../../../lib/hooks/users/useUsersMutations";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import { useEffect, useState } from "react";
import { usePermissions } from "../../../../lib/hooks/usePermissions";
import { Role } from "../../../../lib/enums/role.enum";

type UserPermissionsModalProps = {user: FormattedUser}

const UserPermissionsModal: React.FC<UserPermissionsModalProps> = ({user}) => {
  const { permissions } = usePermissions();
  const [userPermissions, setUserPermissions] = useState<string[]>(user.permissions || []);
  const { notification, modal } = useViewContext();
  const {
    editUserPermissionsMutate,
    isEditUserPermissionsSuccess,
    isEditUserPermissionsError,
    editUserPermissionsError,
    isEditUserPermissionsPending,
  } = useUsersMutations();
  useEffect(() => {
    if(isEditUserPermissionsSuccess){
      notification.show({
        content: 'User permissions modified successfully',
        severity: 'success',
      });
      modal.hide();
    }
  }, [isEditUserPermissionsSuccess])
  useEffect(() => {
    if(isEditUserPermissionsError && editUserPermissionsError){
      if(editUserPermissionsError.response?.status === 403) {
        modal.hide();
      }
      notification.show({
        content: 'Error modifying user permissions',
        severity: 'error',
      });
    }
  }, [isEditUserPermissionsError, editUserPermissionsError]);
  const onSubmit = () => {
    editUserPermissionsMutate({userId: user.id, permissions: userPermissions});
  }
  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setUserPermissions([...userPermissions, value]);
    } else {
      setUserPermissions(userPermissions.filter((permission) => permission !== value));
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {permissions && (
        <>
          {user.roles?.includes(Role.ADMIN) &&
            Object.keys(permissions.admin).map((key: string) => (
              <FormControlLabel
                key={key}
                control={<Checkbox checked={userPermissions.includes(key)} value={key} onChange={onChangeCheck} />}
                label={permissions.admin[key]}
              />
            ))
          }
          {user.roles?.includes(Role.USER) &&
            Object.keys(permissions.user).map((key: string) => (
              <FormControlLabel
                key={key}
                control={<Checkbox checked={userPermissions.includes(key)} value={key} onChange={onChangeCheck} />}
                label={permissions.user[key]}
              />
          ))}
        </>
      )}
      <Button onClick={onSubmit} loading={isEditUserPermissionsPending}>Save</Button>
    </Box>
  )
}

export default UserPermissionsModal;