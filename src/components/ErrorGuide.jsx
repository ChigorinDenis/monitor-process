import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiRoutes from '../routes';
import Container from '@mui/material/Container';
import { closeDialog } from '../reducers/uiReducer';


function ErrorGuide() {
  const dispatch = useDispatch()
  const [guideErrors, setGuideErrors] = React.useState([]);
  const { dialogs } = useSelector(state => state.ui);
  const { guides } = dialogs;
  const url = apiRoutes('getErrorGuide')(1);
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(url);
        setGuideErrors(response.data);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  
  const handleClose = () => {
    dispatch(closeDialog({dialogName: 'guides' }));
  };

  return (
    <Dialog onClose={handleClose} open={guides.open}>
      <DialogTitle>Руководство по ошибкам</DialogTitle>
      {/* <Container component="main" maxWidth="xs" > */}
      <TableContainer component={Paper} sx={{fontSize: '8px'}}>
        <Table sx={{fontSize: '8px' }}>
          <TableHead>
            <TableRow>
              <TableCell><b>Проявление ошибки</b></TableCell>
              <TableCell><b>Способ отыскания</b></TableCell>
              <TableCell><b>Способ устранения</b></TableCell>
              <TableCell><b>Контроль</b></TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
            {
              guideErrors.map((row) => {
                const {
                    id,
                    manifestation,
                    search,
                    removal,
                    control
                } = row
                return (
                  <TableRow key={id}> 
                    <TableCell>{manifestation}</TableCell>
                    <TableCell>{search}</TableCell>
                    <TableCell>{control}</TableCell>
                    <TableCell>{removal}</TableCell>        
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Container> */}
    </Dialog>
  );
}

export default ErrorGuide;



