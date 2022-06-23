import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import routes from '../routes';
import { format } from 'date-fns';
import { addOperationError } from '../reducers/operationErrorReducer'


function  AllOperationError(props) {
  const { open, setOpen } = props;

  const dispatch = useDispatch();
  const  operationErrors = useSelector((state) => state.operationError);
 

  

  return (
    <Dialog  open={open} onClose={() => {setOpen(false)}} fullWidth maxWidth='lg' >
      <DialogTitle>Ошибки по испытанию</DialogTitle>
      <Container component="main">
  
      <CssBaseline />
      <TableContainer component={Paper} sx={{fontSize: '6px', minHeight: '900px' }}>
        <Table sx={{fontSize: '8px' }}>
          <TableHead>
            <TableRow>
              <TableCell><b>Название</b></TableCell>
              <TableCell><b>Описание</b></TableCell>
              <TableCell><b>Время</b></TableCell>
              <TableCell><b>Решение</b></TableCell>
              <TableCell><b>Работник</b></TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
          {operationErrors.length !=0 && operationErrors.map((row) => {
              const {
                id,
                name,
                info,
                solution,
                historyOperation
              } = row;
              return (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{info}</TableCell>
                  <TableCell>{format(new Date(historyOperation.timeActual), 'HH:mm')}</TableCell>
                  <TableCell>{solution}</TableCell>
                  <TableCell>{historyOperation?.user?.fio}</TableCell>
                </TableRow>
              )

            })}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      </Dialog>
  );
}

export default AllOperationError;



