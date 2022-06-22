import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Container from '@mui/material/Container';
import {
  BarChart,
  LineChart, 
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts'


function  StatisticOperation() {

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
        <Box
          sx={{ display: 'flex'}}
        >
          <BarChart width={500} height={250} data={statistics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="numOperations" fill="#039be5" label="sss"/>
          <Bar dataKey="numErrors"  fill="#ef5350" />
       </BarChart>
       <LineChart width={500} height={250} data={statistics}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
       
        <Line type="monotone" dataKey="frequency" stroke="#8884d8" />
        <Line type="monotone" dataKey="probability" stroke="#82ca9d" />
      </LineChart>
        </Box>
        
      <TableContainer component={Paper}  sx={{ fontSize: '8px', maxHeight:'65vh', overflowY: 'scroll'}}>
        <Table sx={{fontSize: '8px' }}  stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell><b>Номер</b></TableCell>
              <TableCell><b>Операция</b></TableCell>
              <TableCell><b>Количество испытаний</b></TableCell>
              <TableCell><b>Обнаружено замечаний</b></TableCell>
              <TableCell><b>Критические замечания</b></TableCell>
              <TableCell><b>Частота замечаний</b></TableCell>
              <TableCell><b>Вероятность выявления замечаний</b></TableCell>
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
                  numAborted,
                  frequency,
                  probability
                } = row
                return (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{numOperations}</TableCell>
                    <TableCell>{numErrors}</TableCell>
                    <TableCell>{numAborted}</TableCell> 
                        <TableCell>{frequency.toFixed(2)}</TableCell>
                        <TableCell>{probability.toFixed(2)}%</TableCell>
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

export default StatisticOperation;



