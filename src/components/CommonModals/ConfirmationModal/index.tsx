import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface ConfirmationModalProps {
  description: string;
  confirmText: string;
  confirmColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  description,
  confirmText,
  confirmColor,
  onConfirm,
  onCancel,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body1">{description}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color={confirmColor}>
          {confirmText}
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmationModal;

