import * as React from 'react';
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
import { format } from 'date-fns';


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
const Table1 = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{fontSize: '8px'}}>
        <Table sx={{fontSize: '8px'}}>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Решение</TableCell>
              <TableCell>Работник</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const {
                id,
                name,
                status,
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
  )
}
export default function BasicTabs({ data }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ width: '100%' }}>
    //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //     <Tabs value={value} onChange={handleChange} >
    //       <Tab label="Список остановок" {...a11yProps(0)} sx={{textTransform: 'none'}}/>
    //       <Tab label="Каталог неисправностей" {...a11yProps(1)}sx={{textTransform: 'none'}}/>
    //     </Tabs>
    //   </Box>
    //   <TabPanel value={value} index={0} style={{ padding: 0}}>
        <Table1 data={data}/>
    //   </TabPanel>
    //   <TabPanel value={value} index={1}>
    //     Item Two
    //   </TabPanel>
    // </Box>
  );
}
