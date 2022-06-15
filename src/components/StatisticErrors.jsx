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



function StatisticErrors() {
    const dispatch = useDispatch()
    const [statistics, setStatistics] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/operations/get-statistics/by-errors');
                setStatistics(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);



    return (

        <Container component="main">
            <TableContainer component={Paper} sx={{ fontSize: '8px' }}>
                <Table sx={{ fontSize: '8px' }}>
                    <TableHead>
                        <TableRow>
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
