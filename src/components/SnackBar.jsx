import React from "react";
import { Snackbar } from "@mui/material";

function CustomSnackbar({ openSnackbar, setOpenSnackbar }) {
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
      message="Please add some content before sharing"
    />
  );
}

export default CustomSnackbar;
