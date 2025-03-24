import { Box, Button, FormControl, TextField } from "@mui/material";
import { FormattedUser } from "../../lib/types/FormattedUser";
import { useUsersMutations } from "../../../../lib/hooks/users/useUsersMutations";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Role } from "../../../../lib/enums/role.enum";

type EditUserModalProps = {user: FormattedUser}
type EditUserFormType = {name: string, email: string, isAdmin: boolean | undefined}

const EditUserModal: React.FC<EditUserModalProps> = ({user}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditUserFormType>({
    defaultValues: {
      name: user.name,
      email: user.email,
    }
  });
  const { notification, modal } = useViewContext();
  const {
    modificationMutate,
    modificationError,
    isModificationError,
    isModificationPending,
    isModificationSuccess,
  } = useUsersMutations();
  useEffect(() => {
    if(isModificationSuccess){
      notification.show({
        content: 'User modified successfully',
        severity: 'success',
      });
      modal.hide();
    }
  }, [isModificationSuccess])
  useEffect(() => {
    if(isModificationError && modificationError){
      if(modificationError.response?.status === 403) {
        modal.hide();
      }
      notification.show({
        content: 'Error modifying user',
        severity: 'error',
      });
    }
  }, [isModificationError, modificationError]);
  const onSubmit = ({name, email, isAdmin}: EditUserFormType) => {
    const roles = isAdmin ? [Role.ADMIN, Role.USER] : [Role.USER];
    modificationMutate({userId: user.id, name, roles, email});
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormControl>
        <TextField
          label="Email"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </FormControl>
      <Button onClick={handleSubmit(onSubmit)} loading={isModificationPending}>Save</Button>
    </Box>
  )
}

export default EditUserModal;