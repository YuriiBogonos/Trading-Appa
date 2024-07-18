import React, { FC, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Menu, MenuItem } from '@mui/material';

interface Props {
  onTradeClose: () => void;
  onTradeAdjust: () => void;
}

export const ActionMenu: FC<Props> = ({ onTradeAdjust, onTradeClose }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'action-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id='action-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'action-button',
        }}
      >
        <MenuItem onClick={onTradeClose}>Close position</MenuItem>
        <MenuItem onClick={onTradeAdjust}>Adjust position</MenuItem>
      </Menu>
    </div>
  );
};
