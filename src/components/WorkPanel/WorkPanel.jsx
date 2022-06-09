import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import { Button, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addHistoryOperations } from "../../reducers/historyOperationReducer";
import { changeBlock } from "../../reducers/blockReducer";
import { startLaunch } from "../../reducers/uiReducer";
import apiRoutes from '../../routes';

const WorkPanel = () => {
  const { entities, idBlockActive } = useSelector((state) => state.blocks);
  const { startedLaunch } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

   useEffect(() => {
    const delta = 1000;
    const fetchData = async () => {
      const url = apiRoutes('getHistoryOperationsByLaunch')(startedLaunch.id);
      try {   
         if (idBlockActive) {
           const response = await axios.get(url);
           dispatch(addHistoryOperations(response.data));
         }   
      } catch(err) {    
        console.log(err);
      }
    }
    setInterval(() => {
      fetchData();
    }, delta);
  }, [idBlockActive]);

  const handleChange = (event, idBlock) => {
    dispatch(changeBlock((idBlock)));
  };
  return (
    <>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          mb: 2,
        }}
      >
        <Typography
          variant='h5'
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          Испытания
        </Typography>
        <Box>
          {
            !startLaunch.start && <Button
              variant='outlined'
              startIcon={<ArrowBackIcon />}
              size='small'
              color='info'
              sx={{ boxShadow: 'none'}}
              onClick={() => {
                dispatch(startLaunch({ id: null, start: false}));
              }}
            >
              К списку испытаний
            </Button>
          }
        </Box>
      </Box>
      <Box>
        <ToggleButtonGroup
          exclusive
          size="small"
          color="info"
          value={ idBlockActive }
          onChange={handleChange}
          sx={{ 
            mb: 2,
          }} 
        >
          {entities.map((block) => {
            return (
              <ToggleButton value={block.id} key={block.id}>
                {block.name}
              </ToggleButton>
            )
          })}         
        </ToggleButtonGroup>
      </Box>
 
    </>
  )
}

export default WorkPanel;