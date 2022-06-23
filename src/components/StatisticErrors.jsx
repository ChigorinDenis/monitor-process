import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
import Container from '@mui/material/Container';
import routes from  '../routes';
import { Typography } from '@mui/material';


function StatisticErrors() {
    const dispatch = useDispatch()
    const [statistics, setStatistics] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(routes('statisticError'));
                setStatistics(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);



    return (

        <Container component="main">
            <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}
        >
       
            <div>
                <BarChart width={500} height={200} data={statistics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="number" fill="#039be5" label="sss"/>
                </BarChart>
                <Typography variant='h6' align='center'>Диаграмма количества ошибок</Typography>
            </div>
            <div>
                <LineChart width={500} height={200} data={statistics}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="frequency" stroke="#8884d8" />
                    <Line type="monotone" dataKey="probability" stroke="#82ca9d" />
                </LineChart>
                <Typography variant='h6' align='center'>Частота и вероятность появления замечания</Typography>
        </div>
      
        </Box>
            <TableContainer component={Paper} sx={{ fontSize: '8px', maxHeight: '400px' }}>
                <Table sx={{ fontSize: '8px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Номер</b></TableCell>
                            <TableCell><b>Замечание</b></TableCell>
                            <TableCell><b>Количество обнаружений</b></TableCell>
                            <TableCell><b>Частота замечания</b></TableCell>
                            <TableCell><b>Вероятность выявления замечания</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            statistics.map((row) => {
                                const {
                                    id,
                                    info,
                                    number,
                                    frequency,
                                    probability
                                } = row
                                return (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{info}</TableCell>
                                        <TableCell>{number}</TableCell>
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

export default StatisticErrors;
