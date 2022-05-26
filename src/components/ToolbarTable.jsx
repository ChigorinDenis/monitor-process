import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Button from '@mui/material/Button';
import AddBlockOperation from './AddBlockOperation';

const ToolbarTable = (props) => {
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Toolbar
      sx={{
       
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Выбрано операций - {numSelected}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Операции
        </Typography>
      )}
      {numSelected > 0 ?   
      (
        <>
          <Button
              variant='outlined'
              startIcon={<AttachmentIcon />}
              size='small'
              color='info'
              sx={{mr:1}}
              onClick={handleClickOpen}
            >
            Связать
          </Button>
        </>) :
         (<div></div>)
        }
    </Toolbar>
    <AddBlockOperation
        open={open}
        onClose={handleClose} 
      />
    </>
  );
}

export default ToolbarTable;