import ConfirmationModal from "../../../../components/CommonModals/ConfirmationModal";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import BookInformationModal from "../../components/BookInformationModal";
import { FormattedBook } from "../types/FormattedBook";

export const useBooksTableActions = () => {
  const { modal } = useViewContext();
  const onDeleteBook = (book: FormattedBook) => {
    modal.show({
      title: 'Delete Book',
      Component: () => ConfirmationModal({
        confirmColor: 'error',
        description: 'Are you sure you want to delete this book?',
        confirmText: 'Delete',
        onCancel: modal.hide,
        invalidateKey: ['books'],
        actionMethod: 'delete',
        actionUrl: `/books/${String(book.id)}`,
        errorMessage: 'Error deleting book',
        successMessage: 'Book deleted successfully',
        pendingMessage: 'Deleting book...',
      }),
    })
  }
  const onEditBook = (book: FormattedBook) => {
    modal.show({
      title: 'Edit Book',
      Component: () => BookInformationModal({book}),
    })
  }
  return {
    onDeleteBook,
    onEditBook,
  }
}