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

import Container from '@mui/material/Container';



function  AllErrorsGuideTable() {

  const [errorGiudes, setErrorGuides] = React.useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get('http://localhost:8081/constructor/get-error-guides-for-all-operations');
        setErrorGuides(response.data);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  
  

  return (
    
      <Container component="main">
      <TableContainer component={Paper} sx={{fontSize: '8px'}}>
        <Table sx={{fontSize: '8px' }}>
          <TableHead>
            <TableRow>
              <TableCell><b>Операция</b></TableCell>
              <TableCell><b>Проявление ошибки</b></TableCell>
              <TableCell><b>Метод поиска</b></TableCell>
              <TableCell><b>Способ устранения</b></TableCell>
              <TableCell><b>Контроль</b></TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
            {
              errorGiudes.map((row) => {
                const {
                  id,
                  manifestation,
                  search,
                  removal,
                  control,
                  operation
                } = row
                return (
                  <TableRow key={id}>
                    <TableCell>{operation?.description}</TableCell>
                    <TableCell>{manifestation}</TableCell>
                    <TableCell>{search}</TableCell>
                    <TableCell>{removal}</TableCell>
                    <TableCell>{control}</TableCell> 
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
  );
}

export default AllErrorsGuideTable;



