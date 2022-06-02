import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import { Box, Paper } from "@mui/material";
import { addBlocks } from '../reducers/blockReducer';
import apiRoutes from '../routes';

export default function AddLaunchForm({ show }) {
  const blocks = useSelector((state) => state.blocks);
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

  return (
    <Paper
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mr:5, padding: 2 }}
      style={{display: show ? 'block': 'none'}}
    >
      <Box
        sx={{display: 'flex', alignItems: 'center'}}
      >
        <TextField
          fullWidth
          name="block_name"
          size="small"
          sx={{mr:1}}
        />
        <AddCircleIcon
          size='big'
          color='secondary' 
          fontSize='large'
          sx={{cursor: 'pointer'}}
        />    
      </Box>
      <List>
        {blocks.map(({id, name}) => {
          const labelId = `checkbox-list-label-${id}`;
          return (
            <ListItem
              key={id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <VisibilityIcon />
                </IconButton>
              }
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
    </Paper>
  );
}
