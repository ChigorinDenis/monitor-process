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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';

;
import { Box } from "@mui/material";
import { removeOperation } from '../reducers/operationReducer';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Checkbox from '@mui/material/Checkbox';
import ToolbarTable from './ToolbarTable';
import { addLaunches } from '../reducers/launchReducer'

import { openDialog } from '../reducers/uiReducer';
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
    }, []);
    const handleRemove = (id) => (e) => {
      e.stopPropagation();
      dispatch(removeOperation({id}));
    }
    const [open, setOpen] = React.useState(false);
    const [showBlocks, setStateBlocks] = React.useState(false);
    const [isCheckAll, setIsCheckAll] = React.useState(false);
    const [isCheck, setIsCheck] = React.useState([]);
  
    const handleAllCheckboxes = () => {
      if (isCheckAll) {
        setIsCheck([]);
        setIsCheckAll(false);
        // dispatch(addCheckOperations([]));
        return;
      }
      const newIsCheck = rows.map((row) => row.id )
      setIsCheck(newIsCheck);
    //   dispatch(addCheckOperations(newIsCheck));
      setIsCheckAll(true);
    }
  
    const handleToggle = (id) => () => {
      let newIsCheck;
      if (isCheck.includes(id)) {
        newIsCheck = isCheck.filter(item => item !== id)
        setIsCheck(newIsCheck);
        // dispatch(addCheckOperations(newIsCheck));
        return;
      }
      newIsCheck = [...isCheck, id]
      setIsCheck(newIsCheck);
    //   dispatch(addCheckOperations(newIsCheck));  
    };
  
    const handleClickOpen = () => {
      dispatch(openDialog({dialogName: 'operation', mode: 'add'}))
      // setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <Box  sx={{ width: '100%' }}>
    <ToolbarTable  numSelected={isCheck.length} />
    <TableContainer component={Paper} sx={{maxHeight:'80vh', overflowY: 'scroll'}} >
      <Table stickyHeader sx={{ minWidth: 650, width: '100%' }}>
        <TableHead>
          <TableRow onClick={handleAllCheckboxes}>
            <TableCell>
              <Checkbox
                edge="start"
                color='info'
                checked={isCheckAll}
                tabIndex={-1}
                disableRipple
                onClick={handleAllCheckboxes}
              />
            </TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Миссия</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={handleToggle(row.id)}
            > 
              <TableCell>
                <Checkbox
                  edge="start"
                  color='info'
                  checked={isCheck.includes(row.id)}
                  tabIndex={-1}
                  disableRipple
                  
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.missionNumber}</TableCell>
              <TableCell>{row.testStartDate}</TableCell>
              <TableCell>{row.duration}</TableCell>
              <TableCell>
                <IconButton
                  size='small'
                  sx={{ '&:hover': {color: '#10B981'}}}
                  onClick={
                    (e) => {
                      e.stopPropagation();
                      dispatch(openDialog({
                      dialogName: 'operation',
                      mode: 'edit',
                      data: row
                    }))
                  }
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size='small'
                  sx={{ '&:hover': {color: '#f44336'}}}
                  onClick={handleRemove(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
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