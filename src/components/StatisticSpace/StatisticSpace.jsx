import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts'
import Container from '@mui/material/Container';



function  StatistiSpace() {
  const dispatch = useDispatch()
  const [statistics, setStatistics] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get('http://localhost:8081/operations/get-statistics/by-operations');
        setStatistics(response.data);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  
  

  return (
    
      <Container component="main">
        <BarChart width={730} height={250} data={statistics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="numOperations" fill="#8884d8" />
          <Bar dataKey="numErrors" fill="#82ca9d" />
       </BarChart>
      <TableContainer component={Paper} sx={{fontSize: '8px'}}>
        <Table sx={{fontSize: '8px' }}>
          <TableHead>
            <TableRow>
              <TableCell><b>Описание</b></TableCell>
              <TableCell><b>Количество Операций</b></TableCell>
              <TableCell><b>Количество Ошибок</b></TableCell>
              <TableCell><b>Количество Прерываний</b></TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
            {
              statistics.map((row) => {
                const {
                  id,
                  description,
                  numOperations,
                  numErrors,
                  numAborted
                } = row
                return (
                  <TableRow key={id}> 
                    <TableCell>{description}</TableCell>
                    <TableCell>{numOperations}</TableCell>
                    <TableCell>{numErrors}</TableCell>
                    <TableCell>{numAborted}</TableCell>        
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

export default StatistiSpace;



