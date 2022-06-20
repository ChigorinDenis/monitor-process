import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import StatisticOperation from '../StatisticOperation';
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function  StatistiSpace() {
  const dispatch = useDispatch()
  const [statistics, setStatistics] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    
      
         <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <StatisticOperation />
          </TabPanel>
          <TabPanel value={value} index={1}>
              <BarChart width={730} height={250} data={statistics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="numOperations" fill="#8884d8" />
              <Bar dataKey="numErrors" fill="#82ca9d" />
          </BarChart>
          <TableContainer component={Paper} sx={{ fontSize: '8px', maxHeight:'65vh', overflowY: 'scroll'}}>
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
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
     
  );
}

export default StatistiSpace;



