import React from "react";
import { Snackbar } from "@mui/material";

interface NotificationProps {
  message: string;
  duration?: number;
  open: boolean;
  onClose: () => void;
}

const DisplayNotification: React.FC<NotificationProps> = ({
  message,
  duration = 3000,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      message={message}
      autoHideDuration={duration}
    />
  );
};
export default DisplayNotification;
