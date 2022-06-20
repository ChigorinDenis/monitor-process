import  React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import { openDialog } from '../reducers/uiReducer';

export default function ContextMenu( props ) {
  const { selectedOperation } = useSelector(state => state.ui);
  const { active, status, id } = selectedOperation;

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
        <MenuItem  disabled={!active} onClick={() => {
          handleRunOperation();
          handleClose();
        }}>
          <PlayCircleIcon color='secondary' sx={{mr:2}}/>
          Запустить
        </MenuItem>
        <MenuItem disabled={!active || status === 'CREATED' || status === 'STOPPED'} onClick={() => {
          handleStopOperation();
          handleClose();
          dispatch(openDialog({ dialogName: 'guides', data: { id } }))
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
