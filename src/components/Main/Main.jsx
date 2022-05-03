import * as React from 'react';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemText  from '@mui/material/ListItemText';
import ListItemButton  from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import RocketIcon from '@mui/icons-material/Rocket';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Container } from '@mui/material';
import WorkSpace from '../WorkSpace/WorkSpace';
import PlanningSpace from '../PlanningSpace/PlanningSpace';
import StatisticSpace from '../StatisticSpace/StatisticSpace';
import { selectTab } from '../../reducers/uiReducer';
import AddOperationForm from '../AddOperationForm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: '100vh',
  color: theme.palette.text.secondary,
  marginTop: '5px',
}));

const getTab = (name) => {
  const mappingName = {
    work: <WorkSpace />,
    plan: <PlanningSpace />,
    statistic: <StatisticSpace />
  };
  return mappingName[name];
}

export default function Main() {
  const { selectedTab } = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const handleTab = (name) => () => {
    dispatch(selectTab(name));
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={2} >
          <Item style={{'background': '#111827'}} >
            <List>
              <ListItemButton onClick={handleTab('work')}>
                <ListItemIcon>
                  <RocketIcon style={selectedTab ==='work' ? {'color': '#10B981'}: {'color': '#f5f5f5'}}/>
                </ListItemIcon>
                <ListItemText primary="Испытания" style={selectedTab ==='work' ? {'color': '#10B981'}: {'color': '#f5f5f5'}}/>
              </ListItemButton>
              <ListItemButton onClick={handleTab('plan')}>
                <ListItemIcon>
                  <CalendarMonthIcon style={selectedTab ==='plan' ? {'color': '#10B981'}: {'color': '#f5f5f5'}}/>
                </ListItemIcon>
                <ListItemText primary="Планирование"  style={selectedTab ==='plan' ? {'color': '#10B981'}: {'color': '#f5f5f5'}}/>
              </ListItemButton>
              <ListItemButton onClick={handleTab('statistic')}>>
                <ListItemIcon>
                  <BarChartIcon style={selectedTab ==='statistic' ? {'color': '#10B981'}: {'color': '#f5f5f5'}}/>
                </ListItemIcon>
                <ListItemText primary="Статистика"  style={selectedTab ==='statistic' ? {'color': '#10B981'}: {'color': '#f5f5f5'}}/>
              </ListItemButton>
            </List>
            <Outlet />
          
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            <Container
              maxWidth='xl'
            > 
            {/* <Routes>
              <Route index element={<WorkSpace />} />
              <Route path="./planning" element={<PlanningSpace />} />
              <Route path="./statistic" element={<StatisticSpace />} />
            </Routes> */}
            {getTab(selectedTab)}
            </Container>
       
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}