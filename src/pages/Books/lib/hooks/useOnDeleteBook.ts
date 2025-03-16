import { useEffect } from "react";
import ConfirmationModal from "../../../../components/CommonModals/ConfirmationModal";
import { useBooksMutations } from "../../../../lib/hooks/books/useBooksMutations";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import { FormattedBook } from "../types/FormattedBook";
import { DeletingBookContent } from "../../components/contents/deletingBook";

export const useOnDeleteBook = () => {
  const { notification, modal } = useViewContext();
  
  const {
    deletionMutate,
    isDeletionSuccess,
    isDeletionError,
    deletionError,
    isDeletionPending,
  } = useBooksMutations();
  useEffect(() => {
    if(isDeletionSuccess){
      notification.show({
        content: 'Book saved successfully',
        severity: 'success',
      });
      modal.hide();
    }
  }, [isDeletionSuccess])
  useEffect(() => {
    if(isDeletionError){
      notification.show({
        content: 'Error saving book',
        severity: 'error',
      });
    }
  }, [isDeletionError, deletionError]);
  useEffect(() => {
    if(isDeletionPending) {
      modal.hide();
      modal.show({
        title: 'Deleting Book',
        content: DeletingBookContent,
      })
    }
  }, [isDeletionPending]);
  const onDeleteBook = (book: FormattedBook) => {
    modal.show({
      title: 'Delete Book',
      Component: () => ConfirmationModal({
        confirmColor: 'error',
        description: 'Are you sure you want to delete this book?',
        confirmText: 'Delete',
        onConfirm: () => deletionMutate(String(book.id)),
        onCancel: modal.hide,
      }),
    })
  }
  return {
    onDeleteBook,
  }
}