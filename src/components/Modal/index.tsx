import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, Divider, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
export type ModalProps = {
  open: boolean;
  onClose: () => void;
  content?: string | React.ReactNode;
  title?: string;
  fullWidth?: boolean;
  maxWidth?: DialogProps['maxWidth'];
  Component?: React.JSXElementConstructor<any>;
}
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  content,
  title,
  fullWidth,
  maxWidth,
  Component,
}) => {

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <Divider />
      <DialogContent>{Component ? <Component /> : content}</DialogContent>
    </Dialog>
  );
}

export default Modal