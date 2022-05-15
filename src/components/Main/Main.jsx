import * as React from 'react';
import { Suspense } from 'react';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemText  from '@mui/material/ListItemText';
import ListItemButton  from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import RocketIcon from '@mui/icons-material/Rocket';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Container } from '@mui/material';
import WorkSpace from '../WorkSpace/WorkSpace';
import PlanningSpace from '../PlanningSpace/PlanningSpace';
import StatisticSpace from '../StatisticSpace/StatisticSpace';
import PersonSpace  from  '../PersonSpace/PersonSpace';
import { selectTab } from '../../reducers/uiReducer';


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
    personal: <PersonSpace />,
    statistic: <StatisticSpace />
  };
  return mappingName[name];
}
const list = [
  {
    name: 'Испытания',
    tabName: 'work',
    icon: (props) => <RocketIcon {...props} />,
  },
  {
    name: 'Планирование',
    tabName: 'plan',
    icon: (props) => <CalendarMonthIcon {...props} />,
  },
  {
    name: 'Персонал',
    tabName: 'personal',
    icon: (props) => <GroupIcon {...props} />,
  },
  {
    name: 'Статистика',
    tabName: 'statistic',
    icon: (props) => <BarChartIcon {...props} />,
  }
];
export default function Main() {
  const { selectedTab } = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const handleTab = (name) => () => {
    dispatch(selectTab(name));
  }
  const ListItem = (item) => {
    const { tabName, name, icon } = item;
    const iconColor = selectedTab === tabName ? {'color': '#10B981'}: {'color': '#f5f5f5'};
    const itemColor = selectedTab === tabName ? 'rgba(255, 255, 255, 0.1)' : 'inherit';
    return (
      <ListItemButton onClick={handleTab(tabName)} 
        sx={{ 
          '&:hover': {bgcolor: 'rgba(255, 255, 255, 0.1)'},
          bgcolor: itemColor,
          mb: '5px',
          borderRadius: '4px',
        }} 
        key={name}>
        <ListItemIcon>
          {icon({style: {...iconColor}})}
        </ListItemIcon>
        <ListItemText primary={name} style={selectedTab === tabName ? {'color': '#10B981'}: {'color': '#f5f5f5'}}/>
      </ListItemButton>
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={2} >
          <Item style={{'background': '#111827', 'padding': '10px'}} >
            <Paper 
              sx={{ 
                width: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                mt: '10px',
                mb: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                padding: '20px'
              }}
              elevation={0}
            >
              <div>
                <Typography variant='body1' sx={{color: 'white', mb: '10px'}}>Илон Маск</Typography>
                <Typography variant='subtitle2' sx={{color: '#0288d1'}} >Главный конструктор</Typography>
              </div>
              <BadgeIcon sx={{color: 'white'}}/>
            </Paper>
            <hr />
            <List>
              {list.map(ListItem)}
            </List>
            <Outlet /> 
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            <Container
              maxWidth='xl'
            > 
              {getTab(selectedTab)}
            </Container>
       
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}