import { useMutation, useQueryClient } from "@tanstack/react-query"
import { httpActivateUser, httpEditUser, httpEditUserPermissions } from "../../services/users"
import { AxiosError, AxiosResponse } from "axios";

export const useUsersMutations = () => {
  const queryClient = useQueryClient();
  const {
    mutate: activationMutate,
    isSuccess: isActivationSuccess,
    isError: isActivationError,
    error: activationError,
    isPending: isActivationPending,
  } = useMutation<AxiosResponse, AxiosError, any>({
    mutationFn: httpActivateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  })
  
  const {
    mutate: modificationMutate,
    isSuccess: isModificationSuccess,
    isError: isModificationError,
    error: modificationError,
    isPending: isModificationPending,
  } = useMutation<AxiosResponse, AxiosError, any>({
    mutationFn: httpEditUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  })

  const {
    mutate: editUserPermissionsMutate,
    isSuccess: isEditUserPermissionsSuccess,
    isError: isEditUserPermissionsError,
    error: editUserPermissionsError,
    isPending: isEditUserPermissionsPending,
  } = useMutation<AxiosResponse, AxiosError, any>({
    mutationFn: httpEditUserPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  })
  return {
    activationMutate,
    isActivationSuccess,
    isActivationError,
    activationError,
    isActivationPending,
    modificationMutate,
    isModificationSuccess,
    isModificationError,
    modificationError,
    isModificationPending,
    editUserPermissionsMutate,
    isEditUserPermissionsSuccess,
    isEditUserPermissionsError,
    editUserPermissionsError,
    isEditUserPermissionsPending,
  }
}