import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';

export default function ContextMenu( props ) {
  const {contextMenu, handleClose} = props;
  return (
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>
          <PlayCircleIcon color='secondary' sx={{mr:2}}/>
          Запустить
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StopCircleIcon color='error' sx={{mr:2}}/>
          Остановить
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose}>
          <MoreVertIcon  sx={{mr:2}} />
          Подробнее
        </MenuItem>
      </Menu>
  );
}
