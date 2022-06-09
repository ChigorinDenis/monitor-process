import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ru } from 'date-fns/locale'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import CheckIcon from '@mui/icons-material/Check';
import { Box, Paper, Button} from "@mui/material";
import { addBlocks } from '../reducers/blockReducer';
import apiRoutes from '../routes';


export default function BlockSpace({ show }) {
  const { blocks } = useSelector((state) => state.blocks);
  const [date, setDate] = React.useState(new Date());
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
  const [checked, setChecked] = React.useState([]);

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
      testStartDate: date,
      idBlocks: checked.map((id) => ({ id }))
    };
    console.log(checked);
    const urlLaunch = apiRoutes('addNewLaunch');
    const urlLaunchWithBlocks = apiRoutes('addNewLaunchWithBlocks');
    try {
      const response = await axios.post(urlLaunchWithBlocks, launch);
      alert('Пуск добавлен!');
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
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
            <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                  label="Дата испытаний"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TimePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
                label="Время начала"
                renderInput={(params) => <TextField {...params} />}
              />
              </Grid>
            </LocalizationProvider>
        </Box>
    
      <Typography variant='subtitle2' sx={{mt:3, mb:1}}>Выберите блоки</Typography>
      <List>
        {blocks.map(({id, name}) => {
          const labelId = `checkbox-list-label-${id}`;
          return (
            <ListItem
              key={id}
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
