import React from "react";
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import { Button, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import engine from "../../fakeEngine";

const WorkPanel = () => {
  const [alignment, setAlignment] = React.useState('unit1');
  const { selectedTask } = useSelector((state) => state.ui);
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
        <Box>
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
        </Box>
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
          <ToggleButton value="unit1">
            Изделие 1
          </ToggleButton>
          <ToggleButton value="unit2">
            Изделие 2
          </ToggleButton>
         
        </ToggleButtonGroup>
      </Box>
 
    </>
  )
}

export default WorkPanel;