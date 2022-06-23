import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Box, Typography } from "@mui/material";
import { addLaunches } from '../reducers/launchReducer';
import { startLaunch } from '../reducers/uiReducer';
import { fetchBlocksByLaunch } from '../reducers/blockReducer';
import { addHistoryOperations } from '../reducers/historyOperationReducer';
import { addOperationError } from '../reducers/operationErrorReducer';
import ErrorIcon from '@mui/icons-material/Error';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { format } from 'date-fns'
import apiRoutes from '../routes';


const LaunchSpace = () => {
    const rows = useSelector((state) => state.launches);
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchData = async () => {
        try {   
          const response = await axios.get(apiRoutes('getLaunches'));
          dispatch(addLaunches(response.data));
        } catch(err) {    
          console.log(err);
        }
      }
     fetchData();
    }, [rows]);

    const fetchErrors = async (idLaunch) => {
      const url = apiRoutes('getOperationErrors')(idLaunch);
      try {   
        const response = await axios.get(url);
        dispatch(addOperationError(response.data));
      } catch(err) {    
        console.log(err);
      }
    }
    

    const handleLaunch = (id) => () => {
      dispatch(startLaunch({ id, start: true}));
      fetchErrors(id);
      dispatch(addHistoryOperations([]));
      dispatch(fetchBlocksByLaunch(id));
    }

  return (
    <Box  sx={{ width: '100%' }}>
    <TableContainer component={Paper} sx={{maxHeight:'80vh', overflowY: 'scroll'}} >
      <Table stickyHeader sx={{ minWidth: 650, width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell><b>Название</b></TableCell>
            <TableCell><b>Миссия</b></TableCell>
            <TableCell><b>Дата начала</b></TableCell>
            <TableCell><b>Время начала</b></TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              <TableCell>
                { row.note ? <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                  <Typography variant='body2'>{row.name}</Typography>
                  <Box sx={{display: 'flex', gap: 2}}>
                    <ErrorIcon color='error' />
                    <Typography variant='subtitle2'>{row.note}</Typography>
                  </Box>
                </Box> : row.name}

              </TableCell>
              <TableCell>{row.missionNumber}</TableCell>
              <TableCell>{format(new Date(row.testStartDate), 'dd.MM.yyyy')}</TableCell>
              <TableCell>{format(new Date(row.testStartDate), 'hh:mm')}</TableCell>
              <TableCell align='right'>
                {!row.note ?
                  <Button 
                    variant="outlined"
                    endIcon={<RocketLaunchIcon  />}
                    color="secondary" 
                    size='small'
                    sx={{textTransform: 'none' }}
                    onClick={handleLaunch(row.id)}
                  >
                    Начать
                  </Button> :
                  <Button 
                    variant="outlined"
                    endIcon={<RemoveRedEyeIcon  />}
                    color="error" 
                    size='small'
                    sx={{textTransform: 'none' }}
                    onClick={handleLaunch(row.id)}
                  >
                    Просмотр
                  </Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  )
}

export default LaunchSpace;