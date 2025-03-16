import { useMutation, useQueryClient } from "@tanstack/react-query"
import { httpDELETEBook, httpPOSTBook, httpPUTBook } from "../../services/books"

export const useBooksMutations = () => {
  const queryClient = useQueryClient();
  const {
    mutate: creationMutate,
    isSuccess: isCreationSuccess,
    isError: isCreationError,
    error: creationError,
    isPending: isCreationPending,
  } = useMutation({
    mutationFn: httpPOSTBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  })
  const {
    mutate: modificationMutate,
    isSuccess: isModificationSuccess,
    isError: isModificationError,
    error: modificationError,
    isPending: isModificationPending,
  } = useMutation({
    mutationFn: httpPUTBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  })
  const {
    mutate: deletionMutate,
    isSuccess: isDeletionSuccess,
    isError: isDeletionError,
    error: deletionError,
    isPending: isDeletionPending,
  } = useMutation({
    mutationFn: httpDELETEBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  })
  return {
    creationMutate,
    isCreationSuccess,
    isCreationError,
    creationError,
    isCreationPending,
    modificationMutate,
    isModificationSuccess,
    isModificationError,
    modificationError,
    isModificationPending,
    deletionMutate,
    isDeletionSuccess,
    isDeletionError,
    deletionError,
    isDeletionPending,
  }
}