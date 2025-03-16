import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useUsersMutations } from "../../../../lib/hooks/users/useUsersMutations";
import { FormattedUser } from "../../lib/types/FormattedUser";
import { useEffect, useState } from "react";
import { Role } from "../../../../lib/enums/role.enum";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";

type ActivateUserModalProps = {
  user: FormattedUser
}

const ActivateUserModal: React.FC<ActivateUserModalProps> = ({user}) => {
  const { notification, modal } = useViewContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    activationMutate,
    activationError,
    isActivationError,
    isActivationPending,
    isActivationSuccess,
  } = useUsersMutations();
  const onSubmit = () => {
    const roles = isAdmin ? [Role.ADMIN, Role.USER] : [Role.USER];
    activationMutate({
      userId: user.id,
      roles
    });
  }
  useEffect(() => {
    if(isActivationSuccess){
      notification.show({
        content: 'User activated successfully',
        severity: 'success',
      });
      modal.hide();
    }
  }, [isActivationSuccess])
  useEffect(() => {
    if(isActivationError){
      notification.show({
        content: 'Error activating user',
        severity: 'error',
      });
    }
  }, [isActivationError, activationError]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h6">{user.name}</Typography>
      <FormControlLabel
        value={isAdmin}
        control={<Checkbox onChange={(e) => setIsAdmin(e.target.checked)} />}
        label="Is Admin"
      />
      <Button onClick={onSubmit} loading={isActivationPending}>Activate</Button>
    </Box>
  )
}

export default ActivateUserModal;