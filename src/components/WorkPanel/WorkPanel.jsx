import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import { Button, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { addHistoryOperations } from "../../reducers/historyOperationReducer";
import { changeBlock, clearBlockEntities } from "../../reducers/blockReducer";
import { addOperationError } from "../../reducers/operationErrorReducer";
import { startLaunch } from "../../reducers/uiReducer";
import apiRoutes from '../../routes';
import routes from "../../routes";

const WorkPanel = () => {
  const { entities, idBlockActive } = useSelector((state) => state.blocks);
  const { startedLaunch } = useSelector((state) => state.ui);
  const { user, isAuth } = useSelector((state) => state.auth);
  const roles = isAuth ? user.roles.map((role) => (role.name)) : [];
  const dispatch = useDispatch();
  const url = apiRoutes('getHistoryOperationsByLaunch')(startedLaunch.id);
  
   useEffect(() => {
    const delta = 1000;
    const fetchData = async () => {    
      try {   
         if (idBlockActive) {
           const response = await axios.get(url);
           dispatch(addHistoryOperations(response.data));
         }   
      } catch(err) {    
        console.log(err);
      }
    }
    const timerId = setInterval(() => {
      fetchData();
    }, delta);

    return () => {
      clearInterval(timerId);
    }
  }, [idBlockActive]);

  
  const handleChange = (event, idBlock) => {
    dispatch(changeBlock((idBlock)));
  };

  const handleStopAllOperationOnBlock = async () => {
    // const url = `http://localhost:8081/manager/stop-work-on-block/${startedLaunch.id}/${idBlockActive}`;
    const url = routes('stopAllOperationOnBlock')(startedLaunch.id, idBlockActive)
    try {   
      if (idBlockActive) {
        const response = await axios.get(url);
        alert('?????????????????????? ?????? ???????????????? ???? ???????????????? ??????????')
      }   
    } catch(err) {    
      console.log(err);
    }

  }
  const handleStopAllOperationOnLaunch = async () => {
    // const url = `http://localhost:8081/manager/stop-work-on-block/${startedLaunch.id}/${idBlockActive}`;
    const url = routes('stopAllOperationOnLaunch')(startedLaunch.id);
    try {   
      if (idBlockActive) {
        const response = await axios.post(url, {note:"?????????????????? ????????????????"});
        alert('???????? ???????? ?????????? ???? ??????????')
      }   
    } catch(err) {    
      console.log(err);
    }

  }


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
          ??????????????????
        </Typography>
        <Box>
          {
            startedLaunch.start && <Button
              variant='text'
              startIcon={<ArrowBackIcon />}
              size='small'
              color='info'
              sx={{ boxShadow: 'none'}}
              onClick={() => {
                dispatch(startLaunch({ id: null, start: false}));
                dispatch(clearBlockEntities());
                dispatch(addOperationError([]));
                dispatch(changeBlock(''));
              }}
            >
              ?? ???????????? ??????????????????
            </Button>
          }
        </Box>
      </Box>
      {startedLaunch.start && <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'ceter',
          mb: 2,
        }}
      >
        <ToggleButtonGroup
          exclusive
          size="small"
          color="info"
          value={ idBlockActive }
          onChange={handleChange}
        >
          {entities.map((block) => {
            return (
              <ToggleButton value={block.id} key={block.id}>
                {block.name}
              </ToggleButton>
            )
          })}         
        </ToggleButtonGroup>
        {(roles.includes('CONSTRUCTOR') || roles.includes('MANAGER')) &&<Button
          variant="contained"
          startIcon={<ErrorOutlineIcon />}
          color='error'
          size="small"
          onClick={() => {
            if (roles.includes('CONSTRUCTOR')) {
              handleStopAllOperationOnLaunch();
              return;
            }
            handleStopAllOperationOnBlock()
          }}
          title="???????????????????? ?????? ????????????????"
        >
          {roles?.includes('CONSTRUCTOR') ? '???????????????????? ????????????' : '???????????????????? ????????'}
        </Button>}
      </Box>}
 
    </>
  )
}

export default WorkPanel;