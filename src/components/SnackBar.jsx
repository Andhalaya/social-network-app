import React from "react";
import { Snackbar } from "@mui/material";

function CustomSnackbar({ openSnackbar, setOpenSnackbar, message }) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformorigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      message={message}
    />
  );
}

export default CustomSnackbar;
