import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Paper, Button} from "@mui/material";
import { addBlocks } from '../reducers/blockReducer';
import apiRoutes from '../routes';
import { height } from '@mui/system';

export default function CheckboxList({ show }) {
  const blocks = useSelector((state) => state.blocks);
  const date = new Date();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(apiRoutes('getBlocks'));
        dispatch(addBlocks(response.data));
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const launch = {
      name: data.get('name'),
      missionNumber: data.get('missionNumber'),
      testStartDate: `${data.get('date')}T${data.get('time')}:00.000+00:00`
    };
    try {
      const url = apiRoutes('addNewLaunch')
      const response = await axios.post(url, launch);
      alert(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper', mr:5, padding: 2 }}
      style={{display: show ? 'block': 'none'}}
    > 
      <Typography variant='h6'>Новые испытания</Typography>
      <Box 
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
        <Box
          sx={{display: 'flex', alignItems: 'center',  mt: 3, gap: 2}}
        >
          <TextField
            fullWidth
            name="name"
            size="small"
            label="Название" 
          />
          <TextField
            fullWidth
            name="missionNumber"
            size="small"
            label="Номер миссии" 
          />
        </Box>
        <Box  sx={{ mt: 3, display: 'flex', gap: 2}}>
          <Grid item xs={12} sm={6}>
              <TextField
                type='date'
                name="date"
                size="small"
                defaultValue={date.getDate()}
                required
                fullWidth
                label='Дата испытний'
                autoFocus
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='time'
                name="time"
                size="small"
                label='Время начала'
                required
                fullWidth
              />
            </Grid>
        </Box>
    
      <Typography variant='subtitle2' sx={{mt:3, mb:1}}>Выберите блоки</Typography>
      <List>
        {blocks.map(({id, name}) => {
          const labelId = `checkbox-list-label-${id}`;
          return (
            <ListItem
              key={id}
              // secondaryAction={
              //   <IconButton edge="end" aria-label="comments">
              //     <VisibilityIcon />
              //   </IconButton>
              // }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    color='info'
                    checked={checked.indexOf(id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      </div>
      <Button
        type='submit'
        variant='contained'
        fullWidth
        startIcon={<CheckIcon />}
        size='small'
        color='info'
        sx={{mr:1, mt: 2}}
        >
          Подтвердить
      </Button>
      </Box>
    </Paper>
  );
}
