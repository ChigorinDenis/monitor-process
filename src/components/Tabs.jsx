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
const Table1 = () => {
  return (
    <TableContainer component={Paper} sx={{fontSize: '8px'}}>
        <Table sx={{fontSize: '8px'}}>
          <TableHead>
            <TableRow>
              <TableCell>Время</TableCell>
              <TableCell>Причина</TableCell>
              <TableCell>Инженер</TableCell>
            </TableRow>
          </TableHead>
            <TableRow>
              <TableCell>02.35</TableCell>
              <TableCell>Отказ блока РН</TableCell>
              <TableCell>Сидоров С.Е</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>04.00</TableCell>
              <TableCell>Отказ блока РН</TableCell>
              <TableCell>Сидоров С.Е</TableCell>
            </TableRow>
          <TableBody>
           
          </TableBody>
        </Table>
      </TableContainer>
  )
}
export default function BasicTabs() {
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
        <Table1 />
    //   </TabPanel>
    //   <TabPanel value={value} index={1}>
    //     Item Two
    //   </TabPanel>
    // </Box>
  );
}
