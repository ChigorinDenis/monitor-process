import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tabs from '../Tabs';
import Button from '@mui/material/Button';


export default function DetailsDrawer(props) {

  const { dialogs: { detail }, selectedOperationId} = useSelector(state => state.ui);
  const historyOperations  = useSelector(state => state.historyOperation);
  const operation = historyOperations.find((historyOperation) => historyOperation.id_history === selectedOperationId);
  const { handleClose, handleOpen } = props;

  const list = (anchor) => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <Container>
        <Typography
            variant='h5'
            sx={{ mt: 2, color: 'grey'}}
          >
          Детальная информация
        </Typography>
        <Box
          sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',   mb: 2, mt:1}}
        >
          <Typography
            variant='body2'
          >
          Операция {selectedOperationId}
          </Typography>
          <Chip label={operation?.status} color="error" size="small" variant='outlined'/>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            columnGap: 2,
            alignItems: 'center',
            mt: 2,
          
          }}
        > 
          <Tooltip title="Время начала">
            <Chip 
              avatar={<AccessTimeIcon style={{color: '#10B981'}}/>} 
              label={operation?.timeStart}
              variant="outlined" 
              sx={{ border: 'none', fontWeight: 'bold'}}
            />
          </Tooltip>
          <Tooltip title="Длительность">
            <Chip
              avatar={<AccessTimeIcon style={{color: '#10B981'}}/>}
              label={operation?.duration}
              variant="outlined" 
              sx={{ border: 'none', fontWeight: 'bold'}}
            />
          </Tooltip>
        </Box>
        
        <Typography
            variant='h6'
            sx={{ mt: 2, color: 'grey'}}
          >
          Описание
        </Typography>
        <Typography
            variant='subtitle2'
            sx={{ mt:1, mb: 2, color: 'grey'}}
          >
          {operation?.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            columnGap: 2,
            alignItems: 'center',
            mt: 3,
  
          }}>
            <Typography
              variant='subtitle1'
              sx={{ color: 'grey'}}
            >
              Отказы операции
            </Typography>
          </Box>
        <Tabs />
        <Button variant="contained" fullWidth sx={{background: '#039be5', mt: 50}}>Продолжить выполнение</Button>
      </Container>
  
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={handleOpen}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={detail.open}
            variant='persistent'
            onClose={handleClose}
            onOpen={handleOpen}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
