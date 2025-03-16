import { Box, Button, FormControl, TextField } from "@mui/material";
import { FormattedBook } from "../../lib/types/FormattedBook";
import { useViewContext } from "../../../../lib/hooks/contextHooks/useViewContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBooksMutations } from "../../../../lib/hooks/books/useBooksMutations";

type BookInformationModalProps = {book?: FormattedBook}
type BookInformationFormType = {title: string, description: string}

const BookInformationModal: React.FC<BookInformationModalProps> = ({book}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BookInformationFormType>({
    defaultValues: {
      title: book?.title,
      description: book?.description,
    }
  });
  const { notification, modal } = useViewContext();
  const {
    creationMutate,
    creationError,
    isCreationError,
    isCreationPending,
    isCreationSuccess,
    modificationMutate,
    modificationError,
    isModificationError,
    isModificationPending,
    isModificationSuccess,
  } = useBooksMutations();
  const sucess = isCreationSuccess || isModificationSuccess;
  const isPending = isCreationPending || isModificationPending;
  const error = creationError || modificationError;
  const isError = isCreationError || isModificationError;
  useEffect(() => {
    if(sucess){
      notification.show({
        content: 'Book saved successfully',
        severity: 'success',
      });
      modal.hide();
    }
  }, [sucess])
  useEffect(() => {
    if(isError){
      notification.show({
        content: 'Error saving book',
        severity: 'error',
      });
    }
  }, [isError, error]);
  const onSubmit = ({title, description}: BookInformationFormType) => {
    if(book) {
      modificationMutate({bookId: String(book.id), title, description});
    } else {
      creationMutate({title, description});
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormControl>
        <TextField
          label="Title"
          {...register('title', { required: 'Title is required' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Description"
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </FormControl>
      <Button onClick={handleSubmit(onSubmit)} loading={isPending}>Save</Button>
    </Box>
  )
}

export default BookInformationModal;