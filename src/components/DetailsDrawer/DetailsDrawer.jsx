import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tabs from '../Tabs';
import { TextField } from '@mui/material';
import { flexbox } from '@mui/system';


export default function DetailsDrawer() {
  const [state, setState] = React.useState({
    right: true,
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
          <Chip label="Запущена" color="secondary" size="small" variant='outlined'/>
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
        <Tabs />
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
