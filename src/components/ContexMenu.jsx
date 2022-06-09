import * as React from 'react';
import { useDispatch } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import { openDialog } from '../reducers/uiReducer';

export default function ContextMenu( props ) {
  const {
    contextMenu,
    handleClose,
    handleRunOperation,
    handleStopOperation
  } = props;

  const dispatch = useDispatch();

  const handleCloseDetail = (dialogName, mode = '', data = '') => () => {
    dispatch(openDialog({
      dialogName,
      mode,
      data
    }))
  }

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
        <MenuItem onClick={() => {
          handleRunOperation();
          handleClose();
        }}>
          <PlayCircleIcon color='secondary' sx={{mr:2}}/>
          Запустить
        </MenuItem>
        <MenuItem onClick={() => {
          handleStopOperation();
          handleClose();
          dispatch(openDialog({ dialogName: 'guides'}))
        }}>
          <StopCircleIcon color='error' sx={{mr:2}}/>
          Остановить
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => {
          handleClose();
          handleCloseDetail('detail')();
        }}>
          <MoreVertIcon  sx={{mr:2}} />
          Подробнее
        </MenuItem>
      </Menu>
  );
}
