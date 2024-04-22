import * as React from 'react';
import { useState } from 'react';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Paper } from '@mui/material';

const ModalPopper = ({ button, children }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  

  const handleToggle = () => {
    setOpen(!open);
    setAnchorEl(anchorEl ? null : button.current);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {React.cloneElement(button.current, { onClick: handleToggle })}
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Paper {...TransitionProps} square>
              {children}
            </Paper>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default ModalPopper;
