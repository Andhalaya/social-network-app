import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

const ModalPopper = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setOpen((prev) => !prev);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      {trigger(handleClick)}
      <Popper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              {children(handleClose)}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ModalPopper;
