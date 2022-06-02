import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import { Button, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import  TaskTooltip  from '../Tooltip';
import { addLaunchBlocks } from "../../reducers/blockReducer";
import { addHistoryOperations } from "../../reducers/historyOperationReducer";
import apiRoutes from '../../routes';

const WorkPanel = ({startedLaunch}) => {
  const [alignment, setAlignment] = React.useState('unit1');
  // const { startedLaunch } = useSelector((state) => state.ui);
  const { launchBlocks } = useSelector((state) => state.blocks);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {   
  //       const response = await axios.get(apiRoutes('getBlocksByLaunch')(1));
  //       dispatch(addLaunchBlocks(response.data));
  //     } catch(err) {    
  //       console.log(err);
  //     }
  //   }
  //  fetchData();
  // }, []);

  useEffect(() => {
    const delta = 1000;
    const fetchData = async () => {
      const url = apiRoutes('getHistoryOperationsByBlock')(1, 1);
      try {    
        const response = await axios.get(url);
        dispatch(addHistoryOperations(response.data));
      } catch(err) {    
        console.log(err);
      }
    }
    
    setInterval(() => {
      fetchData();
    }, delta);
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
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
        {/* <Box>
          <TaskTooltip>
          <Button
            variant='contained'
            startIcon={<PlayArrowIcon />}
            size='small'
            color='secondary'
            sx={{mr:1, color: '#fff', boxShadow: 'none'}}
            onClick={() => {
              engine.postRunTask(selectedTask.id);
            }}
          >
            Запуск
          </Button>
          </TaskTooltip>
          <Button
            variant='outlined'
            startIcon={<StopCircleIcon />}
            size='small'
            color='error'
            onClick={() => {
              engine.postStopTask(selectedTask.id);
            }}
          >
            Остановить
          </Button>
        </Box> */}
      </Box>
      <Box>
        <ToggleButtonGroup
          exclusive
          size="small"
          color="info"
          value={alignment}
          onChange={handleChange}
          sx={{ 
            mb: 2,
          }} 
        >
          {launchBlocks.map((block) => {
            return (
              <ToggleButton value={block.id}>
                {block.name}
              </ToggleButton>
            )
          })}
          {/* <ToggleButton value="unit1">
            Изделие 1
          </ToggleButton>
          <ToggleButton value="unit2">
            Изделие 2
          </ToggleButton> */}
         
        </ToggleButtonGroup>
      </Box>
 
    </>
  )
}

export default WorkPanel;