import { useMutation, useQueryClient } from "@tanstack/react-query"
import { httpActivateUser, httpEditUser } from "../../services/users"

export const useUsersMutations = () => {
  const queryClient = useQueryClient();
  const {
    mutate: activationMutate,
    isSuccess: isActivationSuccess,
    isError: isActivationError,
    error: activationError,
    isPending: isActivationPending,
  } = useMutation({
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
  } = useMutation({
    mutationFn: httpEditUser,
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
    isModificationPending
  }
}