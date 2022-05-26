import * as React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleIcon from '@mui/icons-material/StopCircle';

const WorkSpaceEngeneer = () => {
  const tasks = useSelector((state) => state.tasks);
  return (
    <TableContainer component={Paper} sx={{fontSize: '8px'}}>
        <Table sx={{fontSize: '8px'}}>
          <TableHead>
            <TableRow>
              <TableCell>Операция</TableCell>
              <TableCell>Время начала</TableCell>
              <TableCell>Длительность</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
            
          <TableBody>
          <TableRow>
            <TableCell>Выгрузка, проверка и приемка сопроводительной документации на изделия</TableCell>
            <TableCell>	00.00	</TableCell>
            <TableCell>06.00</TableCell>
            <TableCell>
              <PlayArrowIcon sx={{mr:2}} color='error'/>
              <StopCircleIcon color='secondary'/>   
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Внешний осмотр вагонов и их пломбировки, приемка комплектующих изделий</TableCell>
            <TableCell>02.00</TableCell>
            <TableCell>06.00</TableCell>
            <TableCell>
              <PlayArrowIcon sx={{mr:2}} color='error'/>
              <StopCircleIcon color='secondary'/>   
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Выгрузка, проверка и приемка сопроводительной документации на изделия</TableCell>
            <TableCell>02.00</TableCell>
            <TableCell>06.00</TableCell>
            <TableCell>
              <PlayArrowIcon sx={{mr:2}} color='error'/>
              <StopCircleIcon color='secondary'/>   
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Подготовка (смазка), паранитовых прокладок</TableCell>
            <TableCell>08.05</TableCell>
            <TableCell>01.00</TableCell>
            <TableCell>
              <PlayArrowIcon sx={{mr:2}} color='error'/>
              <StopCircleIcon color='secondary'/>   
            </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default WorkSpaceEngeneer;

