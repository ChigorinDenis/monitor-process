import * as React from 'react';
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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { TextField } from '@mui/material';
import { flexbox } from '@mui/system';


export default function DetailsDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      
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
          Операция 1
          </Typography>
          <Chip label="Остановлена" color="error" size="small" variant='outlined'/>
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
              label="00.00" 
              variant="outlined" 
              sx={{ border: 'none', fontWeight: 'bold'}}
            />
          </Tooltip>
          <Tooltip title="Длительность">
            <Chip
              avatar={<AccessTimeIcon style={{color: '#10B981'}}/>}
              label="06.00"
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
          Выгрузка, проверка и приемка сопроводительной документации на изделия
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
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            variant='persistent'
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
