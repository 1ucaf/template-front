import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useViewContext } from '../../../lib/hooks/contextHooks/useViewContext';

interface ConfirmationModalProps {
  description: string;
  confirmText: string;
  confirmColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onConfirm?: () => void;
  onCancel: () => void;
  actionUrl: string;
  actionMethod: 'get' | 'post' | 'put' | 'delete';
  invalidateKey?: any[];
  pendingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  onSuccess?: Function;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  description,
  confirmText,
  confirmColor,
  onConfirm,
  onCancel,
  actionUrl,
  actionMethod,
  invalidateKey,
  pendingMessage,
  errorMessage = 'Something went wrong',
  successMessage = 'Success',
  onSuccess,
}) => {
  const { notification, modal } = useViewContext();
  const queryClient = useQueryClient();
  const {
    mutate,
    isSuccess,
    isError,
    error,
    isPending,
  } = useMutation<AxiosResponse, AxiosError>({
    mutationFn: () => {
      return axios[actionMethod](actionUrl)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateKey });
    }
  });
  
  useEffect(() => {
    if(isSuccess){
      notification.show({
        content: successMessage,
        severity: 'success',
      });
      onSuccess && onSuccess();
      modal.hide();
    }
  }, [isSuccess])
  useEffect(() => {
    if(isError && error){
      if(error.response?.status === 403) {
        modal.hide();
      }
      notification.show({
        content: errorMessage,
        severity: 'error',
      });
    }
  }, [isError, error]);
  const handleConfirm = () => {
    onConfirm && onConfirm();
    mutate();
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {
        isPending ? (
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, p: 2, justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress />
            {pendingMessage}
          </Box>
        ) : 
        <>
          <Typography variant="body1">{description}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={onCancel} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="contained" color={confirmColor}>
              {confirmText}
            </Button>
          </Box>
        </>
      }
    </Box>
  );
};

export default ConfirmationModal;

