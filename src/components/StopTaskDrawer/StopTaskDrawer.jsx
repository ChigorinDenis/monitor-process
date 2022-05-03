import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { TextField } from '@mui/material';


export default function StopTaskDrawer() {
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
      sx={{ width: 300 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <form>
        <Container>
          <TextField
            type="text"
            label="Описание"
            variant="outlined"
            size='small'
            color='secondary'
            sx={{
              mt: 5,
              mb: 3
            }}
          />
          <TextField
            type="time"
            label=""
            variant="outlined"
            size='small'
            color='secondary'
            sx={{
              mb: 3,
              mr:10
            }}
          />
          <TextField
            type="time"
            label=""
            variant="outlined"
            size='small'
            color='secondary'
            sx={{
              mb: 3,
    
            }}
          />
          <Button
            variant='contained'
            // startIcon={<PlayArrowIcon />}
            size='small'
            color='secondary'
            sx={{mr:1, color: '#fff', boxShadow: 'none', width: '100%' }}
          >
            Добавить
          </Button>
        </Container>
      </form>
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
